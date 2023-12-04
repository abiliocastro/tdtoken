import { useEffect, useState } from 'react';
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

    return (
        <div>
            <HeaderMenu text='Comprar TDTokens' />
            <div className='content_container'>
                <p className='main_description'>Seu saldo em reais é 
                    <span>
                        { loading && <Skeleton /> }
                        { user && <CurrencyFormat value={user.realBalance} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={' R$ '} /> }
                    </span>
                </p>
                <InputTransection icon={tdTokenIcon} type="tdtoken" description="Quero Comprar"/>
                <p className='main_current_value'>Valor Atual: <span>{ currentValue && <CurrencyFormat value={currentValue} displayType={'text'}  prefix={' R$ '} /> }</span></p>
                <div className='aling-right'>
                    <ButtonSecondary text="Comprar TDTokens" margin="25px 0px 0px 0px"/>
                </div>
            </div>
        </div>
    )
}

export default BuyTDTokens;