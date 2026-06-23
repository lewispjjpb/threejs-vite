import {Object3D} from "three";


export class PlayerControls {
  constructor(mesh: Object3D) {
    document.onkeydown = (e) => {
      console.log(e.key);
      if (e.key === 'a') {
        console.log('w');
      }
    }
  }
}
