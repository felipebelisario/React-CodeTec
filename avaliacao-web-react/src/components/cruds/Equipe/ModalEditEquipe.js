import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap'

const ModalEditEquipe = props => {
    const [name, setName] = useState('')

    useEffect(() => {
        axios.get('/equipes/' + props.recordId).then(res => {
            setName(res.data.nome)
        })
    }, [props.recordId])

    const onChange = evt => {
        setName(evt.target.value)
    }

    return (
        <Modal style={{ color: "white" }} isOpen={props.modal} className="modal-lg" toggle={props.toggleModal}>
            <ModalHeader style={{ backgroundColor: "#2A2A2A" }} toggle={props.toggleModal}>Editar equipe</ModalHeader>
            <ModalBody style={{ backgroundColor: "#3E3E3E" }}>
<<<<<<< HEAD
                <form>
=======
                <form autoComplete="off">
>>>>>>> 9f7776f790e23ee63e1e50f07b9000fa6124a1ef
                    <div className='form-group'>
                        <input type='text' onChange={onChange} value={name} className='form-control input-color' id='name' />
                    </div>
                </form>
            </ModalBody>
            <ModalFooter style={{ backgroundColor: "#2A2A2A" }}>
                <Button color="light" onClick={() => props.save(props.recordId, name)}>Salvar</Button>{' '}
                <Button color="secondary" onClick={props.toggleModal}>Cancelar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalEditEquipe