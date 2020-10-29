import React, { useState } from 'react';
import Header from '../../componentes/header';
import Footer from '../../componentes/footer';
import Input from '../../componentes/input';
import Button from '../../componentes/button';
import { useHistory } from 'react-router-dom';

function Login() {

    let history = useHistory();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const login = () =>{
        const login ={
            email:email,
            senha:senha,
        }

        fetch('http://localhost:5000/api/conta/login',{
            method: 'POST',
            body: JSON.stringify(login),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then (response => response.json())
        .then (dados =>{
            localStorage.setItem('token', dados.token)
            history.push('/');
        })
        .catch(erro => console.error(erro)) 
    }

    return(
        <div>
            <Header title="Acesse sua plataforma"/>
            <h1>Login</h1>
            <div className="centro">
                <form onSubmit={event => {
                    event.preventDefault();
                    login()
                } }>
                    <Input name="email" label="E-mail" onChange={e => setEmail(e.target.value)}/><br/>
                    <Input type="password" name="senha" label="Senha" onChange={e => setSenha(e.target.value)}/>
                    <div className="btn">
                        <Button value="Enviar"/>
                    </div>
                </form>
            </div>
            <Footer/>
        </div>
    )
}

export default Login;