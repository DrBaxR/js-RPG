import { AmbientLight, BufferGeometry, DirectionalLight, Material, Mesh, PerspectiveCamera, Scene, Spherical, Vector3, WebGLRenderer } from "three";
import { ComponentType } from "../component";
import { BodyComponent } from "../components/body.component";
import { RenderableComponent } from "../components/renderable.component";
import { Entity } from "../entity";
import { System } from "../system";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class RenderSystem extends System {
  private renderer: WebGLRenderer;
  private scene: Scene;

  private camera: PerspectiveCamera;
  private controls: OrbitControls;
  private cameraTarget: Entity;

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
    this.camera.lookAt(0, 0, 0);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enablePan = false;
    this.controls.minDistance = 2;
    this.controls.maxDistance = 15;
    this.controls.maxPolarAngle = Math.PI / 2.1;
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
    this.controls.target.set(body.position.x, body.position.y, body.position.z);
    this.controls.update();
  }

  createMesh(geometry?: BufferGeometry, material?: Material | Material[], addToScene = true): Mesh {
    const mesh = new Mesh(geometry, material);

    if (addToScene)
      this.scene.add(mesh);

    return mesh;
  }

  // target MUST have body component
  setCameraTarget(target: Entity) {
    this.cameraTarget = target;
  }

  getCamera(): PerspectiveCamera {
    return this.camera;
  }
}
