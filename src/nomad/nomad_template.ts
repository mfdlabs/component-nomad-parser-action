import { ComponentContainerDeploymentConfigMap } from "src/models/component_container_deployment_config_map";

/**
 * Generates a template section for a Nomad job
 * @param {ComponentContainerDeploymentConfigMap} configMap - The configuration map for the container
 * @returns {string} - The constructed HCL template section
 */
export function generateTemplateSection(configMap: ComponentContainerDeploymentConfigMap): string {
    let templateText = '      template {\n';

    templateText += `        data = <<EOF\n${configMap.data}EOF\n`;
    templateText += `        destination = "${configMap.destination}"\n`;
    templateText += `        change_mode = "${configMap.on_change}"\n`;
    templateText += `        env = ${configMap.env ? 'true' : 'false'}\n`;

    templateText += '      }\n';

    return templateText;
}