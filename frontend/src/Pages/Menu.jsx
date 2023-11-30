import './SingUp.css'
import './Menu.css'
import HeaderMenu from '../Components/HeaderMenu';
import MenuItem from '../Components/MenuItem';

import { FaWallet, FaMoneyBillTransfer } from "react-icons/fa6";

function Menu() {
    return (
        <div>
            <HeaderMenu />
            <div className='content_container'>
                <div style={{'display': 'flex', 'justifyContent': 'center'}}>
                    <div className='grid_menu_container'>
                        <MenuItem icon={ FaWallet } color="#3629B7" text="Comprar TDTokens"/>
                        <MenuItem icon={ FaMoneyBillTransfer } color="#FF4267" text="Transferir"/>
                        <MenuItem icon={ FaWallet } color="#FFAF2A" text="Transferir"/>
                        <MenuItem icon={ FaMoneyBillTransfer } color="#52D5BA" text="Transferir"/>
                        <MenuItem icon={ FaMoneyBillTransfer } color="#52D5BA" text="Transferir"/>
                        <MenuItem icon={ FaMoneyBillTransfer } color="#52D5BA" text="Transferir"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu;