import fs from 'fs'

import yaml from 'yaml'
import { warning, debug } from '@actions/core'

import { ComponentConfiguration } from './models/component_configuration'

/**
 * Reads, parses, and validates the component configuration from the action's inputs.
 * @param {string} componentName The name of the component to read.
 * @param {string} componentConfigurationPath The path to the component configuration file.
 * @returns {[boolean, ComponentConfiguration?]} A tuple containing a boolean indicating success and the component configuration.
 */
export function getComponentConfiguration(
  componentName: string,
  componentConfigurationPath: string,
): [boolean, ComponentConfiguration?] {
  const [name, version] = componentName.split(':')

  debug(`Reading the component configuration for ${name} @ ${version}`)

  if (!fs.existsSync(componentConfigurationPath)) {
    warning(
      `The component configuration file does not exist: ${componentConfigurationPath}`,
    )

    return [false, undefined]
  }

  const fileContents = fs.readFileSync(componentConfigurationPath, 'utf8')

  // Before parsing yaml, we need to replace environment expressions
  // e.g:
  // meta:
  //   version: ${{ env.VERSION }}
  // becomes
  // meta:
  //   version: 1.0.0

  const oldVersion = process.env.VERSION
  process.env.VERSION = version

  const replacedContents = fileContents.replace(
    /\${{ env.([A-Z_]+) }}/g,
    (_, envVar) => {
      const value = process.env[envVar]

      if (!value) {
        warning(`Environment variable ${envVar} is not set`)

        return ''
      }

      return value
    },
  )

  process.env.VERSION = oldVersion

  let componentConfiguration: ComponentConfiguration

  try {
    componentConfiguration = yaml.parse(replacedContents)
  } catch (error) {
    warning(`Failed to parse the component configuration file: ${error}`)

    return [false, undefined]
  }

  if (!componentConfiguration) {
    warning('The component configuration file is empty')

    return [false, undefined]
  }

  if (
    !componentConfiguration.component ||
    !componentConfiguration.component.trim()
  ) {
    warning(
      'The component name is missing from the component configuration file',
    )

    return [false, undefined]
  }

  if (!componentConfiguration.deployment) {
    warning(`The component '${componentName}' can not be deployed`)

    return [false, undefined]
  }

  if (
    componentConfiguration.deployment.count === undefined ||
    isNaN(componentConfiguration.deployment.count)
  ) {
    componentConfiguration.deployment.count = 1
  }

  if (
    !componentConfiguration.deployment.job ||
    !componentConfiguration.deployment.job.trim()
  ) {
    componentConfiguration.deployment.job = componentName.split(':')[0]
  }

  if (
    componentConfiguration.deployment.type === undefined ||
    !componentConfiguration.deployment.type.trim()
  ) {
    componentConfiguration.deployment.type = 'service'
  }

  if (!['service', 'system'].includes(componentConfiguration.deployment.type)) {
    warning(
      `The deployment type for the component '${componentName}' is invalid`,
    )

    return [false, undefined]
  }

  if (componentConfiguration.deployment.metadata !== undefined) {
    componentConfiguration.deployment.metadata = new Map(
      Object.entries(componentConfiguration.deployment.metadata),
    )
  }

  if (componentConfiguration.deployment.count < 1) {
    warning(
      `The deployment count for the component '${componentName}' must be greater than 0`,
    )

    return [false, undefined]
  }

  if (
    componentConfiguration.deployment.containers === undefined ||
    componentConfiguration.deployment.containers.length === 0
  ) {
    warning(`The component '${componentName}' must have at least one container`)

    return [false, undefined]
  }

  for (
    let i = 0;
    i < componentConfiguration.deployment.containers.length;
    i++
  ) {
    const container = componentConfiguration.deployment.containers[i]

    if (!container.image || !container.image.trim()) {
      warning(`The image for container ${i + 1} is missing`)

      return [false, undefined]
    }

    if (container.resources !== undefined) {
      if (
        (container.resources.cpu === undefined ||
          isNaN(container.resources.cpu)) &&
        (container.resources.ram === undefined ||
          isNaN(container.resources.ram))
      ) {
        container.resources = undefined
      }
    }

    if (container.network !== undefined) {
      if (
        container.network.mode === undefined ||
        !container.network.mode.trim()
      ) {
        container.network.mode = 'bridge'
      }

      if (
        container.network.mode !== 'bridge' &&
        container.network.mode !== 'host' &&
        container.network.mode !== 'none'
      ) {
        warning(`The network mode for container ${i + 1} is invalid`)

        return [false, undefined]
      }

      if (container.network.ports !== undefined) {
        container.network.ports = new Map(
          Object.entries(container.network.ports),
        )

        for (const [, port] of container.network.ports) {
          // Range check on static and to
          if (
            port.static !== undefined &&
            (port.static < 0 || port.static > 65535)
          ) {
            warning(`The static port for container ${i + 1} is invalid`)

            return [false, undefined]
          }

          if (port.to !== undefined && (port.to < 0 || port.to > 65535)) {
            warning(`The to port for container ${i + 1} is invalid`)

            return [false, undefined]
          }
        }
      }
    }

    if (container.services !== undefined) {
      for (const service of container.services) {
        if (!service.name || !service.name.trim()) {
          warning(`The service name for container ${i + 1} is missing`)

          return [false, undefined]
        }

        if (service.port === undefined || !service.port.trim()) {
          warning(`The service port for container ${i + 1} is missing`)

          return [false, undefined]
        }

        if (!container.network?.ports?.has(service.port)) {
          warning(`The service port for container ${i + 1} is undefined`)

          return [false, undefined]
        }

        if (service.checks !== undefined) {
          for (const check of service.checks) {
            if (!check.type || !check.type.trim()) {
              warning(`The check type for service ${service.name} is missing`)

              return [false, undefined]
            }

            if (!['http', 'tcp', 'grpc'].includes(check.type)) {
              warning(`The check type for service ${service.name} is invalid`)

              return [false, undefined]
            }

            if (
              check.port !== undefined &&
              !container.network?.ports?.has(check.port)
            ) {
              warning(`The check port for service ${service.name} is undefined`)

              return [false, undefined]
            }
          }
        }
      }
    }

    if (container.volumes !== undefined) {
      for (const volume of container.volumes) {
        // In format: hostPath:containerPath
        if (!/^.+?:.+?$/.test(volume)) {
          warning(`The volume ${volume} for container ${i + 1} is invalid`)

          return [false, undefined]
        }
      }
    }

    if (container.driver_opts !== undefined) {
      container.driver_opts = new Map(Object.entries(container.driver_opts))
    }

    if (container.config_maps !== undefined) {
      for (const configMap of container.config_maps) {
        // In format: configMapName:containerPath
        if (
          configMap.destination === undefined ||
          !configMap.destination.trim()
        ) {
          warning(
            `The config map destination for container ${i + 1} is missing`,
          )

          return [false, undefined]
        }

        if (configMap.env === undefined) {
          configMap.env = true
        }

        if (configMap.env !== true && configMap.env !== false) {
          warning(`The config map env for container ${i + 1} is invalid`)

          return [false, undefined]
        }

        if (configMap.on_change === undefined) {
          configMap.on_change = 'restart'
        }

        if (!['restart', 'noop'].includes(configMap.on_change)) {
          warning(`The config map on change for container ${i + 1} is invalid`)

          return [false, undefined]
        }

        if (configMap.data === undefined || !configMap.data.trim()) {
          warning(`The config map data for container ${i + 1} is missing`)

          return [false, undefined]
        }
      }
    }
  }

  return [true, componentConfiguration]
}
