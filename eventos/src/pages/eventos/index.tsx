import React, { useState, useEffect } from 'react';
import Header from '../../componentes/header';
import Footer from '../../componentes/footer';
import Button from '../../componentes/button';
import Input from '../../componentes/input';
import './style.css';


function Eventos() {

    const [idFilme, setIdFilme] = useState(0);
    const [filme, setFilme] = useState('');
    const [genero, setGenero] = useState('');

    const [generos, setGeneros] = useState([]);
    const [filmes, setFilmes] = useState([]);


    useEffect(() => {
        listarFilmes();
        listarGeneros();
    }, []);

    const listarFilmes = () => {
        fetch('http://localhost:5000/api/filmes', {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(dados => {
                setFilmes(dados);
            })
            .catch(err => console.error(err));
    }

    const listarGeneros = () => {
        fetch('http://localhost:5000/api/generos', {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(dados => {
                setGeneros(dados);
            })
            .catch(err => console.error(err));
    }

    const trash = (id: any) => {
        if (window.confirm('deseja excluir o Filme?')) {
            fetch('http://localhost:5000/api/filmes/' + id, {
                method: 'DELETE',
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token-filmes')
                }
            })
                .then(response => response.json())
                .then(dados => {
                    listarFilmes();
                })
                .catch(err => console.error(err));
        }
    }

    const refresh = (id: any) => {
        fetch('http://localhost:5000/api/filmes/' + id, {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-filmes')
            }
        })
            .then(response => response.json())
            .then(dados => {
                setIdFilme(dados.idFilme);
                setFilme(dados.titulo);
                setGenero(dados.idGenero)
            })
            .catch(err => console.error(err));
    }

    const salvar = () => {
        const form = {
            titulo: filme,
            idGenero: genero
        };

        const method = (idFilme === 0 ? 'POST' : 'PUT');
        const urlRequest = (idFilme === 0 ? 'http://localhost:5000/api/filmes' : 'http://localhost:5000/api/filmes/' + idFilme);

        fetch(urlRequest, {
            method: method,
            body: JSON.stringify(form),
            headers: {
                'content-type': 'application/json',
                authorization: 'Bearer ' + localStorage.getItem('token-filmes')
            }
        })
            .then(() => {
                alert('Filme cadastrado');
                setIdFilme(0);
                setGenero('0');
                setFilme('');
                listarFilmes();
            })
            .catch(err => console.error(err));
    }
    return (
        <main>
            <Header title="Registre seus Eventos" />
            <h1>Eventos</h1>
            <div className="centro">
                <table id="tabelaFilmes">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Filme</th>
                            <th>Genero</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filmes.map((item: any) => {
                                return (
                                    <tr key={item.idFilme}>
                                        <td>{item.idFilme}</td>
                                        <td>{item.titulo}</td>
                                        <td>{item.genero.nome}</td>
                                        {/* <td>
                                            <ul onClick={() => refresh(item.idFilme)}>Atualizar</ul>
                                            <ul onClick={() => trash(item.idFilme)}>Deletar</ul>
                                        </td> */}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <form className="form" onSubmit={event => {
                    event.preventDefault();
                    salvar();
                }}>
                    <Input name="Filme" label="Cadastrar Filme" value={filme} onChange={e => setFilme(e.target.value)} />
                    <select name="genero" onChange={e => setGenero(e.target.value)} value={genero}>
                        <option value="0">Selecione um Gênero</option>
                        {
                            generos.map((item: any) => {
                                return <option value={item.idGenero}>{item.nome}</option>
                            })
                        }
                    </select>
                    <div className="btnFilmes">
                        <Button value="Salvar" />
                    </div>
                </form>

            </div>
            <Footer />
        </main>
    )
}

export default Eventos;