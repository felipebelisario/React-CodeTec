import React, { useState } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap'

const ModalNewCargo = props => {
    const [name, setName] = useState('')

    const onChange = evt => {
        setName(evt.target.value)
    }

    return (
        <Modal style={{ color: "white" }} isOpen={props.modal} className="modal-lg" toggle={props.toggleModal}>
            <ModalHeader style={{ backgroundColor: "#2A2A2A" }} toggle={props.toggleModal}>Adicionar cargo</ModalHeader>
            <ModalBody style={{ backgroundColor: "#3E3E3E" }}>
                <form>
                    <div className='form-group'>
                        <label for="inputNome">Nome</label>
                        <input type='text' onChange={onChange} value={name} className='form-control input-color' id='name' placeholder='Nome do cargo' />
                    </div>
                </form>
            </ModalBody>
            <ModalFooter style={{ backgroundColor: "#2A2A2A" }}>
                <Button color="light" onClick={() => props.save(name)}>Salvar</Button>{' '}
                <Button color="secondary" onClick={props.toggleModal}>Cancelar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalNewCargo