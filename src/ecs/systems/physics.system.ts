import { Body, IBodyOptions, World } from "cannon";
import { Entity } from "../entity";
import { System } from "../system";

export class PhysicsSystem extends System {
  private world: World;
  private readonly fixedTimeStep = 1 / 60;
  private readonly maxSubSteps = 3;

  constructor(entities: Entity[]) {
    super(entities);
    this.setup();
  }

  update(dt: number): void {
    this.world.step(this.fixedTimeStep, dt, this.maxSubSteps);
  }

  createBody(options?: IBodyOptions): Body {
    const newBody = new Body(options);
    this.world.addBody(newBody);

    return newBody;
  }

  private setup(): void {
    this.world = new World();
    this.world.gravity.set(0, -9.8, 0);
  }
}
