import { ComponentContainerDeploymentResources } from '../models/component_container_deployment_resources'

/**
 * Generates a resources section for a Nomad job
 * @param {ComponentContainerDeploymentResources} resources - The resources configuration for the container
 * @returns {string} - The constructed HCL resources section
 */
export function generateResourcesSection(
  resources: ComponentContainerDeploymentResources,
): string {
  let resourcesText = '      resources {\n'

  if (resources.cpu) {
    resourcesText += `        cpu = ${resources.cpu}\n`
  }

  if (resources.ram) {
    resourcesText += `        memory = ${resources.ram}\n`
  }

  resourcesText += '      }\n'

  return resourcesText
}
