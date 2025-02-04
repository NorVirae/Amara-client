import { createContext, useContext, useEffect, useState } from "react";

const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const message = async ({ audioString, textInput }) => {
    setLoading(true);
    try {
      console.log(textInput)

      const data = await axios({
        method: 'post',
        url: `${backendUrl}/chat`,
        data: { audio: audioString, textInput }
      })

      setLoading(false);
      const messages = (await data.json()).messages;
      setMessages(messages);
      setMessageChat(messages[0]);
    } catch (err) {
      setLoading(false);
      const messages = err.response.message.messages;
      setMessages(messages);
      setMessageChat(messages[0]);
    }

    const messages = (await data.json()).messages;
    setMessages(messages);
    setMessageChat(messages[0]);
  };
  const [messageChat, setMessageChat] = useState();
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false);
  const [cameraZoomed, setCameraZoomed] = useState(true);
  const onMessagePlayed = () => {
    setMessages((messages) => {
      let newMessage = messages.slice(1)
      setMessageChat(newMessage[0])
      return newMessage
    });
  };

  return (
    <MessageContext.Provider
      value={{
        chat: message,
        message,
        onMessagePlayed,
        loading,
        cameraZoomed,
        setCameraZoomed,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessagingAPI = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
