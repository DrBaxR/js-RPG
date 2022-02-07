import { Quaternion, Vector3 } from "three";
import { ComponentType } from "../ecs/component";
import { BodyComponent } from "../ecs/components/body.component";
import { Entity } from "../ecs/entity"

export const controlPlayer = (player: Entity, pressedKeys: any, dt: number): void => {
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

enum Controls {
  FORWARD = 'KeyW',
  BACKWARD = 'KeyS',
  LEFT = 'KeyA',
  RIGHT = 'KeyD',
}

const speed = 30;
