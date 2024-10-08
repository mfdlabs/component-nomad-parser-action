import { ComponentDeploymentConfiguration } from '../models/component_deployment_configuration'
import { generateGroupSection } from './nomad_group'

/**
 * Generates a Nomad job
 * @param {string} componentName - The name of the component
 * @param {string} componentVersion - The version of the component
 * @param {string[]} datacenters - The datacenters to deploy the job to
 * @param {ComponentDeploymentConfiguration} configuration - The configuration for the component
 * @returns {string} - The constructed HCL Nomad job
 */
export function generateNomadJob(
  componentName: string,
  componentVersion: string,
  datacenters: string[],
  configuration: ComponentDeploymentConfiguration,
): string {
  let jobText = `job "${configuration.job}" {\n`

  jobText += `  datacenters = ${JSON.stringify(datacenters)}\n`
  jobText += `  type = "${configuration.type}"\n\n`

  if (configuration.namespace !== undefined && configuration.namespace !== '') {
    jobText += `  namespace = "${configuration.namespace}"\n\n`
  }

  if (configuration.vault_policies !== undefined) {
    jobText += '  vault {\n'
    jobText += `    policies = ${JSON.stringify(configuration.vault_policies)}\n`
    jobText += '  }\n\n'
  }

  if (configuration.meta !== undefined && configuration.meta.size > 0) {
    jobText += '  meta {\n'

    for (const [key, value] of configuration.meta) {
      jobText += `    ${key} = "${value}"\n`
    }

    jobText += '  }\n\n'
  }

  for (const container of configuration.containers) {
    jobText += generateGroupSection(
      componentName,
      componentVersion,
      configuration.count as number,
      container,
    )
    jobText += '\n'
  }

  // No trailing newline
  jobText = jobText.slice(0, -1)

  jobText += '}\n'

  return jobText
}
