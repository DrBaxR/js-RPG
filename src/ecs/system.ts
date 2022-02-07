import { Entity } from "./entity";

// There MUST NOT be two of the same system
export abstract class System {
  protected entities: Entity[];

  constructor(entities: Entity[]) {
    this.entities = entities;
  }

  // called once per frame for each system
  abstract update(dt: number): void;
}
