import { BoxGeometry, MeshPhongMaterial, Vector3 } from "three";
import { RenderableComponent } from "./ecs/components/renderable.component";
import { TransformComponent } from "./ecs/components/transform.component";
import { Entity } from "./ecs/entity";
import { System } from "./ecs/system";
import { MovementSystem } from "./ecs/systems/movement.system";
import { RenderSystem } from "./ecs/systems/render.system";

function main() {
  // initi ecs
  const entities: Entity[] = [];
  const systems: System[] = [];
  const renderSystem = new RenderSystem(entities);
  const movementSystem = new MovementSystem(entities);

  systems.push(movementSystem);
  systems.push(renderSystem);

  // cube entity
  const geometry = new BoxGeometry();
  const material = new MeshPhongMaterial();
  const cube = renderSystem.createMesh(geometry, material)

  const cubeEntity = new Entity('box');
  cubeEntity.addComponent(new TransformComponent({ angularVelocity: new Vector3(-0.01, 0, 0) }));
  cubeEntity.addComponent(new RenderableComponent(cube));
  entities.push(cubeEntity);

  gameLoop();

  function gameLoop() {
    requestAnimationFrame(gameLoop);

    systems.forEach(s => s.update());
  }
}

main();
