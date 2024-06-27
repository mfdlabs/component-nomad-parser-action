import { ComponentContainerDeploymentConfigurationType } from './types/component_container_deployment_configuration_type'
import { ComponentContainerDeploymentConfiguration } from './component_container_deployment_configuration'

/**
 * Component Deployment Configuration model
 */
export interface ComponentDeploymentConfiguration {
  /**
   * The count of instances to deploy.
   * @type {number}
   * @memberof ComponentDeploymentConfiguration
   * @default 1
   */
  count?: number

  /**
   * The type of Nomad job.
   * @type {ComponentContainerDeploymentConfigurationType}
   * @memberof ComponentDeploymentConfiguration
   * @default 'service'
   */
  type?: ComponentContainerDeploymentConfigurationType

  /**
   * The name of the Nomad job.
   * @type {string}
   * @memberof ComponentDeploymentConfiguration
   * @optional
   * @remarks If not provided, the component name will be used.
   */
  job?: string

  /**
   * Any metadata to attach to the Nomad job.
   * @type {Record<string, string>}
   * @memberof ComponentDeploymentConfiguration
   * @optional
   */
  meta?: Map<string, string>

  /**
   * The container deployment configuration.
   * @type {ComponentContainerDeploymentConfiguration[]}
   * @memberof ComponentDeploymentConfiguration
   * @required
   */
  containers: ComponentContainerDeploymentConfiguration[]
}
