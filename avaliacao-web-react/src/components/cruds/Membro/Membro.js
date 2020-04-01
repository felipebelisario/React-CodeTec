import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import CurrencyInput from 'react-currency-input'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Membro = () => {
    const [data, setData] = useState([])
    const [form, setForm] = useState({})
    const [img, setImg] = useState('')
    const [cargos, setCargos] = useState([])
    const [equipes, setEquipes] = useState([])
    const [modal, setModal] = useState(false);

    const onChange = field => evt => {
        setForm({
            ...form,
            [field]: evt.target.value
        })
    }

    const save = () => {
        if (form.nome != undefined) {
            axios.post('/membros', form).then(res => {
                setModal(!modal)
                window.location.reload()
            })
        } else {
            window.alert('Preencha pelo menos o campo "Nome"')
        }
    }

    const toggle = () => setModal(!modal);

    const handleChange = field => (event, maskedvalue, floatvalue) => {
        setForm({
            ...form,
            [field]: maskedvalue
        })
    }

    useEffect(() => {
        axios.get('/membros').then(res => {
            setData(res.data)
        })
        axios.get('/cargos').then(res => {
            setCargos(res.data)
        })
        axios.get('/equipes').then(res => {
            setEquipes(res.data)
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
            <tr onClick={() => { return <Redirect to={'/membros/' + record.id} /> }} key={record.id}>
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
        <div>
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
                    <button type='button' onClick={toggle} className='btn btn-light'>Novo membro</button>
                </div>
                <br />
            </div>

            <Modal style={{color: "white"}} isOpen={modal} className="modal-lg" toggle={toggle}>
                <ModalHeader style={{backgroundColor: "#2A2A2A"}} toggle={toggle}>Adicionar membro</ModalHeader>
                <ModalBody style={{backgroundColor: "#3E3E3E"}}>
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
                                    {cargos.map(cargo => <option key={cargo.id} value={cargo.id} select={cargo.id === form.cargo}>{cargo.nome}</option>)}
                                </select>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="inputEquipe">Equipe</label>
                                <select className='custom-select mr-sm-2 input-color' onChange={onChange('equipeId')} id='inputEquipe'>
                                    <option selected>Selecione...</option>
                                    {equipes.map(equipe => <option key={equipe.id} value={equipe.id} select={equipe.id === form.equipe}>{equipe.nome}</option>)}
                                </select>
                            </div>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter style={{backgroundColor: "#2A2A2A"}}>
                    <Button color="light" onClick={save}>Salvar</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default Membro