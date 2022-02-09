import { Component, ComponentType } from "../component";
import { Entity } from "../entity";

export class MouseReactionComponent extends Component {
  react: (parent: Entity, mouseDelta: { x: number, y: number }, dt: number) => void;

  constructor(reaction: (parent: Entity, mouseDelta: { x: number, y: number }, dt: number) => void) {
    super(ComponentType.MouseReaction);
    this.react = reaction;
  }
}
