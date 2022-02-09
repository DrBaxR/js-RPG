import { Quaternion, Vector3 } from "three";
import { ComponentType } from "../ecs/component";
import { BodyComponent } from "../ecs/components/body.component";
import { Entity } from "../ecs/entity"

enum Controls {
  FORWARD = 'KeyW',
  BACKWARD = 'KeyS',
  LEFT = 'KeyA',
  RIGHT = 'KeyD',
}

const speed = 17;
const rotationSensitivity = 0.01;

export const keyboardControls = (player: Entity, pressedKeys: any, dt: number): void => {
  // TODO: Fix issue with diagonal movement (moves slower sometimes???)
  const body = (player.getComponent(ComponentType.Body) as BodyComponent)?.body;

  if (!body)
    return;

  const playerRotation = new Quaternion(body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.w);
  const playerFront = new Vector3(0, 0, -1);
  playerFront.applyQuaternion(playerRotation);

  let moveDirection = new Vector3(0, 0, 0);
  if (pressedKeys[Controls.FORWARD]) {
    moveDirection.z = -1;
  }

  if (pressedKeys[Controls.BACKWARD]) {
    moveDirection.z = 1;
  }

  if (pressedKeys[Controls.LEFT]) {
    moveDirection.x = -1;
  }

  if (pressedKeys[Controls.RIGHT]) {
    moveDirection.x = 1;
  }

  moveDirection.applyQuaternion(playerRotation).setLength(speed);
  body.velocity.set(moveDirection.x, body.velocity.y, moveDirection.z);
}

export const mouseControls = (player: Entity, mouseDelta: { x: number, y: number }, dt: number): void => {
  if (!mouseDelta)
    return;

  const body = (player.getComponent(ComponentType.Body) as BodyComponent)?.body;

  if (!body)
    return;

  const rotation = new Quaternion(body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.w);

  const extraRotation = (new Quaternion()).setFromAxisAngle(new Vector3(0, 1, 0), -mouseDelta.x * rotationSensitivity);
  const newRotation = rotation.multiplyQuaternions(rotation, extraRotation);
  body.quaternion.set(newRotation.x, newRotation.y, newRotation.z, newRotation.w);
}
