import { BufferGeometry, Material, Mesh, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { ComponentType } from "../component";
import { RenderableComponent } from "../components/renderable.component";
import { TransformComponent } from "../components/transform.component";
import { Entity } from "../entity";
import { System } from "../system";

export class RenderSystem extends System {
  private renderer: WebGLRenderer;
  private scene: Scene;
  private camera: PerspectiveCamera;

  constructor(entities: Entity[]) {
    super(entities, [ComponentType.Renderable, ComponentType.Transform]);
    this.setup();
  }

  private setup(): void {
    this.scene = new Scene();

    const canvas = document.querySelector('#c');
    this.renderer = new WebGLRenderer({ canvas });
    this.renderer.setSize(canvas.clientWidth, canvas.clientWidth, false);

    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;
  }

  update(): void {
    this.entities.forEach(entity => {
      const renderableComponent = entity.getComponent(ComponentType.Renderable) as RenderableComponent;
      const transformComponent = entity.getComponent(ComponentType.Transform) as TransformComponent;

      if (!renderableComponent || !transformComponent)
        return;

      const position = transformComponent.position;
      renderableComponent.mesh.position.set(position.x, position.y, position.z);
    })

    this.renderer.render(this.scene, this.camera);
  }

  createMesh(geometry?: BufferGeometry, material?: Material | Material[], addToScene = true): Mesh {
    const mesh = new Mesh(geometry, material);

    if (addToScene)
      this.scene.add(mesh);

    return mesh;
  }
}
