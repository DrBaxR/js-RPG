import { Component, ComponentType } from "./component";

export class Entity {
  // optimization idea: make this be a map (js object)
  components: Component[] = [];

  addComponent(component: Component): number {
    if (this.components.some(c => c.type === component.type))
      return;

    return this.components.push(component);
  }

  getComponent(type: ComponentType): Component {
    return this.components.find(c => c.type === type);
  }
}
