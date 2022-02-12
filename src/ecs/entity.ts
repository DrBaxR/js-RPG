import { Component, ComponentType } from "./component";

export class Entity {
  readonly name: string;
  components = {};

  constructor(name: string) {
    this.name = name;
  }

  addComponent(component: Component): boolean {
    if (this.components[component.type])
      return false;
    
    this.components[component.type] = component;
    return true;
  }

  getComponent(type: ComponentType): Component {
    return this.components[type];
  }
}
