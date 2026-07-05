import {
  TextureLoader,
  AnimationMixer,
  Mesh,
  MeshStandardMaterial,
  Color,
  Object3D,
} from 'three';

import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class PlayerShip extends Object3D {
  public readonly gltf: GLTF;
  public readonly mixer: AnimationMixer;

  private constructor(gltf: GLTF, mixer: AnimationMixer) {
    super();
    this.gltf = gltf;
    this.mixer = mixer;
    gltf.scene.position.set(0, 4, 0);
  }

  static async initializePlayerShip() {
    const loader = new GLTFLoader();
    const textureLoader = new TextureLoader();

    const [colorTexture, emiText, roughnessTexture] = [
      textureLoader.load(
        'src/models/player-ship/Intergalactic Spaceship_color_4.jpg'
      ),
      textureLoader.load(
        'src/models/player-ship/Intergalactic Spaceship_emi.jpg'
      ),
      textureLoader.load(
        'src/models/player-ship/Intergalactic Spaceship_metalness-Intergalactic Spaceship_rough.jpg'
      ),
    ];
    colorTexture.flipY = false;
    emiText.flipY = false;
    roughnessTexture.flipY = false;
    try {
      const gltf = await loader.loadAsync(
        '/src/models/player-ship/Baked_Animations_Intergalactic_Spaceships_Version_2.gltf'
      );
      gltf.scene.traverse((child) => {
        if (child instanceof Mesh) {
          const meshName = child.name.toLowerCase();

          if (
            meshName === 'baked_animations_intergalactic_spaceships_version_2'
          ) {
            child.material = new MeshStandardMaterial({
              map: colorTexture,
              emissiveMap: emiText,
              emissive: new Color(0xffffff),
              emissiveIntensity: 1.0,
              metalnessMap: roughnessTexture,
              roughnessMap: roughnessTexture,
            });
          }
          child.material.needsUpdate = true;
        }
      });

      const mixer: AnimationMixer = new AnimationMixer(gltf.scene);

      // Check for animations and setup mixer
      if (gltf.animations.length > 0) {
        gltf.animations.forEach((clip) => {
          // only want to keep the engine rotation animations...terribly inefficient
          clip.tracks = clip.tracks.filter(
            (track) =>
              track.name.includes('quaternion') &&
              !track.name.includes('Spaceships')
          );
          return mixer?.clipAction(clip).play();
        });
      }

      return new PlayerShip(gltf, mixer);
    } catch (error) {
      console.error('Error loading player ship:', error);
      throw error;
    }
  }

  public setPlayerStartPostion() {
    console.log('set player start position');
    this.gltf.scene.position.set(0, 4, 0);
  }
}
