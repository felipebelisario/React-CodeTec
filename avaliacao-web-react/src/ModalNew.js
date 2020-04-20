import React, { useState } from 'react'

const ModalNew = props => {
    const handleChange = field => (event, maskedvalue, floatvalue) => {
        setForm({
            ...form,
            [field]: maskedvalue
        })
    }

    return (
        <Modal style={{ color: "white" }} isOpen={modal} className="modal-lg" toggle={toggleModal}>
            <ModalHeader style={{ backgroundColor: "#2A2A2A" }} toggle={toggleModal}>Adicionar membro</ModalHeader>
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
                <Button color="secondary" onClick={toggleModal}>Cancelar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalNew