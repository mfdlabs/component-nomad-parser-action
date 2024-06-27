import { ComponentContainerDeploymentConfigMap } from "./component_container_deployment_config_map";
import { ComponentContainerDeploymentNetwork } from "./component_container_deployment_network";
import { ComponentContainerDeploymentResources } from "./component_container_deployment_resources";
import { ComponentContainerDeploymentService } from "./component_container_deployment_service";

/**
 * Component Container Deployment Configuration model
 * @remarks This is essentially the same as the Nomad groups section.
 */
export interface ComponentContainerDeploymentConfiguration {
  /**
   * Gets the name of the image to deploy.
   * @type {string}
   * @memberof ComponentContainerDeploymentConfiguration
   * @required
   */
  image: string;

  /**
   * Gets the resources to allocate.
   * @type {ComponentContainerDeploymentResources}
   * @memberof ComponentContainerDeploymentConfiguration
   * @optional
   * @remarks Maps to job.group.resources.
   */
  resources?: ComponentContainerDeploymentResources;

  /**
   * Gets the network configuration.
   * @type {ComponentContainerDeploymentNetwork}
   * @memberof ComponentContainerDeploymentConfiguration
   * @optional
   */
  network?: ComponentContainerDeploymentNetwork;

  /**
   * Gets the services to expose.
   * @type {ComponentContainerDeploymentService[]}
   * @memberof ComponentContainerDeploymentNetwork
   * @optional
   * @remarks Maps to job.group.services.
   */
  services?: ComponentContainerDeploymentService[];

  /**
   * Gets the host volume mounts to expose.
   * @type {string[]}
   * @memberof ComponentContainerDeploymentNetwork
   * @optional
   * @remarks Maps to job.group.volumes.
   * @remarks The format is 'host_path:container_path'.
   */
  volumes?: string[];

  /**
   * Gets a map of optional driver options.
   * @type {Map<string, string>}
   * @memberof ComponentContainerDeploymentNetwork
   * @optional
   */
  driver_opts?: Map<string, string>;

  /**
   * Gets the config maps to expose.
   * @type {ComponentContainerDeploymentConfigMap[]}
   * @memberof ComponentContainerDeploymentNetwork
   * @optional
   * @remarks Maps to job.group.templates.
   */
  config_maps?: ComponentContainerDeploymentConfigMap[];
}
