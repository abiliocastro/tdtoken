import HeaderMenu from '../Components/HeaderMenu';
import logo from '../assets/logo.svg'

function SingUp() {
    return (
        <div>
            <HeaderMenu text="Cadastro"/>
            <div className='content_container'>
                <img src={logo} alt="" height= '44px' />

                <div style={{'margin-top': '139px'}} >
                    <h1 className="title_medium">Bem vindo, </h1>
                    <span className="subtitle_medium">Crie sua conta, o CalangoBank veio para vacilitar sua vida financeira.</span>
                </div>

                <div style={{'margin-top': '45px'}}>
                    <input type="text" placeholder="Nome Completo"/>
                    <input type="text" placeholder="Email/Usuário"/>
                    <input type="text" placeholder="CPF"/>

                    <button style={{'margin-top': '68px'}}>Continuar</button>
                </div>

                {/* <div style={{'display': 'flex', 'justifyContent': 'center', 'margin': '25px 0px 50px 0px'}}>
                    <span>Dont't have an account?</span>
                    <a href="http://">
                        <span>Sign In</span>
                    </a>
                </div> */}

                <div className='create_account_text'>
                    <a href="/">
                        Já tem uma conta? <span style={{fontWeight: 'bold'}}>Entrar</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SingUp;