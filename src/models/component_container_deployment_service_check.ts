/**
 * Component Container Deployment Service Check model
 * @remarks Maps to the Nomad service check section.
 * @see https://www.nomadproject.io/docs/job-specification/service
 */
export interface ComponentContainerDeploymentServiceCheck {
  /**
   * Gets the type of check to perform.
   * @type {string}
   * @memberof ComponentContainerDeploymentServiceCheck
   * @required
   * @remarks Maps to job.group.services.checks.type.
   */
  type: string

  /**
   * Gets the port to check.
   * @type {string}
   * @memberof ComponentContainerDeploymentServiceCheck
   * @optional
   */
  port?: string

  /**
   * Gets the path to check.
   * @type {string}
   * @memberof ComponentContainerDeploymentServiceCheck
   * @optional
   */
  path?: string

  /**
   * Gets the interval to check.
   * @type {string}
   * @memberof ComponentContainerDeploymentServiceCheck
   * @optional
   * @default '5s'
   */
  interval?: string

  /**
   * Gets the timeout to check.
   * @type {string}
   * @memberof ComponentContainerDeploymentServiceCheck
   * @optional
   * @default '2s'
   */
  timeout?: string
}
