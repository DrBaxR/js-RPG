import { ComponentType } from "../component";
import { RenderableComponent } from "../components/renderable.component";
import { TransformComponent } from "../components/transform.component";
import { Entity } from "../entity";
import { System } from "../system";

export class RenderSystem extends System {
  constructor(entities: Entity[]) {
    super(entities, [ComponentType.Renderable, ComponentType.Transform]);
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
  }
}
