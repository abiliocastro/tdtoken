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

    function sendTransaction(){
        const amount = amountField.current.value;
        const receiver = receiverField.current.value;

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
                    console.log(response)
                }
            })
        }

    }

    return (
        <div>
            <HeaderMenu text='Enviar TDTokens' />
            <div className='content_container'>
                <p className='main_description'>Você possui <span>10000</span> TDTokens</p>
                <div>
                    <p className='input_transaction_description'>Quero Enviar</p>
                    <div className='input_transection'>
                        <img src={tdTokenIcon} alt="" className='icon'/>
                        <input ref={amountField} type="text" placeholder="100"/>
                        <span className='text_type'>TDToken</span>
                    </div>
                </div>
                <div>
                    <p className='input_transaction_description'>Para</p>
                    <div className='input_transection'>
                        <img src={pixIcon} alt="" className='icon'/>
                        <input ref={receiverField} type="text" placeholder="email@email.com"/>
                    </div>
                </div>
                <div className='aling-right'>
                    <button onClick={sendTransaction} className='button_secondary' style={{marginTop: '25px'}}> Enviar TDTokens </button>
                </div>
                {message}
            </div>
            {/* <div className='content_container'>
                <p className='main_description'>Você possui <span>10000</span> TDTokens</p>
                <InputTransection icon={tdTokenIcon} type="tdtoken" description="Quero Enviar" placeholder="100"/>
                <InputTransection icon={tdTokenIcon} type="pix" description="Para" placeholder="123.456.789-00"/>
                <div className='aling-right'>
                    <ButtonSecondary text="Enviar TDTokens" margin="25px 0px 0px 0px"/>
                </div>
            </div> */}
        </div>
    )
}

export default SendTDTokens;