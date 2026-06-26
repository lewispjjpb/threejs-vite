import { AnimationMixer, Object3D, Vector3 } from 'three';
import { PlayerControls } from './player-controls';

export class UpdateManager {
  private mixers: Set<AnimationMixer> = new Set();
  private meshes: Set<Object3D> = new Set();
  private playerMesh: Object3D;
  private playerControls: PlayerControls;
  // private keysPressed: { [key: string]: boolean } = {};

  constructor(playerControls: PlayerControls) {
    this.playerControls = playerControls;
    this.playerMesh = playerControls.playerMesh;
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
    this.playerControls.moveMesh();
  }
}
