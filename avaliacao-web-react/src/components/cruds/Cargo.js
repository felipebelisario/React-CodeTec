import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Cargo = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('/cargo').then(res => {
            setData(res.data)
        })
    }, [])


    const render_line = record => {
        return (
            <tr key={record.id}>
                <th scope="row">{record.id}</th>
                <td>{record.nome}</td>
                <td>
                    <button className='btn btn-outline-light'>Editar</button>
                    <button id='bt-f' className='btn btn-outline-light'>Excluir</button>
                </td>
            </tr>
        )
    }


    return (
        <div className='container'>
            <br />
            <h1>Cargos</h1>
            <table className='table table-dark'>
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
            <div id='bt-a'>
                <button tag={Link} to='/cargos/new' type='button' class='btn btn-light'>Adicionar Cargo</button>
            </div>
        </div>

    )
}

export default Cargo