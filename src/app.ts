import { BoxGeometry, MeshPhongMaterial, PlaneGeometry } from "three";
import { RenderableComponent } from "./ecs/components/renderable.component";
import { Entity } from "./ecs/entity";
import { System } from "./ecs/system";
import { RenderSystem } from "./ecs/systems/render.system";
import { PhysicsSystem } from "./ecs/systems/physics.system";
import * as CANNON from 'cannon';
import { BodyComponent } from "./ecs/components/body.component";

function main() {
  // systems init
  const entities: Entity[] = [];
  const systems: System[] = [];
  const renderSystem = new RenderSystem(entities);
  const physicsSystem = new PhysicsSystem(entities);

  systems.push(physicsSystem, renderSystem);

  createSampleEntities();

  // for physics step
  let lastTime = 0;
  gameLoop(0);

  function gameLoop(time: number) {
    requestAnimationFrame(gameLoop);

    if (lastTime) {
      const dt = (time - lastTime) / 1000;
      systems.forEach(s => s.update(dt));
    }

    // update time
    lastTime = time;
  }

  function createSampleEntities() {
    // ! cube 1
    // render
    const geometry = new BoxGeometry();
    const material = new MeshPhongMaterial();
    const cubeMesh = renderSystem.createMesh(geometry, material);
    // physics
    const cubeBody = physicsSystem.createBody({
      mass: 5,
      position: new CANNON.Vec3(0, 10, 0),
      shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5))
    });

    const cubeEntity = new Entity('box');
    cubeEntity.addComponent(new RenderableComponent(cubeMesh));
    cubeEntity.addComponent(new BodyComponent(cubeBody));
    entities.push(cubeEntity);

    // ! cube 2
    const cubeMesh2 = renderSystem.createMesh(geometry, material);
    // physics
    const cubeBody2 = physicsSystem.createBody({
      mass: 5,
      position: new CANNON.Vec3(0.5, 20, 0.5),
      shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5))
    });

    const cubeEntity2 = new Entity('box');
    cubeEntity2.addComponent(new RenderableComponent(cubeMesh2));
    cubeEntity2.addComponent(new BodyComponent(cubeBody2));
    entities.push(cubeEntity2);

    // ! cube 3
    const cubeMesh3 = renderSystem.createMesh(geometry, material);
    // physics
    const cubeBody3 = physicsSystem.createBody({
      mass: 5,
      position: new CANNON.Vec3(-0.5, 25, -0.5),
      shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5))
    });

    const cubeEntity3 = new Entity('box');
    cubeEntity3.addComponent(new RenderableComponent(cubeMesh3));
    cubeEntity3.addComponent(new BodyComponent(cubeBody3));
    entities.push(cubeEntity3);

    // ? plane entity
    // render
    const planeGeometry = new PlaneGeometry(100, 100);
    const planeMaterial = new MeshPhongMaterial({ color: 0x00aa00 });
    const planeMesh = renderSystem.createMesh(planeGeometry, planeMaterial);
    // physics
    const planeBody = physicsSystem.createBody({
      mass: 0,
      shape: new CANNON.Plane()
    });
    planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);

    const planeEntity = new Entity('ground');
    planeEntity.addComponent(new RenderableComponent(planeMesh));
    planeEntity.addComponent(new BodyComponent(planeBody));
    entities.push(planeEntity);
  }
}

main();
