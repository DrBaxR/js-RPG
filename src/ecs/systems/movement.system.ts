import { ComponentType } from "../component";
import { TransformComponent } from "../components/transform.component";
import { Entity } from "../entity";
import { System } from "../system";

export class MovementSystem extends System {
  constructor(entities: Entity[]) {
    super(entities, [ComponentType.Transform]);
  }

  update(): void {
    this.entities.forEach(entity => {
      const transformComponent = entity.getComponent(ComponentType.Transform) as TransformComponent;

      if (!transformComponent) 
        return;

      // should also consider scaling with delta time
      transformComponent.position.add(transformComponent.velocity);
      transformComponent.rotation.add(transformComponent.angularVelocity); // only works for simple cases, for more advanced stuff should implement quaternion rotation
    });
  }
}
