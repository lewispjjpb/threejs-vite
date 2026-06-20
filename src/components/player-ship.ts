import * as THREE from 'three';
import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
  Promise<{ scene: THREE.Object3D; mixer: THREE.AnimationMixer | null }>

export class PlayerShip{
    public gltf: GLTF | null = null;
    public mixer: THREE.AnimationMixer | null = null;
    constructor(public scene: THREE.Object3D, public mixer: THREE.AnimationMixer | null) {

      console.log('loading player ship');
      const loader = new GLTFLoader();
      // 1. Create a Texture Loader
      const textureLoader = new THREE.TextureLoader();

// 2. Load your JPG files
      const colorTexture = textureLoader.load('src/textures/Intergalactic Spaceship_color_4.jpg');
      const emiText = textureLoader.load('src/textures/Intergalactic Spaceship_emi.jpg');
      const roughnessTexture = textureLoader.load('src/textures/Intergalactic Spaceship_metalness-Intergalactic Spaceship_rough.jpg');
      // WebGL textures usually need the Y-axis flipped to map correctly to 3D models
      colorTexture.flipY = false;
      emiText.flipY = false;
      roughnessTexture.flipY = false;

      try {
        const gltf = await loader.loadAsync('/src/models/Baked_Animations_Intergalactic_Spaceships_Version_2.gltf');
        gltf.scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const meshName = child.name.toLowerCase();
            console.log('mesh name:', meshName);
            // Ensure you don't modify the material properties here unless necessary
            if (meshName === 'baked_animations_intergalactic_spaceships_version_2') {
              child.material = new THREE.MeshStandardMaterial({
                map: colorTexture,             // Main color
                // normalMap: normalTexture,       // Structural details
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
            clip.tracks = clip.tracks.filter(track => track.name.includes('quaternion') && !track.name.includes('Spaceships'));
            return mixer?.clipAction(clip).play()
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