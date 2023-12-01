import './SingUp.css'
import './Main.css'
import HeaderMenu from '../Components/HeaderMenu';
import MenuItem from '../Components/MenuItem';
import PanelBalances from '../Components/PanelBalances';

import { FaWallet, FaMoneyBillTransfer } from "react-icons/fa6";

function Main() {
    return (
        <div>
            <HeaderMenu />
            <div className='content_container'>
                <PanelBalances />
                <div style={{'display': 'flex', 'justifyContent': 'center'}}>
                    <div className='grid_menu_container'>
                        <MenuItem icon={ FaWallet } color="#339E33" text="Comprar TDTokens"/>
                        <MenuItem icon={ FaMoneyBillTransfer } color="#339E33" text="Transferir"/>
                        <MenuItem icon={ FaWallet } color="#339E33" text="Transferir"/>
                        <MenuItem icon={ FaMoneyBillTransfer } color="#339E33" text="Transferir"/>
                        <MenuItem icon={ FaMoneyBillTransfer } color="#339E33" text="Transferir"/>
                        <MenuItem icon={ FaMoneyBillTransfer } color="#339E33" text="Transferir"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;