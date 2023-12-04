import { useEffect, useState } from 'react';
import HeaderMenu from '../Components/HeaderMenu';
import ButtonSecondary from '../Components/ButtonSecondary';
import TransactionItem from '../Components/TransactionItem';
import CurrencyFormat from 'react-currency-format';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import api from '../Api';

function ManageTDTokens() {

    const [user, setUser] = useState(null);
    const [loadingTransactions, setLoadingTransactions] = useState(true);
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(true);

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
                setLoadingTransactions(false);
    
                api.get('/balance/'+localStorage.getItem("userId"),
                { 
                    withCredentials: true
                }
                ).then(balanceResponse => {
                    const balance = balanceResponse.data.balance;
                    setBalance(balance)
                    setLoading(false)
                })
            }
        });
    }, []); 

   


    return (
        <div>
            <HeaderMenu text='Gerenciar TDTokens' navigatePath={'/dashboard'} />
            <div className='content_container'>
                <p className='main_description' style={{'display': 'flex'}}>
                    Você possui&nbsp;
                    <span>
                        { loading && <Skeleton style={{'width': '55px'}}/> }
                        { balance && <CurrencyFormat value={balance} displayType={'text'} decimalScale={2} thousandSeparator={'.'} decimalSeparator={','} prefix={''} /> }
                    </span>  
                    &nbsp;TDTokens
                </p>
                <div className='transactions_container'>
                    <span className='title'>Últimas movimentações</span>
                    <hr />
                    <div className='transactions_list' style={{height: '600px'}}>
                        { loadingTransactions && <Skeleton count={5} style={{height: '80px'}} /> }
                        { user && user.transactions &&
                            user.transactions.map((transaction, index) => {
                                return <TransactionItem key={index} date={transaction.date} description={transaction.description} tokenValue={transaction.tokenValue} sender={transaction.sender} /> 
                            })
                        }
                    </div>
                </div>
                <div className='aling-right aling-bottom'>
                    <ButtonSecondary navigate={'/tokens/buy'} text="Comprar TDTokens" margin="25px 0px 0px 0px"/>
                    <ButtonSecondary navigate={'/tokens/send'} text="Enviar TDTokens" margin="15px 0px 0px 0px"/>
                </div>
            </div>
        </div>
    )
}

export default ManageTDTokens;