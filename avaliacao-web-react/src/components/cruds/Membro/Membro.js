import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'

const Membro = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('/membros').then(res => {
            setData(res.data)
        })
    }, [])
    
    const deleteGeneric = id => {
        axios.delete('/membros/' + id).then(res => {
            const filtrado = data.filter(item => item.id !== id)
            setData(filtrado)
        })
    }

    const render_line = record => {
        return (
            <tr onClick={() => {return <Redirect to={'/membros/' + record.id} />}} key={record.id}>
                <th scope="row">{record.id}</th>
                <td>{record.nome}</td>
                <td>{record.email}</td>
                <td>
                    <Link to={'/membros/' + record.id} className='btn btn-outline-light'>Info</Link>
                </td>
            </tr>
        )
    }


    return (
        <div className='container'>
            <br />
            <div className="card border-secondary text-white bg-dark">
                <div className="card-header text-white bg-color">
                    Membros
                </div>
                <table className='table table-hover table-dark'>
                    <thead>
                        <tr>
                            <th scope='ID'>Id</th>
                            <th scope='Nome'>Nome</th>
                            <th scope='Email'>Email</th>
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
                <Link to={'/membros/new'} type='button' className='btn btn-light'>Novo membro</Link>
            </div>
            <br />
        </div>

    )
}

export default Membro