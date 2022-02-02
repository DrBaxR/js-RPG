import { ComponentType } from "./component";
import { Entity } from "./entity";

// There MUST NOT be two of the same system
export abstract class System {
  protected entities: Entity[];
  private requiredComponents: ComponentType[];

  constructor(entities: Entity[], requiredComponents: ComponentType[]) {
    this.entities = entities;
    this.requiredComponents = requiredComponents;
  }

  // called once per frame for each system
  abstract update(): void;
}
