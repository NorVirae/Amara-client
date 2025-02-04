import { useEffect, useRef, useState } from "react";
import AudioRecorder from "../components/AudioRecorder";
import { useMessagingAPI } from "../hooks/useMessage";

export default function ChatUI({ hidden, ...props }) {
    const input = useRef();
    const { chat, loading, cameraZoomed, setCameraZoomed, message } = useMessagingAPI();
    const [enableTextBox, setEnableTextBox] = useState(false)
    const [transactionHash, setTrasactionHash] = useState(null)

    const sendMessage = () => {
        const text = input.current.value;
        if (!loading && !message) {
            chat({ audioString: null, textInput: text });
            input.current.value = "";
            setEnableTextBox(false)
            setTrasactionHash(null)

        }
    };

    useEffect(() => {
        if (message && message.action) {
            setEnableTextBox(true)
        }
        if (message && message.transactionHash) {
            console.log(message.transactionHash, "TransactionHash")
            if (message.transactionHash.slice(0, 2) == "0x") {
                setTrasactionHash(message.transactionHash)
            } else {
                setTrasactionHash("0x" + message.transactionHash)
            }
        }
    }, [message])


    if (hidden) {
        return null;
    }

    return (
        <>
            <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
                <div className="self-end backdrop-blur-md bg-white bg-opacity-50 p-4 rounded-lg">
                    <h1 className="font-black text-xl">Amara</h1>
                    <p>AssetChain AI Agent</p>
                </div>
                <div className="w-full flex flex-col items-end justify-center gap-4">
                    {transactionHash && <div className="self-start bg-white/50 backdrop-blur-md p-6 rounded-2xl shadow-md">
                        <h1 className="text-xl font-extrabold text-gray-800 mb-2">Transaction Hash</h1>
                        <button
                            onClick={() =>
                                window.open(
                                    "https://scan-testnet.assetchain.org/tx/" + transactionHash,
                                    "_blank",
                                    "noopener,noreferrer"
                                )
                            }
                            className="pointer-events-auto px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Click to View
                        </button>
                    </div>}

                </div>
                <div className="flex items-center justify-center gap-2 pointer-events-auto max-w-screen-sm w-full mx-auto ">
                    <AudioRecorder setTransactionHash={setTrasactionHash} loading={loading} message={message} />

                </div>
            </div>
        </>
    );
};

