import { ComponentContainerDeploymentService } from '../models/component_container_deployment_service'

/**
 * Generates a service section for a Nomad job
 * @param {ComponentContainerDeploymentService} service
 * @returns {string} - The constructed HCL service section
 */
export function generateServiceSection(
  service: ComponentContainerDeploymentService,
): string {
  let serviceText = '      service {\n'

  serviceText += `        name = "${service.name}"\n`
  serviceText += `        port = "${service.port}"\n`

  if (service.tags !== undefined && service.tags.length > 0) {
    serviceText += `\n        tags = ${JSON.stringify(service.tags)}\n`
  }

  if (service.checks !== undefined && service.checks.length > 0) {
    for (const check of service.checks) {
      serviceText += '\n        check {\n'
      serviceText += `          type = "${check.type}"\n`

      if (check.port !== undefined) {
        serviceText += `          port = "${check.port}"\n`
      }

      if (check.path !== undefined) {
        serviceText += `          path = "${check.path}"\n`
      }

      serviceText += '        }\n'
    }
  }

  serviceText += '      }\n'

  return serviceText
}
