// import './SingUp.css'
import './Dashboard.css'
import { useEffect, useState } from "react"
import HeaderMenu from '../Components/HeaderMenu';
import MenuItem from '../Components/MenuItem';
import PanelBalances from '../Components/PanelBalances';
import CurrencyFormat from 'react-currency-format';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { FaWallet } from "react-icons/fa6";
import TransactionItem from '../Components/TransactionItem';
import api from '../Api.js'

function Main() {
    const [user, setUser] = useState(null);
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
                setLoading(false);
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
                        <h1>10000</h1>
                        <span className='subtitle'>R$ 1.000,00</span>
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