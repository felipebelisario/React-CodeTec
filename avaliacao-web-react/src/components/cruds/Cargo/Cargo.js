import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ModalEditCargo from './ModalEditCargo'
import ModalNewCargo from './ModalNewCargo'
import PaginationBar from '../../../reused-components/PaginationBar'
import PesquisaBar from '../../../reused-components/PesquisaBar'
import OrderButton from '../../../reused-components/OrderButton'

const Equipe = () => {
    var pageSize = 5

    const [data, setData] = useState([])
    const [tempId, setTempId] = useState()
    const [tempData, setTempData] = useState([])
    const [modalNew, setModalNew] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [numPages, setNumPages] = useState(0)
    const [disableButtons, setDisableButtons] = useState(false)

    useEffect(() => {
        axios.get('/cargos').then(res => {
            setData(res.data)
            setTempData(res.data)
            setNumPages(Math.ceil(res.data.length / pageSize))
        })
    }, [pageSize])

    const deleteGeneric = id => {
        axios.delete('/cargos/' + id).then(res => {
            const filtrado = data.filter(item => item.id !== id)
            setData(filtrado)
            window.location.reload()
        })
    }


    const saveNew = name => {
        if (name !== '') {
            if (name.length > 0) {
                axios.post('/cargos', {
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

    const saveEdit = (id, name) => {
        if (name.length > 0) {
            axios.put('/cargos/' + id, {
                nome: name
            }).then(res => {
                setModalEdit(!modalEdit)
                window.location.reload()
            })
        }
    }

    const toggleModalNew = () => setModalNew(!modalNew)

    const toggleModalEdit = id => {
        setTempId(id)
        setModalEdit(!modalEdit)
    }

    const render_line = record => {
        return (
            <tr key={record.id}>
                <th scope='row'>{record.id}</th>
                <td>{record.nome}</td>
                <td>
                    <button onClick={() => toggleModalEdit(record.id)} className='btn btn-outline-light'>Editar</button>
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

    const setDisabled = isDisabled => {
        setDisableButtons(isDisabled)
    }

    return (
        <div style={{marginLeft: 100, marginRight: 100}}>
            <br />
            <PesquisaBar data={data} setNewTempData={setNewTempData} setTempNumPages={setTempNumPages}/>
            <div className='card border-secondary text-white bg-dark'>
                <div className='card-header text-white bg-color'>
                    Cargos
                </div>
                <div className='card-body' style={{marginTop: 10, height: 410 }}>
                    <table className='table table-hover table-dark'>
                        <thead>
                            <tr>
                                <th scope='ID'>
                                    Id <OrderButton setNewTempData={setNewTempData} property='id' tempData={tempData} 
                                            ordemPadraoPor='id' disabled={disableButtons} setDisabled={setDisabled} />
                                </th>
                                <th scope='Nome'>
                                    Nome <OrderButton setNewTempData={setNewTempData} property='nome' tempData={tempData} 
                                            ordemPadraoPor='id' disabled={disableButtons} setDisabled={setDisabled} />
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
                <button type='button' onClick={toggleModalNew} className='btn font-weight-bold btn-light'>Novo cargo</button>
            </div>
            <br />
            <PaginationBar numPages={numPages} onCurrentPageChange={onCurrentPageChange} currentPage={currentPage}/>
            <br />

            <ModalNewCargo toggleModal={toggleModalNew} modal={modalNew} save={saveNew} />
            <ModalEditCargo toggleModal={toggleModalEdit} modal={modalEdit} save={saveEdit} recordId={tempId} />
        </div>

    )
}

export default Equipe