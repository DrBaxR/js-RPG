import { AmbientLight, BufferGeometry, DirectionalLight, Material, Mesh, PerspectiveCamera, Scene, WebGLRenderer } from "three";
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
    const canvas = document.querySelector('#c');
    this.renderer = new WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(canvas.clientWidth, canvas.clientWidth, false);

    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;
    this.camera.position.y = 0;

    this.scene = new Scene();
    const directionalLight = new DirectionalLight(0xffffff, 1);
    directionalLight.position.set(-1, 1, 1)
    this.scene.add(directionalLight);

    const ambientLight = new AmbientLight(0xffffff, 0.2);
    this.scene.add(ambientLight);
  }

  update(): void {
    this.entities.forEach(entity => {
      const renderableComponent = entity.getComponent(ComponentType.Renderable) as RenderableComponent;
      const transformComponent = entity.getComponent(ComponentType.Transform) as TransformComponent;

      if (!renderableComponent || !transformComponent)
        return;

      const position = transformComponent.position;
      renderableComponent.mesh.position.set(position.x, position.y, position.z);

      const rotation = transformComponent.rotation;
      renderableComponent.mesh.rotation.set(rotation.x, rotation.y, rotation.z);
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
