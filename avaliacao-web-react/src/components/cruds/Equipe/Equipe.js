import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ModalNewEquipe from './ModalNewEquipe'
import PaginationBar from '../../PaginationBar'
import PesquisaBar from '../../PesquisaBar'

const Equipe = () => {
    var pageSize = 5

    const [data, setData] = useState([])
    const [tempData, setTempData] = useState([])
    const [search, setSearch] = useState('')
    const [modalNew, setModalNew] = useState(false);
    const [tableClick, setTableClick] = useState(null)
    const [currentPage, setCurrentPage] = useState(0);
    const [numPages, setNumPages] = useState(0)

    useEffect(() => {
        axios.get('/equipes').then(res => {
            setData(res.data)
            setTempData(res.data)
            setNumPages(Math.ceil(res.data.length / pageSize))
        })
    }, [])

    const deleteGeneric = id => {
        axios.delete('/equipes/' + id).then(res => {
            const filtrado = data.filter(item => item.id !== id)
            setData(filtrado)
        })
    }


    const save = name => {
        if (name !== '') {
            if (name.length > 0) {
                axios.post('/equipes', {
                    nome: name
                }).then(res => {
                    setModalNew(!modalNew)
                    window.location.reload()
                })
            }
        } else {
            window.alert('Preencha o campo "Nome"')
        }
    }

    const toggleModalNew = () => setModalNew(!modalNew);

    const render_line = record => {
        return (
            <tr key={record.id}>
                <th scope="row">{record.id}</th>
                <td>{record.nome}</td>
                <td>
                    <Link to={'/equipes/' + record.id} className='btn btn-outline-light'>Editar</Link>
                    <button id='bt-f' onClick={() => { if (window.confirm('Tem certeza que quer remover esse item?')) deleteGeneric(record.id) }} className='btn btn-outline-light'>Excluir</button>
                </td>
            </tr>
        )
    }

    const onCurrentPageChange = (newCurrentPage) => {
        setCurrentPage(newCurrentPage)
    }

    const setNewTempData = newTempData => {
        setTempData(newTempData)
    }

    const setTempNumPages = tempNumPages => {
        setNumPages(Math.ceil(tempNumPages / pageSize))
    }

    return (
        <div className='container'>
            <br />
            <PesquisaBar data={data} setNewTempData={setNewTempData} setTempNumPages={setTempNumPages}/>
            <div className="card border-secondary text-white bg-dark">
                <div className="card-header text-white bg-color">
                    Equipes
                </div>
                <div className='card-body' style={{ height: 411, overflow: 'auto' }}>
                    <table className='table table-hover table-dark'>
                        <thead>
                            <tr>
                                <th scope='ID'>Id</th>
                                <th scope='Nome'>Nome</th>
                                <th scope='Ações'>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tempData
                                    .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                                    .map(render_line)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <br />
            <div className='d-flex justify-content-end' id='bt-a'>
                <button type='button' onClick={toggleModalNew} className='btn font-weight-bold btn-light'>Nova equipe</button>
            </div>
            <br />
            <PaginationBar numPages={numPages} onCurrentPageChange={onCurrentPageChange} />
            <br />

            <ModalNewEquipe toggleModal={toggleModalNew} modal={modalNew} save={save} />
        </div>

    )
}

export default Equipe