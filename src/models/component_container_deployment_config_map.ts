import { ComponentContainerDeploymentConfigMapChangeMode } from './types/component_container_deployment_config_map_change_mode'

/**
 * Component Container Deployment Config Map model
 * @remarks Maps to the Nomad template config section.
 * @see https://www.nomadproject.io/docs/job-specification/template
 */
export interface ComponentContainerDeploymentConfigMap {
  /**
   * Gets the destination path for the config map.
   * @type {string}
   * @memberof ComponentContainerDeploymentConfigMap
   * @required
   */
  destination: string

  /**
   * Determines if the config map is an env file.
   * @type {boolean}
   * @memberof ComponentContainerDeploymentConfigMap
   * @optional
   * @default true
   */
  env?: boolean

  /**
   * Gets the change mode for the config map.
   * @type {ComponentContainerDeploymentConfigMapChangeMode}
   * @memberof ComponentContainerDeploymentConfigMap
   * @optional
   * @default 'restart'
   */
  on_change?: ComponentContainerDeploymentConfigMapChangeMode

  /**
   * Gets the template data for the config map.
   * @type {string}
   * @memberof ComponentContainerDeploymentConfigMap
   * @required
   */
  data: string
}
