import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class PlayerShip {
  public readonly gltf: GLTF;
  public readonly mixer: THREE.AnimationMixer | null;

  private constructor(gltf: GLTF, mixer: THREE.AnimationMixer | null) {
    this.gltf = gltf;
    this.mixer = mixer;
  }

  static async initializePlayerShip() {
    const loader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();
    const [colorTexture, emiText, roughnessTexture] = await Promise.all([
      textureLoader.load('src/textures/Intergalactic Spaceship_color_4.jpg'),
      textureLoader.load('src/textures/Intergalactic Spaceship_emi.jpg'),
      textureLoader.load(
        'src/textures/Intergalactic Spaceship_metalness-Intergalactic Spaceship_rough.jpg'
      ),
    ]);
    try {
      const gltf = await loader.loadAsync(
        '/src/models/Baked_Animations_Intergalactic_Spaceships_Version_2.gltf'
      );
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const meshName = child.name.toLowerCase();

          if (
            meshName === 'baked_animations_intergalactic_spaceships_version_2'
          ) {
            child.material = new THREE.MeshStandardMaterial({
              map: colorTexture,
              emissiveMap: emiText,
              emissive: new THREE.Color(0xffffff),
              emissiveIntensity: 1.0,
              metalnessMap: roughnessTexture,
              roughnessMap: roughnessTexture,
            });
          }
          child.material.needsUpdate = true;
        }
      });

      let mixer: THREE.AnimationMixer | null = null;

      // Check for animations and setup mixer
      if (gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(gltf.scene);
        gltf.animations.forEach((clip) => {
          clip.tracks = clip.tracks.filter(
            (track) =>
              track.name.includes('quaternion') &&
              !track.name.includes('Spaceships')
          );
          return mixer?.clipAction(clip).play();
        });
      }

      gltf.scene.position.set(0, 4, 0);
      return new PlayerShip(gltf, mixer);
    } catch (error) {
      console.error('Error loading player ship:', error);
      throw error;
    }
  }
}
