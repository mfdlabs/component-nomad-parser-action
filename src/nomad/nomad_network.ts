import { ComponentContainerDeploymentNetwork } from '../models/component_container_deployment_network'

/**
 * Generates a network section for a Nomad job
 * @param {ComponentContainerDeploymentNetwork} network - The network configuration for the container
 * @returns {string} - The constructed HCL network section
 */
export function generateNetworkSection(
  network: ComponentContainerDeploymentNetwork,
): string {
  let networkText = '    network {\n'

  if (network.mode !== 'bridge') {
    networkText += `      mode = "${network.mode}"\n`
  }

  if (network.ports !== undefined && network.ports.size > 0) {
    for (const [portName, port] of network.ports) {
      networkText += `\n      port "${portName}" {`

      if (port.to !== undefined) {
        networkText += `\n        to = ${port.to}\n`
      }

      if (port.static !== undefined) {
        networkText += `\n        static = ${port.static}\n`
      }

      if (port.static === undefined && port.to === undefined) {
        networkText += '}\n'
      } else {
        networkText += '      }\n'
      }
    }
  }

  networkText += '    }\n'

  return networkText
}
