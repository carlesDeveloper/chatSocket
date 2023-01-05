import React,{useState, useEffect} from 'react'
import { useForm } from "react-hook-form";

export default  function Chat({user, messages, socket}){
    const { register, handleSubmit } = useForm();
    console.log(messages)
    // useEffect(() => {
    //     console.log("entra en el useEffect")
    //     socket.on('mensajesChat', (mensajes) => {
    //         debugger;
    //         messages.push(mensajes)
    //     });
    // },[])
    const sendValues = (d) => {
        console.log("se envian los valores")
        socket.emit("chat",{user: user,mensaje: d.message})
    }
    return(
        <>
            <form onSubmit={handleSubmit(sendValues)}>
                <div className='chat-box'>
                    <div className='user-box'>{user}</div>
                    <div className='message-box'><ul>{messages !== undefined && messages.map(e => (<li>{e.user}: {e.mensaje}</li>))}</ul></div>
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