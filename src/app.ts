import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three";
import { RenderableComponent } from "./ecs/components/renderable.component";
import { TransformComponent } from "./ecs/components/transform.component";
import { Entity } from "./ecs/entity";
import { System } from "./ecs/system";
import { RenderSystem } from "./ecs/systems/render.system";

function main() {

  // initi ecs
  const entities: Entity[] = [];
  const systems: System[] = [];
  const renderSystem = new RenderSystem(entities);
  systems.push(renderSystem);

  // cube entity
  const geometry = new BoxGeometry();
  const material = new MeshBasicMaterial();
  const cube = renderSystem.createMesh(geometry, material)

  const cubeEntity = new Entity('box');
  cubeEntity.addComponent(new TransformComponent(new Vector3(0, 2, 0)));
  cubeEntity.addComponent(new RenderableComponent(cube));
  entities.push(cubeEntity);

  gameLoop();

  function gameLoop() {
    requestAnimationFrame(gameLoop);

    systems.forEach(s => s.update());
  }
}

main();
