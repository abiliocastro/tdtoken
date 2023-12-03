import HeaderMenu from '../Components/HeaderMenu';
import ButtonSecondary from '../Components/ButtonSecondary';
import TransactionItem from '../Components/TransactionItem';

function ManageTDTokens() {
    return (
        <div>
            <HeaderMenu text='Gerenciar TDTokens' />
            <div className='content_container'>
                <p className='main_description'>Você possui <span>10000</span> TDTokens</p>
                <div className='transactions_container'>
                    <span className='title'>Extrato de TDTokens</span>
                    <hr />
                    <TransactionItem date='02/12/2023' value={15.98} sender="Escolinha RN ME"/>
                    <TransactionItem date='02/12/2023' value={12.80} sender="Maria Tereza"/>
                    <TransactionItem date='01/12/2023' value={-57.10} sender="Toninho Tornado"/>
                    <TransactionItem date='01/12/2023' value={17.50} sender="Chico Mariola"/>
                </div>
                <div className='aling-right'>
                    <ButtonSecondary text="Comprar TDTokens" margin="25px 0px 0px 0px"/>
                    <ButtonSecondary text="Enviar TDTokens" margin="15px 0px 30px 0px"/>
                </div>
            </div>
        </div>
    )
}

export default ManageTDTokens;