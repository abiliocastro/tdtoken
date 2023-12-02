import { useRef } from 'react'
import api from '../Api.js'

import HeaderMenu from '../Components/HeaderMenu';
import logo from '../assets/logo.svg'

import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

function SingIn() {
    const navigate = useNavigate();

    const userField = useRef(null);
    const passwordField = useRef(null);

    function authentication(){
        const user = userField.current.value;
        const password = passwordField.current.value;

        if(user && password){
            try {
                api.post('/login', {
                    "email": user,
                    "password": password
                },
                { 
                    withCredentials: true
                }
                ).then(response => {
                    console.log(response.data.message)
                    // Cookies.get("")

                    if(response.data.message == 'success'){
                        navigate('/dashboard');
                    }
                })
            } catch (error) {
                console.log(error)
            }
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
                    <a onClick={() => { navigate('/createAccount'); }}>
                        Não tem uma conta? <span style={{fontWeight: 'bold'}}>Cadastrar</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SingIn;