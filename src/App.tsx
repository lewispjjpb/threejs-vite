import React from 'react';
import { Canvas } from '@react-three/fiber';
import { POINT_CLOUD_OPTIONS } from './utils/app-constants';

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
      <div>This could be some other react elements</div>
      <select
        id="point-cloud-select"
        onChange={(e) => {
          e.target.blur();
        }}
      >
        {Object.entries(POINT_CLOUD_OPTIONS).map(([key, values]) => (
          <option key={key} value={key}>
            {values.label}
          </option>
        ))}
      </select>
    </div>
  );
}
