import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three";
import { RenderableComponent } from "./ecs/components/renderable.component";
import { TransformComponent } from "./ecs/components/transform.component";
import { Entity } from "./ecs/entity";
import { System } from "./ecs/system";
import { RenderSystem } from "./ecs/systems/render.system";

function main() {
  const { scene, renderer, camera } = setup();

  // initi ecs
  const entities: Entity[] = [];
  const systems: System[] = [];
  const renderSystem = new RenderSystem(entities);
  systems.push(renderSystem);

  // cube entity
  const geometry = new BoxGeometry();
  const material = new MeshBasicMaterial();
  const cube = new Mesh(geometry, material);
  scene.add(cube);

  const cubeEntity = new Entity();
  cubeEntity.addComponent(new TransformComponent(new Vector3(0, 1, 0)));
  cubeEntity.addComponent(new RenderableComponent(cube));
  entities.push(cubeEntity);

  animate();

  function animate() {
    requestAnimationFrame(animate);

    systems.forEach(s => s.update());

    // move in render system
    renderer.render(scene, camera);
  }

  function setup(): { scene: Scene, renderer: WebGLRenderer, camera: PerspectiveCamera } {
    const scene = new Scene();

    const canvas = document.querySelector('#c');
    const renderer = new WebGLRenderer({ canvas });
    renderer.setSize(canvas.clientWidth, canvas.clientWidth, false);

    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    return {
      scene,
      renderer,
      camera
    }
  }
}

main();
