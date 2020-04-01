import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const NewEquipe = () => {
    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)
    const onChange = evt => {
        setName(evt.target.value)
    }
    const save = () => {
        if(name.length > 0){
            axios.post('/equipes', {
                nome : name
            }).then(res => {
                window.alert('Adicionado com sucesso!')
                setSuccess(true)
            })
        }
    }

    if(success){
        return <Redirect to='/equipes' />
    }

    return (
        <div className='container'>
        <br />
            <div className='card text-white bg-dark'>
                <div className='card-header bg-color'>
                    Nova equipe
                </div>
                <div className='card-body'>
                    <div className='card-body card-header-color'>
                        <form>
                            <div className='form-group'>
                                <input type='text' onChange={onChange} value={name} className='form-control input-color' id='name' placeholder='Nome da equipe' />
                            </div>
                            <button type='button' onClick={save} className='btn btn-light'>Salvar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewEquipe