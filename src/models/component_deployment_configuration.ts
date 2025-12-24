import { ComponentContainerDeploymentConfigurationType } from './types/component_container_deployment_configuration_type'
import { ComponentContainerDeploymentConfiguration } from './component_container_deployment_configuration'
import { ComponentContainerDeploymentConstraint } from './component_container_deployment_constraint'

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
   * The namespace to deploy the component into.
   * @type {string}
   * @memberof ComponentDeploymentConfiguration
   * @optional
   * @remarks If not provided, the default namespace will be used.
   */
  namespace?: string

  /**
   * Gets the constraints to apply.
   * @type {ComponentContainerDeploymentConstraint[]}
   * @memberof ComponentContainerDeploymentConfiguration
   * @optional
   * @remarks Maps to job.constraints.
   */
  constraints?: ComponentContainerDeploymentConstraint[]

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
   * Optional Vault role to attach to the Nomad job.
   * @type {string[]}
   * @memberof ComponentDeploymentConfiguration
   * @optional
   * @remarks If not provided, no role will be attached.
   */
  vault_role?: string

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
