import { ComponentContainerDeploymentArtifiact } from '../models/component_container_deployment_artifact'

/**
 * Generates a artifact section for a Nomad job
 * @param {ComponentContainerDeploymentArtifiact} artifact - The artifact configuration for the container
 * @returns {string} - The constructed HCL template section
 */
export function generateArtifactSection(
  artifact: ComponentContainerDeploymentArtifiact,
): string {
  let artifactText = '      artifact {\n'

  artifactText += `        source = "${artifact.source}"\n`
  artifactText += `        destination = "${artifact.destination}"\n`
  artifactText += `        mode = "${artifact.mode}"\n`

  if (artifact.options && artifact.options.size > 0) {
    artifactText += 'options {\n'

    for (const [key, value] of artifact.options) {
      artifactText += `          ${key} = "${value}"\n`
    }

    artifactText += '        }\n'
  }

  if (artifact.headers && artifact.headers.size > 0) {
    artifactText += 'headers {\n'

    for (const [key, value] of artifact.headers) {
      artifactText += `          ${key} = "${value}"\n`
    }

    artifactText += '        }\n'
  }

  artifactText += '      }\n'

  return artifactText
}
