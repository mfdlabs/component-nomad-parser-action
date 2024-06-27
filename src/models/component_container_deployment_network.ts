import { ComponentContainerDeploymentPortMapping } from './component_container_deployment_port_mapping'
import { ComponentContainerDeploymentNetworkMode } from './types/component_container_deployment_network_mode'

/**
 * Component Container Deployment Network model
 * @remarks Maps to the Nomad network section.
 * @see https://www.nomadproject.io/docs/job-specification/network
 */
export interface ComponentContainerDeploymentNetwork {
  /**
   * Gets the network mode to use.
   * @type {ComponentContainerDeploymentNetworkMode}
   * @memberof ComponentContainerDeploymentNetwork
   * @default 'bridge'
   * @remarks Maps to job.group.network.mode.
   */
  mode?: ComponentContainerDeploymentNetworkMode

  /**
   * Gets the port mappings to expose.
   * @type {Map<string, ComponentContainerDeploymentPortMapping>}
   * @memberof ComponentContainerDeploymentNetwork
   * @optional
   * @remarks Maps to job.group.network.ports.
   */
  ports?: Map<string, ComponentContainerDeploymentPortMapping>
}
