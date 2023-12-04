import '../Pages/Splashscreen.css';
import inicial from '../assets/inicial.png';
import { useNavigate } from 'react-router-dom';

function Splashscreen() {
    const navigate = useNavigate();

    return (
        <div>
            <div className='splashscreen_container content_container'>
                <img className='img-splash' src={inicial} alt="" height= '126px' />
                <span className="slogan_text">O Banco que te ajuda</span>
                <h4 className="effect-phrase">“No mercado financeiro, cada investimento é uma semente de transformação, cultivando oportunidades que florescem na vida das pessoas.”</h4>
                <button className='button_access' onClick={() => { navigate('/login'); }} >Acessar sua conta</button>
                <button className='button_primary' onClick={() => { navigate('/createAccount'); }} style={{'marginTop': '28px'}}>Criar conta</button>
            </div>
        </div>
    )
}

export default Splashscreen;
