import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import CurrencyInput from 'react-currency-input'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Membro = () => {
    const [data, setData] = useState([])
    const [tempData, setTempData] = useState([])
    const [form, setForm] = useState({})
    const [cargos, setCargos] = useState([])
    const [equipes, setEquipes] = useState([])
    const [search, setSearch] = useState('')
    const [modal, setModal] = useState(false);
    const [tableClick, setTableClick] = useState(null)

    const onChange = field => evt => {
        setForm({
            ...form,
            [field]: evt.target.value
        })
    }

    const save = () => {
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

    const toggle = () => setModal(!modal);

    const toggleTable = id => {
        setTableClick(id)
    }

    const handleChange = field => (event, maskedvalue, floatvalue) => {
        setForm({
            ...form,
            [field]: maskedvalue
        })
    }

    useEffect(() => {
        axios.get('/membros').then(res => {
            setData(res.data)
            setTempData(res.data)
        })
        axios.get('/cargos').then(res => {
            setCargos(res.data)
        })
        axios.get('/equipes').then(res => {
            setEquipes(res.data)
        })
    }, [])

    // const getSortData = () => {
    //     axios.get('/membros').then(res => {
    //         setData(res.data)
    //         setTempData(res.data)
    //     })
    // }

    const searchChange = evt => {
        setSearch(evt.target.value)
    }

    const setFiltro = () => {
        const filtrado = data.filter(item => (item.nome).toUpperCase().indexOf(search.toUpperCase()) !== -1)
        setTempData(filtrado)
    }

    const render_line = record => {
        return (
            <tr onClick={() => toggleTable(record.id)} key={record.id}>
                <th scope="row">{record.id}</th>
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

    const keyPressed = evt => {
        if (evt.keyCode === 13) {
            setFiltro()
        }
    }


    return (
        <div>
            <div className='container'>
                <br />
                <form onSubmit={e => { e.preventDefault() }}>
                    <div class="form-row">
                        <div className='form-group col-md-10'>
                            <input onKeyDown={keyPressed} className="form-control" onChange={searchChange} type="text" placeholder="Procurar por nome" value={search} />
                        </div>
                        <div className='form-group col-md-2'>
                            <button onClick={setFiltro} className="btn btn-dark form-control" type="button">Procurar</button>
                        </div>
                    </div>
                </form>
                <div className="card border-secondary text-white bg-dark">
                    <div className="card-header text-white bg-color">
                        Membros
                    </div>
                    <table className='table table-hover table-dark'>
                        <thead>
                            <tr>
                                <th scope='ID'>Id</th>
                                <th scope='Nome'>
                                    <button onClick={() => console.log(1)} style={{ width: 20, height: 20, marginRight: 5 }} className='btn btn-light btn-sm'>
                                        <img style={{ width: 15, height: 15, display: "flex", marginLeft: -5.5 }} src="https://image.flaticon.com/icons/svg/107/107799.svg"></img>
                                    </button> 
                                
                                    Nome
                                </th>
                                <th scope='Email'>Email</th>
                                <th scope='Ações'>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tempData.map(render_line)}
                        </tbody>
                    </table>
                </div>
                <br />
                <div id='bt-a'>
                    <button type='button' onClick={toggle} className='btn btn-light'>Novo membro</button>
                </div>
                <br />
                <nav className='bg-black' aria-label="...">
                    <ul class="pagination justify-content-center">
                        <li class="page-item disabled">
                            <span class="page-link">Previous</span>
                        </li>
                        <li class="page-item active"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                        <a class="page-link" href="#">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>

            <Modal style={{ color: "white" }} isOpen={modal} className="modal-lg" toggle={toggle}>
                <ModalHeader style={{ backgroundColor: "#2A2A2A" }} toggle={toggle}>Adicionar membro</ModalHeader>
                <ModalBody style={{ backgroundColor: "#3E3E3E" }}>
                    <form>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="inputNome">Nome</label>
                                <input type="text" onChange={onChange('nome')} value={form.nome} class="form-control input-color" id="inputNome" />
                            </div>
                            <div class="form-group col-md-6">
                                <label for="inputEmail">Email</label>
                                <input type="email" onChange={onChange('email')} value={form.email} class="form-control input-color" id="inputEmail" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputFoto">Foto (URL)</label>
                            <input type="img" onChange={onChange('foto')} value={form.foto} class="form-control input-color" id="inputFoto" />
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label for="inputSalario">Salário</label>
                                <CurrencyInput prefix='R$' onChange={handleChange('salario')} value={form.salario} className='form-control input-color' id='inputSalario' placeholder='Salário' />
                            </div>
                            <div class="form-group col-md-4">
                                <label for="inputCargo">Cargo</label>
                                <select className='custom-select mr-sm-2 input-color' onChange={onChange('cargoId')} id='inputCargo'>
                                    <option selected>Selecione...</option>
                                    {cargos.map(cargo => <option key={cargo.id} value={cargo.id} select={cargo.id === form.cargoId}>{cargo.nome}</option>)}
                                </select>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="inputEquipe">Equipe</label>
                                <select className='custom-select mr-sm-2 input-color' onChange={onChange('equipeId')} id='inputEquipe'>
                                    <option selected>Selecione...</option>
                                    {equipes.map(equipe => <option key={equipe.id} value={equipe.id} select={equipe.id === form.equipeId}>{equipe.nome}</option>)}
                                </select>
                            </div>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter style={{ backgroundColor: "#2A2A2A" }}>
                    <Button color="light" onClick={save}>Salvar</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default Membro