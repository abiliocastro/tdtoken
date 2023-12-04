import { useEffect, useState, useRef } from 'react';
import HeaderMenu from '../Components/HeaderMenu';
import InputTransection from '../Components/InputTransaction';
import ButtonSecondary from '../Components/ButtonSecondary';
import CurrencyFormat from 'react-currency-format';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import tdTokenIcon from '../assets/td_token_icon.svg'

import api from '../Api.js'
import currencyApi from '../CurrencyApi.js'

function BuyTDTokens() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentValue, setCurrentValue] = useState(null)
    const amountField = useRef(null);

    useEffect(() => {
        api.post('/user/load', {
            "email": localStorage.getItem("userId")
        },
        { 
            withCredentials: true
        }
        ).then(response => {
            if(response.status == 200){
                let user = response.data;
                setUser(user);
                setLoading(false);
                
                currencyApi.get().then(responseCurrency => {
                    const currentValue = responseCurrency.data.data.rates['BRL']
                    setCurrentValue((parseFloat(currentValue)).toFixed(4))
                    // setLoadingBalanceToReal(false)
                })
            }
        })
    }, []);

    function buyTokens(){
        let amount = amountField.current.value
        if(amount){
            amountField.current.value = ''
            api.post('/buyTokens', {
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
            <HeaderMenu text='Comprar TDTokens' />
            <div className='content_container'>
                <p className='main_description'>Seu saldo em reais é 
                    <span>
                        { loading && <Skeleton /> }
                        { user && <CurrencyFormat value={user.realBalance} displayType={'text'} decimalScale={2} thousandSeparator={'.'} decimalSeparator={','} prefix={' R$ '} /> }
                    </span>
                </p>
                <div>
                    <p className='input_transaction_description'>Quero Comprar</p>
                    <div className='input_transection'>
                        <img src={tdTokenIcon} alt="" className='icon'/>
                        <input ref={amountField} type="text" placeholder="100"/>
                        <span className='text_type'>TDToken</span>
                    </div>
                </div>
                <p className='main_current_value'>Valor Atual: <span>{ currentValue && <CurrencyFormat value={currentValue} displayType={'text'}  prefix={' R$ '} /> }</span></p>
                <div className='aling-right'>
                    <button onClick={buyTokens} className='button_secondary' style={{marginTop: '25px'}}> Comprar TDTokens </button>
                </div>
            </div>
        </div>
    )
}

export default BuyTDTokens;