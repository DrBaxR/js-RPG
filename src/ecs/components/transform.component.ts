import { Vector3 } from "three";
import { Component, ComponentType } from "../component";

export class TransformComponent extends Component {
  position: Vector3;
  velocity: Vector3;
  rotation: Vector3;
  angularVelocity: Vector3;

  constructor(params: TransformComponentParamns) {
    super(ComponentType.Transform);
    this.position = params.position ? params.position : new Vector3(0, 0, 0);
    this.velocity = params.velocity ? params.velocity : new Vector3(0, 0, 0);
    this.rotation = params.rotation ? params.rotation : new Vector3(0, 0, 0);
    this.angularVelocity = params.angularVelocity ? params.angularVelocity : new Vector3(0, 0, 0);
  }
}

export interface TransformComponentParamns {
  position?: Vector3;
  velocity?: Vector3;
  rotation?: Vector3;
  angularVelocity?: Vector3;
}
