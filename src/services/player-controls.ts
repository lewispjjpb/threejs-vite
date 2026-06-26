import { Object3D, Vector3 } from 'three';

export class PlayerControls {
  public playerMesh: Object3D;
  private keysPressed: { [key: string]: boolean } = {};
  public forwardVector = new Vector3(0, 0, 0.1);
  public leftVector = new Vector3(0.1, 0, 0);
  public upVector = new Vector3(0, 0.1, 0);
  public rightVector = new Vector3(-0.1, 0, 0);
  public downVector = new Vector3(0, -0.1, 0);

  constructor(mesh: Object3D) {
    document.onkeydown = (e) => {
      this.keysPressed[e.key] = true;
    };

    document.onkeyup = (e) => {
      this.keysPressed[e.key] = false;
    };
    this.playerMesh = mesh;
  }

  public moveMesh() {
    this.playerMesh.translateOnAxis(this.forwardVector, 0.5);
    if (this.keysPressed['a']) {
      this.playerMesh.translateOnAxis(this.leftVector, 0.5);
    }
    if (this.keysPressed['d']) {
      this.playerMesh.translateOnAxis(this.rightVector, 0.5);
    }
    if (this.keysPressed['w']) {
      this.playerMesh.translateOnAxis(this.upVector, 0.5);
    }
    if (this.keysPressed['s']) {
      this.playerMesh.translateOnAxis(this.downVector, 0.5);
    }

    if (this.keysPressed['ArrowUp']) {
      this.playerMesh.rotateX(Math.PI / 355);
    }
    if (this.keysPressed['ArrowDown']) {
      this.playerMesh.rotateX(-Math.PI / 355);
    }
    if (this.keysPressed['ArrowLeft']) {
      this.playerMesh.rotateOnWorldAxis(new Vector3(0, 1, 0), Math.PI / 180);
    }
    if (this.keysPressed['ArrowRight']) {
      this.playerMesh.rotateOnWorldAxis(new Vector3(0, 1, 0), -Math.PI / 180);
    }
  }
}
