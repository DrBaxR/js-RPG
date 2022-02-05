import { Body } from "cannon";
import { Component, ComponentType } from "../component";

export class BodyComponent extends Component {
  body: Body;

  constructor(body: Body) {
    super(ComponentType.Body);
    this.body = body;
  }
}
