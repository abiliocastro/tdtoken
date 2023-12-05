import { useEffect, useState, useRef } from 'react';
import HeaderMenu from '../Components/HeaderMenu';
import InputTransection from '../Components/InputTransaction';
import ButtonSecondary from '../Components/ButtonSecondary';
import LoadAnimation from '../Components/LoadAnimation.jsx'
import CurrencyFormat from 'react-currency-format';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import tdTokenIcon from '../assets/td_token_icon.svg'

import api from '../Api.js'
import currencyApi from '../CurrencyApi.js'

function BuyTDTokens() {
    const [loadingRequest, setLoadingRequest] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingCurrentValue, setLoadingCurrentValue] = useState(true);
    const [amount, setAmount] = useState(null)
    const [currentValue, setCurrentValue] = useState(null)
    const [transactionID, setTransactionID] = useState(null)
    const [showNextPage, setShowNextPage] = useState(1)

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
                    setLoadingCurrentValue(false)
                })
            }
        })
    }, []);

    function buyTokens(){
        if(amount){
            setLoadingRequest(true)
            amountField.current.value = ''
            api.post('/buyTokens', {
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
                setLoadingRequest(false)
            }).catch(error => {
                console.log(error)
                setLoadingRequest(false)
            })
        }
    }

    function nextPage(){
        if(showNextPage < 3){
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
            { loadingRequest && <LoadAnimation /> }

            <HeaderMenu text='Comprar TDTokens' navigatePath={'/tokens/manage'} />
            <div className='content_container' style={showNextPage == 1 ? {display: 'flex'} : {display: 'none'}}>
                <p className='main_description' style={{'display': 'flex'}}>
                    Seu saldo em reais é &nbsp;
                    <span>
                        { loading && <Skeleton style={{'width': '55px'}}/> }
                        { user && <CurrencyFormat value={user.realBalance} displayType={'text'} decimalScale={2} thousandSeparator={'.'} decimalSeparator={','} prefix={' R$ '} /> }
                    </span>
                </p>
                <div>
                    <p className='input_transaction_description'>Quero Comprar</p>
                    <div className='input_transection'>
                        <img src={tdTokenIcon} alt="" className='icon'/>
                        <input ref={amountField} value={amount} onChange={event => setAmount(event.target.value)} type="number" min="1" placeholder="100"/>
                        <span className='text_type'>TDToken</span>
                    </div>
                </div>
                <p className='main_current_value'>
                    Valor Atual: 
                    <span>
                        { loadingCurrentValue && <Skeleton style={{'width': '55px'}}/> }
                        { currentValue && <CurrencyFormat value={currentValue} displayType={'text'}  prefix={' R$ '} /> }
                    </span>
                </p>
                <div className='aling-right'>
                    <button onClick={nextPage} className='button_secondary' style={{marginTop: '25px'}}> Comprar TDTokens </button>
                </div>
            </div>
            <div className='content_container' style={showNextPage == 2 ? {display: 'flex'} : {display: 'none'}}>
                <p className='main_description'>Seu saldo em reais é 
                    <span>
                        { loading && <Skeleton /> }
                        { user && <CurrencyFormat value={user.realBalance} displayType={'text'} decimalScale={2} thousandSeparator={'.'} decimalSeparator={','} prefix={' R$ '} /> }
                    </span>
                </p>
                <p className='main_description'>
                    Confirmo que quero comprar <span>{amount} TDTokens </span>
                    pelo valor de <span>R$ {(currentValue * amount).toFixed(2)}</span>
                </p>
                <input className="defaultInput" type="password" placeholder="Senha"/>
                <div className='aling-right'>
                    <button onClick={buyTokens} className='button_secondary' style={{marginTop: '25px'}}> Confirmar compra </button>
                </div>
            </div>
            <div className='content_container' style={showNextPage == 3 ? {display: 'flex'} : {display: 'none'}}>
                <div className='checking_copy_container'>
                    <div className="header">
                        <h1>Comprovante</h1>
                    </div>
                    <div className="content">
                        <h1 className='title'>Compra de TDTokens</h1>
                        <p className='description'>
                            Você comprou <span>{amount} TDTokens</span> Valor: <span>R$ {(currentValue * amount).toFixed(2)}</span>
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

export default BuyTDTokens;