import {
  Mesh,
  PlaneGeometry,
  TextureLoader,
  MeshStandardMaterial,
  DoubleSide,
} from 'three';

export class GeometryPlane {
  public readonly plane: Mesh;
  private readonly geometry: PlaneGeometry;

  constructor(width: number, height: number, rotation: number) {
    const textureLoader = new TextureLoader();
    const texture = textureLoader.load(
      '/grass.jpg',
      undefined, //onload
      undefined, //onprogress
      (err) => {
        console.error({ 'Error loading texture:': err });
      }
    );
    const material = new MeshStandardMaterial({
      map: texture,
      side: DoubleSide,
    });
    this.geometry = new PlaneGeometry(width, height);
    this.plane = new Mesh(this.geometry, material);
    this.plane.rotation.x = rotation;
  }
}
