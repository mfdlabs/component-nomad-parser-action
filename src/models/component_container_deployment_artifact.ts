import { ComponentContainerDeploymentArtifactMode } from './types/component_container_deployment_artifact_mode'

/**
 * Component Container Deployment Artifact model
 * @remarks Maps to the Nomad artifact section.
 * @see https://www.nomadproject.io/docs/job-specification/artifact
 */
export interface ComponentContainerDeploymentArtifiact {
  /**
   * Gets the destination path for the artifact
   * @type {string}
   * @memberof ComponentContainerDeploymentArtifiact
   * @optional
   * @default "/local"
   */
  destination: string

  /**
   * Gets the mode for the artifact
   * @type {ComponentContainerDeploymentArtifactMode}
   * @memberof ComponentContainerDeploymentArtifiact
   * @optional
   * @default "any"
   */
  mode: ComponentContainerDeploymentArtifactMode

  /**
   * Gets the options for the artifact
   * @type {Map<string, string>}
   * @memberof ComponentContainerDeploymentArtifiact
   * @optional
   */
  options?: Map<string, string>

  /**
   * Gets the headers for the artifact
   * @type {Map<string, string>}
   * @memberof ComponentContainerDeploymentArtifiact
   * @optional
   */
  headers?: Map<string, string>

  /**
   * Gets the source for the artifact
   * @type {string}
   * @memberof ComponentContainerDeploymentArtifiact
   * @required
   */
  source: string

  /**
   * Determines whether or not to chown the artifact
   * @type {boolean}
   * @memberof ComponentContainerDeploymentArtifiact
   * @optional
   * @default false
   */
  chown?: boolean
}
