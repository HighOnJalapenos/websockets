import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [messageToSend, setMessageToSend] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      console.log("Connected to server");
      setSocket(socket);
    };

    socket.onmessage = (message) => {
      console.log(message.data);
      setMessages((prevMessages) => [...prevMessages, message.data]);
    };
  }, []);

  if (!socket) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <input
        type="text"
        value={messageToSend}
        onChange={(e) => setMessageToSend(e.target.value)}
      />
      <button
        onClick={() => {
          socket.send(messageToSend);
          setMessageToSend("");
        }}
      >
        Send
      </button>
    </>
  );
}

export default App;
