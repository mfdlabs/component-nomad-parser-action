/**
 * Component Container Deployment Resources model
 * @remarks Maps to the Nomad resources section.
 * @see https://www.nomadproject.io/docs/job-specification/resources
 */
export interface ComponentContainerDeploymentResources {
  /**
   * Gets the CPU resources to allocate.
   * @type {number}
   * @memberof ComponentContainerDeploymentResources
   * @optional
   */
  cpu: number

  /**
   * Gets the memory resources to allocate.
   * @type {number}
   * @memberof ComponentContainerDeploymentResources
   * @optional
   * @remarks Maps to job.group.resources.memory.
   */
  ram: number
}
