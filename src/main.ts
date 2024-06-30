import * as core from '@actions/core'

import { getComponentConfiguration } from './components-v4'
import { generateNomadJob } from './nomad/nomad_job'
import { ComponentDeploymentConfiguration } from './models/component_deployment_configuration'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const components = JSON.parse(
      core.getInput('components', { required: true }),
    ) as Record<string, string>
    const datacenters = (
      core.getInput('datacenters', { required: false })?.split(',') || ['*']
    )
      .map(dc => dc.trim())
      .filter(dc => dc.length > 0)

    const resources = core
      .getInput('resources', { required: false })
      .split(';')
      .map(resource => resource.trim())
      .filter(resource => resource.length > 0)

    const ouputJobs: Record<string, string> = {}

    for (const [component, componentConfigurationPath] of Object.entries(
      components,
    )) {
      if (!component || !componentConfigurationPath) {
        core.setFailed('Invalid component configuration')

        return
      }

      const [success, componentConfiguration] = getComponentConfiguration(
        component,
        resources,
        componentConfigurationPath,
      )

      if (!success || !componentConfiguration) {
        core.setFailed(
          `Failed to read the component configuration for ${component}`,
        )

        return
      }

      const [componentName, componentVersion] = component.split(':')

      const job = generateNomadJob(
        componentName,
        componentVersion,
        datacenters,
        componentConfiguration.deployment as ComponentDeploymentConfiguration,
      )

      ouputJobs[component] = job
    }

    core.setOutput('nomad-files', JSON.stringify(ouputJobs))
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
