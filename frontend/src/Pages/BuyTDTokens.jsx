import HeaderMenu from '../Components/HeaderMenu';
import InputTransection from '../Components/InputTransaction';
import ButtonSecondary from '../Components/ButtonSecondary';

import tdTokenIcon from '../assets/td_token_icon.svg'

function BuyTDTokens() {
    return (
        <div>
            <HeaderMenu text='Comprar TDTokens' />
            <div className='content_container'>
                <p className='main_description'>Seu saldo em reais é <span>R$ 1.520,00</span></p>
                <InputTransection icon={tdTokenIcon} type="tdtoken" description="Quero Comprar"/>
                <p className='main_current_value'>Valor Atual: <span>R$ 10,00</span></p>
                <div className='aling-right'>
                    <ButtonSecondary text="Comprar TDTokens" margin="15px 0px 0px 0px"/>
                </div>
            </div>
        </div>
    )
}

export default BuyTDTokens;