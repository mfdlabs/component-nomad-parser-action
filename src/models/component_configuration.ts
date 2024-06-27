import { ComponentDeploymentConfiguration } from "./component_deployment_configuration";

/**
 * ComponentConfiguration model
 */
export interface ComponentConfiguration {
  /**
   * The name of the component.
   * @type {string}
   * @memberof ComponentConfiguration
   * @required
   */
  component: string;

  /**
   * The deployment configuration.
   * @type {ComponentDeploymentConfiguration}
   * @memberof ComponentConfiguration
   * @optional
   * @remarks If not provided, the component will not be deployed.
   * @remarks Maps to the Nomad job section.
   */
  deployment?: ComponentDeploymentConfiguration;
}
