import React, { useState } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap'

const ModalNewEquipe = props => {
    const [name, setName] = useState('')

    const onChange = evt => {
        setName(evt.target.value)
    }

    return (
        <Modal style={{ color: "white" }} isOpen={props.modal} className="modal-lg" toggle={props.toggleModal}>
            <ModalHeader style={{ backgroundColor: "#2A2A2A" }} toggle={props.toggleModal}>Adicionar equipe</ModalHeader>
            <ModalBody style={{ backgroundColor: "#3E3E3E" }}>
<<<<<<< HEAD
                <form>
=======
                <form autoComplete="off">
>>>>>>> 9f7776f790e23ee63e1e50f07b9000fa6124a1ef
                    <div className='form-group'>
                        <label for="inputNome">Nome</label>
                        <input type='text' onChange={onChange} value={name} className='form-control input-color' id='name' placeholder='Nome da equipe' />
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

export default ModalNewEquipe