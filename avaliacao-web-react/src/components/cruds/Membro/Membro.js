import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import PesquisaBar from '../../../reused-components/PesquisaBar'
import PaginationBar from '../../../reused-components/PaginationBar'
import ModalNewMembro from './ModalNewMembro'
import OrderButton from '../../../reused-components/OrderButton'

const Membro = () => {
    var pageSize = 5

    const [data, setData] = useState([])
    const [tempData, setTempData] = useState([])
    const [cargos, setCargos] = useState([])
    const [equipes, setEquipes] = useState([])
    const [modal, setModal] = useState(false)
    const [tableClick, setTableClick] = useState(null)
    const [currentPage, setCurrentPage] = useState(0)
    const [numPages, setNumPages] = useState(0)
    const [disableButtons, setDisableButtons] = useState(false)

    const save = form => {
        if (form.nome !== undefined) {
            axios.post('/membros', {
                ...form,
                nome: form.nome[0].toUpperCase() + form.nome.slice(1)
            }).then(res => {
                setModal(!modal)
                window.location.reload()
            })
        } else {
            window.alert('Preencha pelo menos o campo "Nome"')
        }
    }

    const toggleModal = () => setModal(!modal);

    const toggleTable = id => {
        setTableClick(id)
    }

    useEffect(() => {
        axios.get('/membros').then(res => {
            setData(res.data)
            setTempData(res.data)
            setNumPages(Math.ceil(res.data.length / pageSize))
        })
        axios.get('/cargos').then(res => {
            setCargos(res.data)
        })
        axios.get('/equipes').then(res => {
            setEquipes(res.data)
        })
    }, [pageSize])

    const render_line = record => {
        return (
            <tr onClick={() => toggleTable(record.id)} key={record.id}>
                <th scope='row'>{record.id}</th>
                <td>{record.nome}</td>
                <td>{record.email}</td>
                <td>
                    <Link to={'/membros/' + record.id} className='btn btn-outline-light'>Info</Link>
                </td>
            </tr>
        )
    }

    if (tableClick != null) {
        return <Redirect to={'/membros/' + tableClick} />
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

    const setDisabled = isDisabled => {
        setDisableButtons(isDisabled)
    }

    return (
        <div>
            <div className='container'>
                <br />
                <PesquisaBar data={data} setNewTempData={setNewTempData} setTempNumPages={setTempNumPages} keyWordsToFind={['id', 'nome', 'email']} />
                <div className='card border-secondary text-white bg-dark'>
                    <div className='card-header text-white bg-color'>
                        Membros
                    </div>
                    <div className='card-body' style={{ marginTop: 10, height: 410 }}>
                        <table className='table table-hover table-dark'>
                            <thead>
                                <tr>
                                    <th scope='ID'>
                                        Id <OrderButton setNewTempData={setNewTempData} property='id' tempData={tempData} 
                                                ordemPadraoPor='id' disabled={disableButtons} setDisabled={setDisabled} />
                                    </th>
                                    <th scope='Nome'>
                                        Nome <OrderButton setNewTempData={setNewTempData} property='nome' tempData={tempData} 
                                                ordemPadraoPor='id' disabled={disableButtons} setDisabled={setDisabled}/>
                                    </th>
                                    <th scope='Email'>
                                        Email <OrderButton setNewTempData={setNewTempData} property='email' tempData={tempData} 
                                                ordemPadraoPor='id' disabled={disableButtons} setDisabled={setDisabled}/>
                                    </th>
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
                    <button type='button' onClick={toggleModal} className='btn font-weight-bold btn-light'>Novo membro</button>
                </div>
                <br />
                <PaginationBar numPages={numPages} onCurrentPageChange={onCurrentPageChange} />
                <br />
            </div>

            <ModalNewMembro toggleModal={toggleModal} modal={modal} save={save} cargos={cargos} equipes={equipes} />

        </div>
    )
}

export default Membro