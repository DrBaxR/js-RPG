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

const speed = 30;

export const keyboardControls = (player: Entity, pressedKeys: any, dt: number): void => {
  // TODO: Fix keyboard controls
  const body = (player.getComponent(ComponentType.Body) as BodyComponent)?.body;

  if (!body)
    return;

  const playerRotation = new Quaternion(body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.w)

  let direction = new Vector3(0, 0, 0);

  if (pressedKeys[Controls.FORWARD])
    direction.add(new Vector3(0, 0, -1));

  if (pressedKeys[Controls.BACKWARD])
    direction.add(new Vector3(0, 0, 1));

  if (pressedKeys[Controls.LEFT])
    direction.add(new Vector3(-1, 0, 0));

  if (pressedKeys[Controls.RIGHT])
    direction.add(new Vector3(1, 0, 0));

  direction.normalize().applyQuaternion(playerRotation).multiplyScalar(speed);

  body.velocity.set(direction.x, body.velocity.y, direction.z);
}

export const mouseControls = (player: Entity, mouseDelta: { x: number, y: number }, dt: number): void => {
  if (!mouseDelta)
    return;

  const body = (player.getComponent(ComponentType.Body) as BodyComponent)?.body;

  if (!body)
    return;

  const rotation = new Quaternion(body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.w);

  const extraRotation = (new Quaternion()).setFromAxisAngle(new Vector3(0, 1, 0), -mouseDelta.x * 0.01);
  const newRotation = rotation.multiplyQuaternions(rotation, extraRotation);
  body.quaternion.set(newRotation.x, newRotation.y, newRotation.z, newRotation.w);
}
