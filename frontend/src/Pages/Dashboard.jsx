// import './SingUp.css'
import './Dashboard.css'
import HeaderMenu from '../Components/HeaderMenu';
import MenuItem from '../Components/MenuItem';
import PanelBalances from '../Components/PanelBalances';

import { FaWallet } from "react-icons/fa6";
import TransactionItem from '../Components/TransactionItem';

function Main() {
    return (
        <div>
            <HeaderMenu />
            <div className='content_container'>
                <PanelBalances />
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
                    <TransactionItem date='02/12/2023' value={15.98} sender="Escolinha RN ME"/>
                    <TransactionItem date='02/12/2023' value={12.80} sender="Maria Tereza"/>
                    <TransactionItem date='01/12/2023' value={-57.10} sender="Toninho Tornado"/>
                    <TransactionItem date='01/12/2023' value={17.50} sender="Chico Mariola"/>
                </div>
            </div>
        </div>
    )
}

export default Main;