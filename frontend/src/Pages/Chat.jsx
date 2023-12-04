import { useState, useRef } from 'react'
import api from '../Api.js'

import './Chat.css'
import Message from '../Components/Message.jsx'
import { IconContext } from "react-icons";
import { LuSendHorizonal } from "react-icons/lu";
import HeaderMenu from '../Components/HeaderMenu.jsx';


function Chat(){
    const [messageList, setMessageList] = useState([]);
    const [waitingResponse, setWaitingResponse] = useState(false);
    const inputRef = useRef(null);

    // Type = client or assistent
    function addMessage(text,type){
        setMessageList(messageList => [...messageList, <Message key={messageList.length} message={text} type={type} />])
    }

    async function getChatResponse(text){
        try {
            setWaitingResponse(true)
            const response = await api.post(`/chat/question`, {
                "message": text
            });
            const data = response.data;
            addMessage(data.response, 'assistent')
        } catch (error) {
            console.log(error)
            addMessage("Ocorreu algum erro durante a nossa comunicação! Por favor, envie a mensagem novamente.", 'assistent')
        }
        setWaitingResponse(false)
    } 

    function sendMessage(){
        let text = inputRef.current.value
        if(text){
            addMessage(text, 'client')
            inputRef.current.value = ''

            getChatResponse(text)
        }
    }

    function sendSuggestion(text){
        inputRef.current.value = text
        sendMessage(text)
    }

    return(
        <div>
            <HeaderMenu text='Assistente' navigatePath={'/dashboard'} />
            <div className='content_container'>
                <div className='chat_container'>
                    <div className="message_container">
                        <div className='message assistent'>
                            Olá, sou seu assistente aqui da <span style={{color: '#339E33', fontWeight: '700'}}>Calango Bank</span> e abaixo tem alguns exemplos de pergunta que podem ser feitas.
                        </div>
                        <div className='message client suggestion' onClick={() => sendSuggestion('O que são TDTokens ?')}>
                            O que são TDTokens ?
                        </div>
                        <div className='message client suggestion' onClick={() => sendSuggestion('Como começar a investir em TDTokens ?')}>
                            Como começar a investir em TDTokens ?
                        </div>
                        {messageList}

                        {waitingResponse && 
                            <div className='message assistent loading'>
                                <span className='dot-one'>.</span>
                                <span className='dot-two'>.</span>
                                <span className='dot-three'>.</span>
                            </div>
                        }
                        
                    </div>
                    <div className='chat_bottom'>
                        <input ref={inputRef} type="text" placeholder='Pergunte-me qualquer coisa...'/>
                        <button 
                            onClick={sendMessage}
                        >
                            <IconContext.Provider value={{ className: 'icon', color: '#339E33' }}>
                                {< LuSendHorizonal />}
                            </IconContext.Provider> 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat;