import { ContactShadows } from "@react-three/drei";
import { Character } from "./Character";
import { useEffect } from "react";


import { useRef, useState } from "react"
import { CameraControls, Sky } from "@react-three/drei"

import { Model as Room } from "./Room"
import RingLoader from "./RingLoader";
import Light from "./Light";
import Sphere from "./Sphere";





const EnvironmentParent = () => {
    const [cameraZoomed, setCameraZoomed] = useState(false)

    const cameraControls = useRef();


    useEffect(() => {
        if (cameraControls.current) {
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
            <RingLoader position-y={1.75} position-x={-0.02}  />
            <Character scale={1} position={[0, -0.9, 0]} rotation={[0, 0, 0]} />
            <ContactShadows scale={2} opacity={0.7} />
        </>
    )
}

export default EnvironmentParent