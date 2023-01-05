import { useState, useEffect, useContext } from 'react'
import reactLogo from './assets/react.svg'
import io from 'socket.io-client';
import './App.css'
import Chat from './chat';
import { user } from './constants'
import { GlobalContext } from './globalContext';

const socket = io('http://localhost:3003');
function App() {

  const {messages, setMessages} = useContext(GlobalContext);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  

  useEffect(() => {
    console.log("se intenta conectar")
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });

    

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  socket.on('mensajesChat', (mensajes) => {
    setMessages([...messages, {user: mensajes.user, mensaje: mensajes.mensaje}])
    // setMessages([{user:"filanito", mensaje:"esto es una prueba"}])
  });
  const sendPing = () => {
    socket.emit('ping');
  }


  const [count, setCount] = useState(0)
  
  return (
    <div className="App">
      <div>
        <p>Connected: { '' + isConnected }</p>
        <p>Last pong: { lastPong || '-' }</p>
        <button onClick={ sendPing }>Send ping</button>
      </div>
      <div className="card">
        <button onClick={ sendPing }>Send ping</button>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <Chat user={user} messages={messages} socket={socket} />
    </div>
  )
}

export default App
