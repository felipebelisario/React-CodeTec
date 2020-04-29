import React, { useState } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap'
import CurrencyInput from 'react-currency-input'

const ModalNewMembro = props => {
    const [form, setForm] = useState({})

    const handleChange = field => (event, maskedvalue, floatvalue) => {
        setForm({
            ...form,
            [field]: maskedvalue
        })
    }

    const onChange = field => evt => {
        setForm({
            ...form,
            [field]: evt.target.value
        })
    }

    return (
        <Modal style={{ color: "white" }} isOpen={props.modal} className="modal-lg" toggle={props.toggleModal}>
            <ModalHeader style={{ backgroundColor: "#2A2A2A" }} toggle={props.toggleModal}>Adicionar membro</ModalHeader>
            <ModalBody style={{ backgroundColor: "#3E3E3E" }}>
<<<<<<< HEAD
                <form>
=======
                <form autoComplete="off">
>>>>>>> 9f7776f790e23ee63e1e50f07b9000fa6124a1ef
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="inputNome">Nome</label>
                            <input type="text" onChange={onChange('nome')} value={form.nome} className="form-control input-color" id="inputNome" />
                        </div>
                        <div className="form-group col-md-6">
                            <label for="inputEmail">Email</label>
                            <input type="email" onChange={onChange('email')} value={form.email} className="form-control input-color" id="inputEmail" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="inputFoto">Foto (URL)</label>
                        <input type="img" onChange={onChange('foto')} value={form.foto} className="form-control input-color" id="inputFoto" />
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label for="inputSalario">Salário</label>
                            <CurrencyInput prefix='R$' onChange={handleChange('salario')} value={form.salario} className='form-control input-color' id='inputSalario' placeholder='Salário' />
                        </div>
                        <div className="form-group col-md-4">
                            <label for="inputCargo">Cargo</label>
                            <select className='custom-select mr-sm-2 input-color' onChange={onChange('cargoId')} id='inputCargo'>
                                <option selected>Selecione...</option>
                                {props.cargos.map(cargo => <option key={cargo.id} value={cargo.id} select={cargo.id === form.cargoId}>{cargo.nome}</option>)}
                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <label for="inputEquipe">Equipe</label>
                            <select className='custom-select mr-sm-2 input-color' onChange={onChange('equipeId')} id='inputEquipe'>
                                <option selected>Selecione...</option>
                                {props.equipes.map(equipe => <option key={equipe.id} value={equipe.id} select={equipe.id === form.equipeId}>{equipe.nome}</option>)}
                            </select>
                        </div>
                    </div>
                </form>
            </ModalBody>
            <ModalFooter style={{ backgroundColor: "#2A2A2A" }}>
                <Button color="light" onClick={() => props.save(form)}>Salvar</Button>{' '}
                <Button color="secondary" onClick={props.toggleModal}>Cancelar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalNewMembro