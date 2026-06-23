import {Mesh, MeshBasicMaterial, BoxGeometry, TextureLoader} from 'three';

export class GameCube {
  public readonly cubeMesh: Mesh;
  constructor(cubeSize: number) {
    const geometry = new BoxGeometry(cubeSize, cubeSize, cubeSize);
    const texture = new TextureLoader().load(
      'https://threejs.org/examples/textures/crate.gif'
    );
    const material = new MeshBasicMaterial({ map: texture });
    this.cubeMesh = new Mesh(geometry, material);
    this.cubeMesh.position.set(5, 2, 5);
  }

  spinningCube(time: number = 0) {
    this.cubeMesh.rotation.x = time / 2000;
    this.cubeMesh.rotation.y = time / 1000;
  }
}
