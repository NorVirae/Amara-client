import { BeatLoader, CircleLoader, ClipLoader, PulseLoader, RiseLoader, ScaleLoader } from "react-spinners"
import { useMessagingAPI } from "../hooks/useMessage"
import { useState } from "react";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};


const ThinkLoader = () => {
    const { loading } = useMessagingAPI()
    let [color, setColor] = useState("#ffffff");
    if (!loading) return null
    return (
        <>
            <h1 style={{ color: "white" }} className="text-xl font-extrabold text-gray-800 mb-2">Thinking</h1>
            <PulseLoader
                color={color}
                loading={loading}
                cssOverride={override}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </>
    )
}

export default ThinkLoader