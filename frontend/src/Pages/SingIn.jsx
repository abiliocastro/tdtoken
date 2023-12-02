import { useRef } from 'react'
import api from '../Api.js'

import HeaderMenu from '../Components/HeaderMenu';
import logo from '../assets/logo.svg'

function SingIn() {

    const userField = useRef(null);
    const passwordField = useRef(null);

    async function authentication(){
        const user = userField.current.value;
        const password = passwordField.current.value;

        if(user && password){
            console.log(user)
            console.log(password)
            const response = await api.post('/login', {
                "email": user,
                "password": password
            },
            { 
                withCredentials: true
            })
            console.log(response)
        }
    }

    return (
        <div>
            <HeaderMenu text='Entrar' />
            <div className='content_container'>
                <img src={logo} alt="" height= '44px' />

                <div style={{'margin-top': '139px'}} >
                    <h1 className="title_medium">Bem vindo de volta!</h1>
                    <span className="subtitle_medium">Olá, entre em sua conta para continuar</span>
                </div>

                <div style={{'margin-top': '45px'}}>
                    <input type="text" ref={userField} placeholder="Email/Usuário"/>
                    <input type="password" ref={passwordField} placeholder="Senha"/>
                    <p className='forget_password_option'>
                        <a href="http://">Esqueceu a senha ?</a>
                    </p>

                    <button style={{'margin-top': '68px'}} onClick={authentication}>Entrar</button>
                </div>

                <div className='create_account_text'>
                    <a href="/createAccount">
                        Não tem uma conta? <span style={{fontWeight: 'bold'}}>Cadastrar</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SingIn;