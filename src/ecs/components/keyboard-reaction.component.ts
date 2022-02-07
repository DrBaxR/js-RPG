import { Component, ComponentType } from "../component";
import { Entity } from "../entity";

export class KeyboardReactionComponent extends Component {
  react: (parent: Entity, pressedKeys: any, dt: number) => void;

  constructor(reaction: (parent: Entity, pressedKeys: any, dt: number) => void) {
    super(ComponentType.KeyboardReaction);
    this.react = reaction;
  }
}
