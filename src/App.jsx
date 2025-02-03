
import './App.css'

import { Canvas, useFrame } from "@react-three/fiber"

import EnvironmentParent from './components/EnvironmentParent';
import { Leva } from 'leva';



export default function App() {
  

  return (
    <section className='app'>

      <Canvas
        shadows
        camera={{
          position: [0, 0, 1],
          fov: 50,
          // lookAt: new THREE.Vector3(-3, -1.9, 1.6)
        }}
      >
        <EnvironmentParent />
        {/* <Leva /> */}
      </Canvas>
    </section>

  )
}
