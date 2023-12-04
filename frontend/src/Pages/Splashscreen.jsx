import '../Pages/Splashscreen.css';
import inicial from '../assets/inicial.png';

function Splashscreen() {
    return (
        <div>
           


             {/* <HeaderMenu text='Entrar' /> */}
            <div className='splashscreen-container'>
            <div className='content_container'>
                <img src={inicial} alt="" height= '126px' />
                
                <div style={{'margin-top': '139px'}} >
                    <h1 className="title_medium">O Banco que te ajuda</h1>
                    <span className="subtitle_medium">“No mercado financeiro, cada investimento é uma semente de transformação, cultivando oportunidades que florescem na vida das pessoas.”</span>
                </div>
        

                
                    <button className='transparent' style={{'margin-top': '68px'}}>Acessar sua conta</button>
                
           
                    <button style={{'margin-top': '28px'}}>Criar conta</button>
             
                </div>

                
                </div>
        </div>
    )
}

export default Splashscreen;
