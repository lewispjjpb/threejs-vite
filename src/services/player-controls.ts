import { Object3D, Vector3 } from 'three';

export class PlayerControls {
  public playerMesh: Object3D;
  private keysPressed: { [key: string]: boolean } = {};
  private forwardVector = new Vector3(0, 0, 0.1);
  private leftVector = new Vector3(0.1, 0, 0);
  private upVector = new Vector3(0, 0.1, 0);
  private rightVector = new Vector3(-0.1, 0, 0);
  private downVector = new Vector3(0, -0.1, 0);
  private pitchVector = new Vector3(0, 1, 0);
  private worldYawVector = Math.PI;
  public speed = 0.5;

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
    this.playerMesh.translateOnAxis(this.forwardVector, this.speed);

    /**
     * speed controls
     */
    if (this.keysPressed['=']) {
      this.speed += 0.05;
    }
    if (this.keysPressed['-']) {
      this.speed -= 0.05;
    }

    /**
     * strafe/translate
     */
    if (this.keysPressed['a']) {
      this.playerMesh.translateOnAxis(this.leftVector, this.speed);
    }
    if (this.keysPressed['d']) {
      this.playerMesh.translateOnAxis(this.rightVector, this.speed);
    }
    if (this.keysPressed['w']) {
      this.playerMesh.translateOnAxis(this.upVector, this.speed);
    }
    if (this.keysPressed['s']) {
      this.playerMesh.translateOnAxis(this.downVector, this.speed);
    }

    /**
     * rotate
     */
    if (this.keysPressed['ArrowUp']) {
      this.playerMesh.rotateX(this.worldYawVector / 355);
    }
    if (this.keysPressed['ArrowDown']) {
      this.playerMesh.rotateX(-this.worldYawVector / 355);
    }
    if (this.keysPressed['ArrowLeft']) {
      this.playerMesh.rotateOnWorldAxis(this.pitchVector, Math.PI / 180);
    }
    if (this.keysPressed['ArrowRight']) {
      this.playerMesh.rotateOnWorldAxis(this.pitchVector, -Math.PI / 180);
    }
  }
}
