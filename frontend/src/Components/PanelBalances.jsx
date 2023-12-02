import './PanelBalances.css'

function PanelBalances(){
    return (
        <div className='panel_balance_container'>
            <div className='right'>
                <span className='title'>Saldo</span>
                <h1>R$ 1.520,00</h1>
            </div>
            <div className='left'>
                <span className='title'>TDTokens</span>
                <h1>10000</h1>
                <span className='subtitle'>R$ 1.000,00</span>
            </div>
        </div>
    )
}

export default PanelBalances;