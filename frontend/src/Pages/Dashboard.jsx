// import './SingUp.css'
import './Dashboard.css'
import { useEffect, useState } from "react"
import HeaderMenu from '../Components/HeaderMenu';
import MenuItem from '../Components/MenuItem';
import PanelBalances from '../Components/PanelBalances';

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
                <PanelBalances realBalance={ user && user.realBalance}/>
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
                    { loading && 
                        <div>
                            <div className='load-item-one'></div>
                            <div className='load-item-two'></div>
                            <div className='load-item-three'></div>
                        </div>
                    }
                    { user && 
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