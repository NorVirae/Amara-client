import { useEffect, useState } from "react";
import { useMessagingAPI } from "../hooks/useMessage";
import { Text } from "@react-three/drei";

const RingLoader = (props) => {
    const { loading } = useMessagingAPI();
    const [loadingText, setLoadingText] = useState("");
    useEffect(() => {
        if (loading) {
            const interval = setInterval(() => {
                setLoadingText((loadingText) => {
                    if (loadingText.length > 2) {
                        return ".";
                    }
                    return loadingText + ".";
                });
            }, 300);
            return () => clearInterval(interval);
        } else {
            setLoadingText("");
        }
    }, [loading]);
    if (!loading) return null;
    return (
        <group {...props}>
            <Text fontSize={0.14} anchorX={"left"} anchorY={"bottom"}>
                {loadingText}
                <meshBasicMaterial attach="material" color="black" />
            </Text>
        </group>
    );
}

export default RingLoader