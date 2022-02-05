export abstract class Component {
  readonly type: ComponentType;

  constructor(type: ComponentType) {
    this.type = type;
  }
}

export enum ComponentType {
  Renderable = 'RENDERABLE',
  Body = 'Body',
}
