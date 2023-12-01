import './PanelBalances.css'

function PanelBalances(){
    return (
        <div className='panel_balance_container'>
            <div className='balance'>
                <span>Saldo em reais:</span>
                <h1>R$ 1.520,00</h1>
            </div>
            <div className='balance'>
                <span>TDTokens:</span>
                <h1>R$ 150,80</h1>
            </div>
        </div>
    )
}

export default PanelBalances;