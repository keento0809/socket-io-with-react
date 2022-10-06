import "./App.css";
import io from "socket.io-client";
import React, { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");
function App() {
  const [message, setMessage] = useState([]);
  const [messageReceivedArr, setMessageReceivedArr] = useState("");
  const sendMessage = () => {
    socket.emit("send_message", { message });
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      // alert(data.message);
      setMessageReceivedArr([...messageReceivedArr, data.message]);
    });
  }, []);
  return (
    <div className="App">
      <input
        type="text"
        placeHolder="Message..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message: </h1>
      {messageReceivedArr}
    </div>
  );
}

export default App;
