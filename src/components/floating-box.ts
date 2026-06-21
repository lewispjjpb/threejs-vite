import * as THREE from 'three';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { Mesh } from 'three';

export class GameCube {
  public readonly cubeMesh: THREE.Mesh;
  constructor(cubeSize: number) {
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const texture = new THREE.TextureLoader().load(
      'https://threejs.org/examples/textures/crate.gif'
    );
    const material = new THREE.MeshBasicMaterial({ map: texture });
    this.cubeMesh = new THREE.Mesh(geometry, material);
    this.cubeMesh.position.set(5, 2, 5);
  }

  spinningCube(time: number = 0) {
    this.cubeMesh.rotation.x = time / 2000;
    this.cubeMesh.rotation.y = time / 1000;
  }
}
