import * as THREE from 'three';

export class GeometryPlane {
  public readonly plane: THREE.Mesh;
  private readonly geometry: THREE.PlaneGeometry;

  constructor(width: number, height: number, rotation: number) {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(
      '/grass.jpg',
      undefined, //onload
      undefined, //onprogress
      (err) => {
        console.error({ 'Error loading texture:': err });
      }
    );
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    this.geometry = new THREE.PlaneGeometry(width, height);
    this.plane = new THREE.Mesh(this.geometry, material);
    this.plane.rotation.x = rotation;
  }
}
