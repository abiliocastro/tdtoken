import api from '../Api';
import HeaderMenu from '../Components/HeaderMenu';
import InputTransection from '../Components/InputTransaction';
import ButtonSecondary from '../Components/ButtonSecondary';

import { useRef, useState } from 'react';

import tdTokenIcon from '../assets/td_token_icon.svg'
import pixIcon from '../assets/pix_icon.svg'

function SendTDTokens() {
    const amountField = useRef(null);
    const receiverField = useRef(null);
    const [message, setMessage] = useState('');

    const [amount, setAmount] = useState(null)
    const [receiver, setReceiver] = useState(null)
    const [receiverName, setReceiverName] = useState(null)
    const [transactionID, setTransactionID] = useState(null)
    const [showNextPage, setShowNextPage] = useState(1)

    function getReceiver(){
        return api.post('/user/load', {
            "email": receiver
        },
        { 
            withCredentials: true
        }
        ).then(response => {
            if(response.status == 200){
                return response
            }
        })
    }

    function sendTransaction(){
        if(amount && receiver){
            amountField.current.value = ''
            receiverField.current.value = ''

            api.post('/sendTransaction', {
                "sender": localStorage.getItem("userId"),
                "receiver": receiver,
                "amount": parseFloat(amount)
            },
            { 
                withCredentials: true
            }
            ).then(response => {
                if(response.status == 200){
                    setTransactionID(response.data)
                    setShowNextPage(3)
                }
            })
        }

    }

    function nextPage(){
        if(showNextPage < 3){
            if(showNextPage == 1) {
                getReceiver().then(response => {
                    setReceiverName(response.data.name)
                })
            }
            setShowNextPage(showNextPage + 1)
        }
    }

    function previewPage(){
        if(showNextPage > 1){
            setShowNextPage(showNextPage - 1)
        }
    }

    return (
        <div>
            <HeaderMenu text='Enviar TDTokens' />
            <div className='content_container' style={showNextPage == 1 ? {display: 'flex'} : {display: 'none'}}>
                <p className='main_description'>Você possui <span>10000</span> TDTokens</p>
                <div>
                    <p className='input_transaction_description'>Quero Enviar</p>
                    <div className='input_transection'>
                        <img src={tdTokenIcon} alt="" className='icon'/>
                        <input ref={amountField} value={amount} onChange={event => setAmount(event.target.value)} type="text" placeholder="100"/>
                        <span className='text_type'>TDToken</span>
                    </div>
                </div>
                <div>
                    <p className='input_transaction_description'>Para</p>
                    <div className='input_transection'>
                        <img src={pixIcon} alt="" className='icon'/>
                        <input ref={receiverField} value={receiver} onChange={event => setReceiver(event.target.value)} type="text" placeholder="email@email.com"/>
                    </div>
                </div>
                <div className='aling-right'>
                    <button onClick={nextPage} className='button_secondary' style={{marginTop: '25px'}}> Enviar TDTokens </button>
                </div>
                {message}
            </div>
            <div className='content_container' style={showNextPage == 2 ? {display: 'flex'} : {display: 'none'}}>
                <p className='main_description'>Você possui <span>10000</span> TDTokens</p>
                <p className='main_description'>
                    Confirmo que quero enviar <span>{amount} TDTokens </span>
                    para <span>{receiverName}</span>
                </p>
                <input className="defaultInput" type="password" placeholder="Senha"/>
                <div className='aling-right'>
                    <button onClick={sendTransaction} className='button_secondary' style={{marginTop: '25px'}}> Confirmar envio </button>
                </div>
            </div>
            <div className='content_container' style={showNextPage == 3 ? {display: 'flex'} : {display: 'none'}}>
                <div className='checking_copy_container'>
                    <div className="header">
                        <h1>Comprovante</h1>
                    </div>
                    <div className="content">
                        <h1 className='title'>Envio de TDTokens</h1>
                        <p className='description'>
                            Foram Enviado <span>{amount} TDTokens</span> Para <span> {receiverName}</span>
                        </p>
                        <p>
                            <span>ID da Transação: </span>
                            {transactionID}
                        </p>
                    </div>
                    <button className='button_secondary' style={{marginTop: '55px'}}>Compartilhar comprovante</button>
                </div>
            </div>
        </div>
    )
}

export default SendTDTokens;