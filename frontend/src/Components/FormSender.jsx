import { useEffect, useState } from "react";
import api from '../Api.js'

import './FormSender.css'

function FormSender() {
    const [balance, setBalance] = useState([]);

    async function getBalance(){
        try {
            const response = await api.get(`balance/AbilioCastro`);
            const data = response.data;
            setBalance(data.balance)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBalance();
    }, [])

    return (
        <div >
            <span className="text_small">Você tem </span>
            <h1 className="balance">{
                balance.length === 0 ? '---' : balance
            }&nbsp; TDTokens 
            </h1> 

            <button>
                Teste
            </button>
        </div>
    )
}

export default FormSender;