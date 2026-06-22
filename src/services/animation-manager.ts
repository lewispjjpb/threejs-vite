import { AnimationMixer } from 'three';

export class AnimationManager {
  private mixers: Set<AnimationMixer> = new Set();

  constructor() {}

  add(mixer: AnimationMixer) {
    this.mixers.add(mixer);
  }

  remove(mixer: AnimationMixer) {
    this.mixers.delete(mixer);
  }

  update(delta: number) {
    this.mixers.forEach((mixer) => mixer.update(delta));
  }
}
