import { ComponentContainerDeploymentServiceCheck } from './component_container_deployment_service_check'

/**
 * Component Container Deployment Service model
 * @remarks Maps to the Nomad service section.
 * @see https://www.nomadproject.io/docs/job-specification/service
 */
export interface ComponentContainerDeploymentService {
  /**
   * Gets the name of the service.
   * @type {string}
   * @memberof ComponentContainerDeploymentService
   * @required
   */
  name: string

  /**
   * Gets the port to map to the service.
   * @type {string}
   * @memberof ComponentContainerDeploymentService
   * @required
   */
  port: string

  /**
   * Gets the tags to attach to the service.
   * @type {string[]}
   * @memberof ComponentContainerDeploymentService
   * @optional
   */
  tags?: string[]

  /**
   * Gets the checks to perform on the service.
   * @type {ComponentContainerDeploymentServiceCheck[]}
   * @memberof ComponentContainerDeploymentService
   * @optional
   */
  checks?: ComponentContainerDeploymentServiceCheck[]
}
