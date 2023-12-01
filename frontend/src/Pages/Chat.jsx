import { useState, useRef } from 'react'
import api from '../Api.js'

import './Chat.css'
import Message from '../Components/Message.jsx'
import { IconContext } from "react-icons";
import { LuSendHorizonal } from "react-icons/lu";


function Chat(){
    const [messageList, setMessageList] = useState([]);
    const [currentMessage, setCurrentMessage] = useState(['']);
    const inputRef = useRef(null);

    // Type = client or assistent
    function addMessage(text,type){
        // setMessageList(messageList.push(<Message key={messageList.length} message={text} type={type} />));
        setMessageList([...messageList, <Message key={messageList.length} message={text} type={type} />]);
        console.log(messageList)

    }

    async function getChatResponse(text){
        try {
            const response = await api.post(`chat/question`, {
                "message": text
            });
            const data = response.data;
            addMessage(data.response, 'assistent')
        } catch (error) {
            console.log(error)
        }
    } 

    function sendMessage(){
        let text = inputRef.current.value
        if(text){
            addMessage(text, 'client')
            
            inputRef.current.value = ''

            // getChatResponse(text)
        }
    }

    return(
        <div>
            <div className='chat_container'>
                <div className="message_container">
                    <div className='message assistent'>
                        Olá, sou seu assistente aqui da Calango Bank e fico disponível para perguntar qualquer coisa sobre investimentos.
                    </div>
                    {messageList}
                </div>
                <div className='chat_bottom'>
                    <input value={currentMessage} onChange={event => { setCurrentMessage(event.target.value) }} type="text" placeholder='Pergunte-me qualquer coisa...'/>
                    <button 
                        // onClick={sendMessage}
                        onClick={async () => {
                            let a = setMessageList([...messageList, <Message key={messageList.length} message={currentMessage} type={'client'} />])
                            console.log(a)
                            // await getChatResponse(currentMessage)

                        }}
                    >
                        <IconContext.Provider value={{ className: 'icon', color: '#75306c' }}>
                            {< LuSendHorizonal />}
                        </IconContext.Provider> 
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat


// import { useRef, useState } from 'react'
// import api from '../Api.js'
// import './Chat.css'
// import Message from '../Components/Message.jsx'
// import { IconContext } from "react-icons";
// import { LuSendHorizonal } from "react-icons/lu";


// function Chat(){
//     const [messageList, setMessageList] = useState([]);
//     const inputRef = useRef(null);

//     // Type = client or assistent
//     function addMessage(text,type){
//         let newList = messageList.concat(<Message key={messageList.length} message={text} type={type} />)
//         setMessageList(newList);
//         console.log(messageList)
//     }

//     // async function getChatResponse(text){
//     //     try {
//     //         const response = await api.post(`chat/question`, {
//     //             "message": text
//     //         });
//     //         const data = response.data;
//     //         addMessage(data.response, 'assistent')
//     //     } catch (error) {
//     //         console.log(error)
//     //     }
//     // } 

//     async function getChatResponse(text){
//         try {
//             api.post(`chat/question`, {
//                 "message": text
//             }).then( response => {
//                 let data = response.data;
//                 // addMessage(data.response, 'assistent')
//             })
//         } catch (error) {
//             console.log(error)
//         }
//     } 

//     function sendMessage(){
//         const text = inputRef.current.value
//         if(text){
//             console.log(messageList.length)
//             addMessage(text, 'client')
//             inputRef.current.value = ''

//             // getChatResponse(text)
//         }
//     }

//     return(
//         <div>
//             <div className='chat_container'>
//                 <div className="message_container">
//                     <div className='message assistent'>
//                         Olá, sou seu assistente aqui da Calango Bank e fico disponível para perguntar qualquer coisa sobre investimentos.
//                     </div>
//                     {messageList}
//                 </div>
//                 <div className='chat_bottom'>
//                     <input ref={inputRef} type="text" placeholder='Pergunte-me qualquer coisa...'/>
//                     <button 
//                         onClick={sendMessage}
//                     >
//                         <IconContext.Provider value={{ className: 'icon', color: '#75306c' }}>
//                             {< LuSendHorizonal />}
//                         </IconContext.Provider> 
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Chat