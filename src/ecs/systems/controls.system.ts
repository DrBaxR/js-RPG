import { Body, Vec3 } from "cannon";
import { PerspectiveCamera, Spherical, Vector3 } from "three";
import { ComponentType } from "../component";
import { BodyComponent } from "../components/body.component";
import { Entity } from "../entity";
import { System } from "../system";

export class ControlsSystem extends System {
  private camera: PerspectiveCamera;
  private cameraRotationFollowerBody: Body;

  constructor(entities: Entity[], camera: PerspectiveCamera) {
    super(entities);
    this.camera = camera;
  }

  update(dt: number): void {
    if (!this.camera || !this.cameraRotationFollowerBody)
      return;

    const cameraFront = new Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion);
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
