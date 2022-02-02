import { ComponentType } from "./component";
import { Entity } from "./entity";

export abstract class System {
  protected entities: Entity[];
  private requiredComponents: ComponentType[];

  constructor(entities: Entity[], requiredComponents: ComponentType[]) {
    this.entities = entities;
    this.requiredComponents = requiredComponents;
  }

  abstract update(): void;
}
