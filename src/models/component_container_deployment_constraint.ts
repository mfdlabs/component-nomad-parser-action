import { ComponentConstraintDeploymentConfigOperatorType } from './types/component_container_deployment_config_operator_type'

/**
 * Component Container Deployment Constraint model
 * @remarks Maps to the Nomad constraint model.
 * @see https://www.nomadproject.io/docs/job-specification/constraint
 */
export interface ComponentContainerDeploymentConstraint {
  /**
   * Gets the attribute to apply the constraint on.
   * @type {string}
   * @memberof ComponentContainerDeploymentConstraint
   * @required
   * @remarks Maps to job.constraints.attribute.
   */
  attribute: string

  /**
   * Gets the operator to use for the constraint.
   * @type {ComponentConstraintDeploymentConfigOperatorType}
   * @memberof ComponentContainerDeploymentConstraint
   * @required
   * @remarks Maps to job.constraints.operator.
   */
  operator: ComponentConstraintDeploymentConfigOperatorType

  /**
   * Gets the value to compare the attribute against.
   * @type {string}
   * @memberof ComponentContainerDeploymentConstraint
   * @optional
   * @remarks Maps to job.constraints.value.
   */
  value?: string
}
