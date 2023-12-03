import './PanelBalances.css'

function PanelBalances(props){
    return (
        <div className='panel_balance_container'>
            <div className='right'>
                <span className='title'>Saldo</span>
                <h1>R$ { props.realBalance ? props.realBalance : "---" }</h1>
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