import React from 'react';
import { Canvas } from '@react-three/fiber';

export default function App() {
  return (
    <div id="canvas-container">
      <h5>I'm rendered with react-three/fiber</h5>
      <Canvas>
        <ambientLight intensity={0.00001} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <mesh>
          <meshStandardMaterial />
          <sphereGeometry args={[1, 32, 32]} />
        </mesh>
      </Canvas>
    </div>
  );
}
