import { Vector3 } from "three";
import { Component, ComponentType } from "../component";

export class TransformComponent extends Component {
  position: Vector3;
  velocity: Vector3;

  constructor(position = new Vector3(0, 0, 0), velocity = new Vector3(0, 0, 0)) {
    super(ComponentType.Transform);
    this.position = position;
    this.velocity = velocity;
  }
}
