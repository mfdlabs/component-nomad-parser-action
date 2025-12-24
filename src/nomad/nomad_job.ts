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

  if (configuration.vault_role !== undefined) {
    jobText += '  vault {\n'
    jobText += `    role = "${configuration.vault_role}"\n`
    jobText += '  }\n\n'
  }

  if (configuration.count !== undefined) {
    jobText += `  update {\n    max_parallel = ${configuration.count}\n  }\n\n`
  }

  if (
    configuration.constraints !== undefined &&
    configuration.constraints.length > 0
  ) {
    for (const constraint of configuration.constraints) {
      jobText += '  constraint {\n'
      jobText += `    attribute = "${constraint.attribute}"\n`
      jobText += `    operator  = "${constraint.operator}"\n`

      if (constraint.value !== undefined) {
        jobText += `    value     = "${constraint.value}"\n`
      }
      jobText += '  }\n\n'
    }
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
