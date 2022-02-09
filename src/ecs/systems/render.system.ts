import { AmbientLight, BufferGeometry, DirectionalLight, Material, Mesh, PerspectiveCamera, Quaternion, Scene, Spherical, Vector3, WebGLRenderer } from "three";
import { ComponentType } from "../component";
import { BodyComponent } from "../components/body.component";
import { RenderableComponent } from "../components/renderable.component";
import { Entity } from "../entity";
import { System } from "../system";

export class RenderSystem extends System {
  private renderer: WebGLRenderer;
  private scene: Scene;

  private camera: PerspectiveCamera;
  private cameraTarget: Entity;
  private cameraOffset = new Vector3(0, 2, 5);

  constructor(entities: Entity[]) {
    super(entities);
    this.setup();
  }

  private setup(): void {
    this.initRenderer();
    this.initCamera();
    this.initScene();
  }

  private initRenderer() {
    const canvas = document.querySelector('#c');
    this.renderer = new WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(canvas.clientWidth, canvas.clientWidth, false);
  }

  // renderer must be already initialized
  private initCamera() {
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 10;
    this.camera.position.y = 5;
  }

  private initScene() {
    this.scene = new Scene();

    const directionalLight = new DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 5)
    this.scene.add(directionalLight);

    const ambientLight = new AmbientLight(0xffffff, 0.1);
    this.scene.add(ambientLight);
  }

  update(): void {
    this.entities.forEach(entity => {
      const renderableComponent = entity.getComponent(ComponentType.Renderable) as RenderableComponent;
      const bodyComponent = entity.getComponent(ComponentType.Body) as BodyComponent;

      if (!renderableComponent || !bodyComponent)
        return;

      const mesh = renderableComponent.mesh;
      const body = bodyComponent.body;
      mesh.position.set(body.position.x, body.position.y, body.position.z);
      mesh.quaternion.set(body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.w);
    })

    this.updateCameraPosition();
    this.renderer.render(this.scene, this.camera);
  }

  private updateCameraPosition() {
    if (!this.cameraTarget)
      return;

    const bodyComponent = this.cameraTarget.getComponent(ComponentType.Body) as BodyComponent;

    if (!bodyComponent)
      return;

    const body = bodyComponent.body;
    const bodyPos = new Vector3(body.position.x, body.position.y, body.position.z);
    const bodyQuat = new Quaternion(body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.w);

    const currentOffset = this.cameraOffset.clone().applyQuaternion(bodyQuat);
    const newPos = bodyPos.clone().add(currentOffset);

    this.camera.position.set(newPos.x, newPos.y, newPos.z);
    this.camera.quaternion.set(body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.w)
  }

  createMesh(geometry?: BufferGeometry, material?: Material | Material[], addToScene = true): Mesh {
    const mesh = new Mesh(geometry, material);

    if (addToScene)
      this.scene.add(mesh);

    return mesh;
  }

  // target MUST have body component
  setCameraTarget(target: Entity): void {
    this.cameraTarget = target;
  }

  getCamera(): PerspectiveCamera {
    return this.camera;
  }

  getScene(): Scene {
    return this.scene;
  }
}
