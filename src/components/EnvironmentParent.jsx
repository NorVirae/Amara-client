import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Character } from "./Character";
import { Suspense, useEffect } from "react";


import { useRef, useState } from "react"
import { SoftShadows, Float, CameraControls, Sky, PerformanceMonitor } from "@react-three/drei"
import { useControls } from "leva"
import { Perf } from "r3f-perf"
import { easing } from "maath"
import { Model as Room } from "./Room"
import { useFrame } from "@react-three/fiber"

function Light() {
    const ref = useRef()
    useFrame((state, delta) => {
        easing.dampE(ref.current.rotation, [(state.pointer.y * Math.PI) / 50, (state.pointer.x * Math.PI) / 20, 0], 0.2, delta)
    })
    return (
        <group ref={ref}>
            <directionalLight position={[5, 5, 4]} castShadow intensity={5} shadow-mapSize={2048} shadow-bias={-0.001}>
                <orthographicCamera attach="shadow-camera" args={[-8.5, 8.5, 8.5, -8.5, 0.1, 20]} />
            </directionalLight>
        </group>
    )
}


function Sphere({ color = "hotpink", floatIntensity = 15, position = [0, 5, -8], scale = 1 }) {
    return (
        <Float floatIntensity={floatIntensity}>
            <mesh castShadow position={position} scale={scale}>
                <sphereGeometry />
                <meshBasicMaterial color={color} roughness={1} />
            </mesh>
        </Float>
    )
}

const EnvironmentParent = () => {
    const [bad, set] = useState(false)
    const [cameraZoomed, setCameraZoomed] = useState(false)
    // const { impl, debug, enabled, samples, ...config } = useControls({
    //     debug: true,
    //     enabled: true,
    //     size: { value: 35, min: 0, max: 100, step: 0.1 },
    //     focus: { value: 0.5, min: 0, max: 2, step: 0.1 },
    //     samples: { value: 16, min: 1, max: 40, step: 1 }
    // })
    const cameraControls = useRef();


    useEffect(() => {
        if (cameraControls.current) {
            // cameraControls.current.setLookAt(0, 2.2, 5, 0, 1.0, 0, true);
            // cameraControls.current.setLookAt(0, 2.2, 2.3, 0, 1, 0, true);
            // cameraControls.current.setLookAt(0, 2.2, 5, 0, 1.0, 0, true);
            cameraControls.current.setLookAt(0, 1, 1.5, 0, 0.5, 0, true);
        }
        let timeout = setTimeout(() => {
            setCameraZoomed(true)
        }, 300);
        return () => clearTimeout(timeout)
    }, [cameraZoomed]);

    return (
        <>

            <CameraControls ref={cameraControls} />
            <color attach="background" args={["#d0d0d0"]} />
            <fog attach="fog" args={["#d0d0d0", 8, 35]} />
            <ambientLight intensity={0.4} />
            <Light />
            <Room scale={0.5} position={[0, 0, 0]} />
            <Sphere />
            <Sphere position={[2, 4, -8]} scale={0.9} />
            <Sphere position={[-2, 2, -8]} scale={0.8} />
            <Sky inclination={0.52} scale={20} />
            <Character scale={1} position={[0, -0.9, 0]} rotation={[0, 0, 0]} />
            <ContactShadows scale={2} opacity={0.7} />
        </>
    )
}

export default EnvironmentParent