import { ComponentType } from "../component";
import { KeyboardReactionComponent } from "../components/keyboard-reaction.component";
import { MouseReactionComponent } from "../components/mouse-reaction.component";
import { Entity } from "../entity";
import { System } from "../system";

export class ControlsSystem extends System {
  private pressedKeys = {};

  private mouseDown = false;
  private previousMousePos: { x: number, y: number };
  // left   - x < 0
  // right  - x > 0
  // up     - y < 0
  // down   - y > 0
  private mouseDelta: { x: number, y: number };

  private handleKeyDown = (e) => {
    this.pressedKeys[e.code] = true;
  }

  private handleKeyUp = (e) => {
    delete this.pressedKeys[e.code];
  }

  private handleMouseDown = (e) => {
    this.mouseDown = true;
    this.previousMousePos = { x: e.clientX, y: e.clientY };
  }

  private handleMouseUp = (e) => {
    this.mouseDown = false;
    this.previousMousePos = undefined;
  }

  private handleMouseMove = (e) => {
    if (this.mouseDown) {
      const currentMousePos = { x: e.clientX, y: e.clientY };
      this.mouseDelta = {
        x: currentMousePos.x - this.previousMousePos.x,
        y: currentMousePos.y - this.previousMousePos.y
      };
      this.previousMousePos = currentMousePos;
    } else {
      this.mouseDelta = { x: 0, y: 0 };
    }
  }

  constructor(entities: Entity[]) {
    super(entities);

    // keyboard event listeners
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);

    // mouse event listeners
    document.addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('mousemove', this.handleMouseMove);
  }

  update(dt: number): void {
    this.entities.forEach(entity => {
      const keyboardReactionComponent = entity.getComponent(ComponentType.KeyboardReaction) as KeyboardReactionComponent;
      const mouseReactionComponent = entity.getComponent(ComponentType.MouseReaction) as MouseReactionComponent;

      if (mouseReactionComponent)
        mouseReactionComponent.react(entity, this.mouseDelta, dt);

      if (keyboardReactionComponent)
        keyboardReactionComponent.react(entity, this.pressedKeys, dt);

      // reset mouse delta after controls did their thing
      this.mouseDelta = { x: 0, y: 0 };
    })
  }
}
