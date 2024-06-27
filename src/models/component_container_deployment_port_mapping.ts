/**
 * Component Container Deployment Port Mapping model
 * @remarks Maps to the Nomad network ports section.
 * @see https://www.nomadproject.io/docs/job-specification/network
 */
export interface ComponentContainerDeploymentPortMapping {
  /**
   * Gets the static port to expose.
   * @type {number}
   * @memberof ComponentContainerDeploymentPortMapping
   * @optional
   */
  static?: number;

  /**
   * Gets a port inside the container to expose, only applicable when NetworkMode is 'bridge'.
   * @type {number}
   * @memberof ComponentContainerDeploymentPortMapping
   * @optional
   */
  to?: number;
}
