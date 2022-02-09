import { ArrowHelper, BoxGeometry, MeshPhongMaterial, PlaneGeometry, Vector2, Vector3 } from "three";
import { RenderableComponent } from "./ecs/components/renderable.component";
import { Entity } from "./ecs/entity";
import { System } from "./ecs/system";
import { RenderSystem } from "./ecs/systems/render.system";
import { PhysicsSystem } from "./ecs/systems/physics.system";
import * as CANNON from 'cannon';
import { BodyComponent } from "./ecs/components/body.component";
import { ControlsSystem } from "./ecs/systems/controls.system";
import { KeyboardReactionComponent } from "./ecs/components/keyboard-reaction.component";
import { keyboardControls, mouseControls } from "./controls/player-controls";
import { MouseReactionComponent } from "./ecs/components/mouse-reaction.component";

export let helper: ArrowHelper;

function main() {
  // systems init
  const entities: Entity[] = [];
  const systems: System[] = [];
  const renderSystem = new RenderSystem(entities);
  const controlsSystem = new ControlsSystem(entities);
  const physicsSystem = new PhysicsSystem(entities);

  systems.push(controlsSystem, physicsSystem, renderSystem);

  createSampleEntities();

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
    // DEBUG
    const dir = new Vector3(1, 0, 0);
    const origin = new Vector3(0, 2, 0);
    const length = 1;
    const hex = 0x00ff00;
    helper = new ArrowHelper(dir, origin, length, hex);
    renderSystem.getScene().add(helper);

    // ! cube entity
    // render
    const geometry = new BoxGeometry();
    const material = new MeshPhongMaterial();
    const cubeMesh = renderSystem.createMesh(geometry, material);
    // physics
    const cubeBody = physicsSystem.createBody({
      mass: 5,
      position: new CANNON.Vec3(0, 10, 0),
      shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)),
      fixedRotation: true
    });

    const playerEntity = new Entity('player');
    playerEntity.addComponent(new RenderableComponent(cubeMesh));
    playerEntity.addComponent(new BodyComponent(cubeBody));
    playerEntity.addComponent(new MouseReactionComponent(mouseControls));
    playerEntity.addComponent(new KeyboardReactionComponent(keyboardControls));
    entities.push(playerEntity);

    renderSystem.setCameraTarget(playerEntity);

    // another cube for reference
    const geometry2 = new BoxGeometry(8, 8, 4);
    const material2 = new MeshPhongMaterial({color: 0xaa0011});
    const mesh2 = renderSystem.createMesh(geometry2, material2);
    const body2 = physicsSystem.createBody({
      mass: 10,
      position: new CANNON.Vec3(0, 10, -5),
      shape: new CANNON.Box(new CANNON.Vec3(4, 4, 2)),
      fixedRotation: true
    });
    const entity2 = new Entity('box');
    entity2.addComponent(new RenderableComponent(mesh2));
    entity2.addComponent(new BodyComponent(body2));
    entities.push(entity2)

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
