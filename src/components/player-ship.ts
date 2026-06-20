import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
Promise<{ scene: THREE.Object3D; mixer: THREE.AnimationMixer | null }>;

export class PlayerShip {
  public gltf: GLTF | null = null;
  public mixer: THREE.AnimationMixer | null = null;
  private readonly colorTexture: THREE.Texture | null = null;
  private readonly emiText: THREE.Texture | null = null;
  private readonly roughnessTexture: THREE.Texture | null = null;
  constructor() {
    const textureLoader = new THREE.TextureLoader();
    const colorTexture = textureLoader.load(
      'src/textures/Intergalactic Spaceship_color_4.jpg'
    );
    const emiText = textureLoader.load(
      'src/textures/Intergalactic Spaceship_emi.jpg'
    );
    const roughnessTexture = textureLoader.load(
      'src/textures/Intergalactic Spaceship_metalness-Intergalactic Spaceship_rough.jpg'
    );
    colorTexture.flipY = false;
    emiText.flipY = false;
    roughnessTexture.flipY = false;
    this.colorTexture = colorTexture;
    this.emiText = emiText;
    this.roughnessTexture = roughnessTexture;
  }
  async initializePlayerShip() {
    const loader = new GLTFLoader();
    try {
      const gltf = await loader.loadAsync(
        '/src/models/Baked_Animations_Intergalactic_Spaceships_Version_2.gltf'
      );
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const meshName = child.name.toLowerCase();
          console.log('mesh name:', meshName);
          // Ensure you don't modify the material properties here unless necessary
          if (
            meshName === 'baked_animations_intergalactic_spaceships_version_2'
          ) {
            child.material = new THREE.MeshStandardMaterial({
              map: this.colorTexture, // Main color
              // normalMap: normalTexture,       // Structural details
              emissiveMap: this.emiText,
              emissive: new THREE.Color(0xffffff),
              emissiveIntensity: 1.0,
              metalnessMap: this.roughnessTexture,
              roughnessMap: this.roughnessTexture,
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
      this.gltf = gltf;
      this.mixer = mixer;
      // return {scene: gltf.scene, mixer};
    } catch (error) {
      console.error('Error loading player ship:', error);
      throw error;
    }
  }
}
