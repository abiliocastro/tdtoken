// import './SingUp.css'
import './Dashboard.css'
import { useEffect, useState } from "react"
import HeaderMenu from '../Components/HeaderMenu';
import MenuItem from '../Components/MenuItem';
import CurrencyFormat from 'react-currency-format';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { FaWallet } from "react-icons/fa6";
import TransactionItem from '../Components/TransactionItem';
import api from '../Api.js'

function Main() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [balance, setBalance] = useState(null);
    const [loadingBalance, setLoadingBalance] = useState(true);
    const [balanceToReal, setBalanceToReal] = useState(null);
    const [loadingBalanceToReal, setLoadingBalanceToReal] = useState(true);

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

                api.get('/balance/'+user.email,
                { 
                    withCredentials: true
                }
                ).then(balanceResponse => {
                    const balance = balanceResponse.data.balance;
                    setBalance(balance)
                    setLoadingBalance(false)

                    const TD_TOKEN_CURRENT_VALUE = 0.15
                    setBalanceToReal((balance * TD_TOKEN_CURRENT_VALUE).toFixed(2))
                    setLoadingBalanceToReal(false)

                })
            }
        });
    }, []);
    
    return (
        <div>
            <HeaderMenu />
            <div className='content_container'>
                <div className='panel_balance_container'>
                    <div className='right'>
                        <span className='title'>Saldo</span>
                        <h1>
                            { loading && <Skeleton /> }
                            { user && <CurrencyFormat value={user.realBalance} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'R$ '} /> }
                        </h1>
                    </div>
                    <div className='left'>
                        <span className='title'>TDTokens</span>
                        <h1>
                            { loadingBalance && <Skeleton /> }
                            { balance && <CurrencyFormat value={balance} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={''} /> }
                        </h1>
                        <span className='subtitle'>
                            { loadingBalanceToReal && <Skeleton /> }
                            { balanceToReal && <CurrencyFormat value={balanceToReal} displayType={'text'} isNumericString={true} thousandSeparator={'.'} decimalSeparator={','} prefix={'R$ '}/> }
                        </span>
                    </div>
                </div>
                <div style={{'display': 'flex', 'justifyContent': 'center'}}>
                    <div className='grid_menu_container'>
                        <MenuItem icon={ FaWallet } color="#ffffff" text="Chave Pix"/>
                        <MenuItem icon={ FaWallet } color="#ffffff" text="Chave Pix"/>
                        <MenuItem icon={ FaWallet } color="#ffffff" text="Chave Pix"/>
                        <MenuItem icon={ FaWallet } color="#ffffff" text="Chave Pix"/>
                    </div>
                </div>
                <div className='transactions_container'>
                    <span className='title'>Últimas movimentações</span>
                    <hr />
                    { loading && <Skeleton count={5} style={{height: '80px'}} /> }
                    { user && user.transactions &&
                        user.transactions.map((transaction, index) => {
                            return <TransactionItem key={index} date={transaction.date} value={transaction.value} sender={transaction.sender} /> 
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Main;