import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

const EditEquipe = ({ match }) => {
    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        axios.get('/equipes/' + match.params.id).then(res => {
            setName(res.data.nome)
        })
    }, [match.params.id])

    const onChange = evt => {
        setName(evt.target.value)
    }
    const save = () => {
        if(name.length > 0){
            axios.put('/equipes/' + match.params.id, {
                nome : name
            }).then(res => {
                setSuccess(true)
            })
        }
    }

    if(success){
        return <Redirect to={'/equipes'} />
    }

    return (
        <div className='container'>
        <br />
            <div className='card text-white bg-dark'>
                <div className='card-header bg-color'>
                    Editar equipe
                </div>
                <div className='card-body'>
                    <div className='card-body card-header-color'>
                        <form>
                            <div className='form-group'>
                                <input type='text' onChange={onChange} value={name} className='form-control input-color' id='name' />
                            </div>
                            <button type='button' onClick={save} className='btn btn-light'>Salvar</button>
                            <Link to={'/equipes'} style={{ position: "absolute", marginLeft: 10 }} type='button' className='btn btn-secondary'>Cancelar</Link>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditEquipe