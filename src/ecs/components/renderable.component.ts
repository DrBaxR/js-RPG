import { Mesh } from "three";
import { Component, ComponentType } from "../component";

export class RenderableComponent extends Component {
  mesh: Mesh;

  constructor(mesh: Mesh) {
    super(ComponentType.Renderable);
    this.mesh = mesh;
  }
}
