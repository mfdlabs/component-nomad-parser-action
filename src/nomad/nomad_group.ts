import { ComponentContainerDeploymentConfiguration } from '../models/component_container_deployment_configuration'

import { generateNetworkSection } from './nomad_network'
import { generateResourcesSection } from './nomad_resources'
import { generateTemplateSection } from './nomad_template'
import { generateServiceSection } from './nomad_service'

/**
 * Generates a group section for a Nomad job
 * @param {string} componentName - The name of the component
 * @param {string} componentVersion - The version of the component
 * @param {number} count - The number of instances of the component
 * @param {ComponentContainerDeploymentConfiguration} configuration - The configuration for the container
 * @returns {string} - The constructed HCL group section
 */
export function generateGroupSection(
  componentName: string,
  componentVersion: string,
  count: number,
  configuration: ComponentContainerDeploymentConfiguration,
): string {
  let groupText = `  group "${componentName}" {\n`

  groupText += `    count = ${count}\n\n`

  if (configuration.network !== undefined) {
    groupText += generateNetworkSection(configuration.network)
  }

  groupText += `\n    task "${componentName}" {\n`
  groupText += `      driver = "docker"\n\n`
  groupText += `      config {\n`

  if (componentVersion === '' || componentVersion === 'latest') {
    groupText += `        image = "${configuration.image}"\n`
  } else {
    groupText += `        image = "${configuration.image}:${componentVersion}"\n`
  }

  if (configuration?.network?.mode === 'host') {
    groupText += `        network_mode = "host"\n`
  }

  if (
    configuration?.network?.ports !== undefined &&
    configuration.network.ports.size > 0
  ) {
    groupText += `        ports = ${JSON.stringify(Array.from(configuration.network.ports.keys()))}\n`
  }

  if (
    configuration?.volumes !== undefined &&
    configuration.volumes.length > 0
  ) {
    groupText += `\n        volumes = ${JSON.stringify(configuration.volumes)}\n`
  }

  if (
    configuration?.driver_opts !== undefined &&
    configuration.driver_opts.size > 0
  ) {
    groupText += '\n'

    for (const [key, value] of configuration.driver_opts) {
      // Extra args on the config section
      groupText += `        ${key} = "${value}"\n`
    }
  }

  groupText += `      }\n\n`

  if (configuration.resources !== undefined) {
    groupText += generateResourcesSection(configuration.resources)
    groupText += '\n'
  }

  if (
    configuration?.config_maps !== undefined &&
    configuration.config_maps.length > 0
  ) {
    for (const configMap of configuration.config_maps) {
      groupText += generateTemplateSection(configMap)
      groupText += '\n'
    }
  }

  if (
    configuration?.services !== undefined &&
    configuration.services.length > 0
  ) {
    for (const service of configuration.services) {
      groupText += generateServiceSection(service)
      groupText += '\n'
    }
  }

  // Remove trailing newline
  groupText = groupText.slice(0, -1)

  groupText += '    }\n'
  groupText += '  }\n'

  return groupText
}
