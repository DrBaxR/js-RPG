import { Component, ComponentType } from "./component";

export class Entity {
  readonly name: string;
  // optimization idea: make this be a map (js object)
  components: Component[] = [];

  constructor(name: string) {
    this.name = name;
  }

  addComponent(component: Component): number {
    if (this.components.some(c => c.type === component.type))
      return;

    return this.components.push(component);
  }

  getComponent(type: ComponentType): Component {
    return this.components.find(c => c.type === type);
  }
}
