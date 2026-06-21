import { DirectionalLight, Object3D } from 'three';

export class DirectionalLightObject {
  public dirLight = new DirectionalLight();
  constructor(
    [x, y, z]: [number, number, number],
    color: string,
    intensity: number,
    target?: Object3D
  ) {
    this.dirLight.position.set(x, y, z);
    this.dirLight.color.set(color);
    this.dirLight.intensity = intensity;
    target ? (this.dirLight.target = target) : undefined;
  }
}
