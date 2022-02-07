import { Body, Vec3 } from "cannon";
import { PerspectiveCamera, Spherical, Vector3 } from "three";
import { ComponentType } from "../component";
import { BodyComponent } from "../components/body.component";
import { KeyboardReactionComponent } from "../components/keyboard-reaction.component";
import { Entity } from "../entity";
import { System } from "../system";

export class ControlsSystem extends System {
  private camera: PerspectiveCamera;

  private cameraRotationFollowerBody: Body;
  private pressedKeys = {};

  private handleKeyDown = (e) => {
    this.pressedKeys[e.code] = true;
  }

  private handleKeyUp = (e) => {
    delete this.pressedKeys[e.code];
  }

  constructor(entities: Entity[], camera: PerspectiveCamera) {
    super(entities);
    this.camera = camera;

    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  update(dt: number): void {
    this.entities.forEach(entity => {
      const keyboardReactionComponent = entity.getComponent(ComponentType.KeyboardReaction) as KeyboardReactionComponent;
      
      if (!keyboardReactionComponent)
        return;

      keyboardReactionComponent.react(entity, this.pressedKeys, dt);
    })

    // TODO: extract function
    if (!this.camera || !this.cameraRotationFollowerBody)
      return;

    const cameraFront = new Vector3(0, 0, 1).applyQuaternion(this.camera.quaternion);
    const spherical = new Spherical().setFromVector3(cameraFront) // theta is rotation around y axis (left - right)

    this.cameraRotationFollowerBody.quaternion.setFromAxisAngle(new Vec3(0, 1, 0), spherical.theta);
  }

  setCameraRotationFollower(follower: Entity) {
    const bodyComponent = follower.getComponent(ComponentType.Body) as BodyComponent;

    if (!bodyComponent)
      return;

    this.cameraRotationFollowerBody = bodyComponent.body;
  }
}
