import { AnimationMixer, Object3D, Vector3 } from 'three';

export class UpdateManager {
  private mixers: Set<AnimationMixer> = new Set();
  private meshes: Set<Object3D> = new Set();
  private keysPressed: { [key: string]: boolean } = {};

  constructor() {
    document.onkeydown = (e) => {
      this.keysPressed[e.key] = true;
    };

    document.onkeyup = (e) => {
      this.keysPressed[e.key] = false;
    };
  }

  addMixers(mixer: AnimationMixer) {
    this.mixers.add(mixer);
  }

  removeMixers(mixer: AnimationMixer) {
    this.mixers.delete(mixer);
  }

  addMeshes(mesh: Object3D) {
    this.meshes.add(mesh);
  }

  removeMeshes(mesh: Object3D) {
    this.meshes.delete(mesh);
  }

  update(delta: number) {
    this.mixers.forEach((mixer) => mixer.update(delta));
    const forwardVector = new Vector3(0, 0, 0.1);
    const leftVector = new Vector3(0.1, 0, 0);
    const upVector = new Vector3(0, 0.1, 0);
    const rightVector = new Vector3(-0.1, 0, 0);
    const downVector = new Vector3(0, -0.1, 0);

    this.meshes.forEach((mesh) => {
      mesh.translateOnAxis(forwardVector, 0.5);
      if (this.keysPressed['a']) {
        mesh.rotateY(Math.PI / 180);
        // mesh.translateOnAxis(leftVector, 0.5);
      }
      if (this.keysPressed['d']) {
        mesh.rotateY(-Math.PI / 180);
        // mesh.translateOnAxis(rightVector, 0.5);
      }
      if (this.keysPressed['w']) {
        mesh.translateOnAxis(upVector, 0.5);
      }
      if (this.keysPressed['s']) {
        mesh.translateOnAxis(downVector, 0.5);
      }
    });
  }
}
