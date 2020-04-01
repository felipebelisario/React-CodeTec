import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Equipe = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('/equipes').then(res => {
            setData(res.data)
        })
    }, [])
    
    const deleteGeneric = id => {
        axios.delete('/equipes/' + id).then(res => {
            const filtrado = data.filter(item => item.id !== id)
            setData(filtrado)
        })
    }

    const render_line = record => {
        return (
            <tr key={record.id}>
                <th scope="row">{record.id}</th>
                <td>{record.nome}</td>
                <td>
                    <Link to={'/equipes/' + record.id} className='btn btn-outline-light'>Editar</Link>
                    <button id='bt-f' onClick={() => {if (window.confirm('Tem certeza que quer remover esse item?')) deleteGeneric(record.id)}} className='btn btn-outline-light'>Excluir</button>
                </td>
            </tr>
        )
    }


    return (
        <div className='container'>
            <br />
            <div className="card border-secondary text-white bg-dark">
                <div className="card-header text-white bg-color">
                    Equipes
                </div>
                <table className='table table-hover table-dark'>
                    <thead>
                        <tr>
                            <th scope='ID'>Id</th>
                            <th scope='Nome'>Nome</th>
                            <th scope='Ações'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(render_line)}
                    </tbody>
                </table>
            </div>
            <br />
            <div id='bt-a'>
                <Link to={'/equipes/new'} type='button' className='btn btn-light'>Nova equipe</Link>
            </div>
            <br />
        </div>

    )
}

export default Equipe