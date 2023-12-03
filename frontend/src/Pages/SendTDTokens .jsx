import HeaderMenu from '../Components/HeaderMenu';
import InputTransection from '../Components/InputTransaction';
import ButtonSecondary from '../Components/ButtonSecondary';

import tdTokenIcon from '../assets/td_token_icon.svg'

function SendTDTokens() {
    return (
        <div>
            <HeaderMenu text='Enviar TDTokens' />
            <div className='content_container'>
                <p className='main_description'>Você possui <span>10000</span> TDTokens</p>
                <InputTransection icon={tdTokenIcon} type="tdtoken" description="Quero Enviar" placeholder="100"/>
                <InputTransection icon={tdTokenIcon} type="pix" description="Para" placeholder="123.456.789-00"/>
                <div className='aling-right'>
                    <ButtonSecondary text="Enviar TDTokens" margin="25px 0px 0px 0px"/>
                </div>
            </div>
            <div className='content_container'>
                <p className='main_description'>Você possui <span>10000</span> TDTokens</p>
                <InputTransection icon={tdTokenIcon} type="tdtoken" description="Quero Enviar" placeholder="100"/>
                <InputTransection icon={tdTokenIcon} type="pix" description="Para" placeholder="123.456.789-00"/>
                <div className='aling-right'>
                    <ButtonSecondary text="Enviar TDTokens" margin="25px 0px 0px 0px"/>
                </div>
            </div>
        </div>
    )
}

export default SendTDTokens;