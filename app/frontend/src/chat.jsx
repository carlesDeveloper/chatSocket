import React,{useState, useEffect} from 'react'
import { useForm } from "react-hook-form";
import io from 'socket.io-client';

const socket = io('http://localhost:3003');
export default  function Chat({user}){
    const { register, handleSubmit } = useForm();
    const [mensajes, setMensajes] = useState({})
    useEffect(() => {
        console.log("entra en el useEffect")
        socket.on('mensajesChat', (mensajes) => {
            console.log("entra en el socket")
            debugger;
            setMensajes(mensajes)
        });
    },[])
    const sendValues = (d) => {
        console.log("se envian los valores")
        socket.emit("chat",{user: user,mensaje: d.message})
    }
    return(
        <>
            <form onSubmit={handleSubmit(sendValues)}>
                <div className='chat-box'>
                    <div className='user-box'>{user}</div>
                    <div className='message-box'>{mensajes.user}: {mensajes.mensaje}</div>
                    <input 
                        className='input-message-box' 
                        type="text" 
                        placeholder="Type a message" 
                        {...register("message")}
                    />
                    <input type="submit" value="Enviar"/>
                </div>
            </form>
            
        </>
    )
}