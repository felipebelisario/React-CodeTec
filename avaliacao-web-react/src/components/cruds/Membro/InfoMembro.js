import React, { useState, createRef, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const InfoMembro = ({ match }) => {
    const [data, setData] = useState([])
    const [img, setImg] = useState('')
    const [success, setSuccess] = useState(false)
    const imagemRef = createRef()

    useEffect(() => {
        axios.get('/membros/' + match.params.id).then(res => {
            setData(res.data)
        })
    }, [match.params.id])

    if(data.foto == undefined){
        setData({
            ...data,
            foto: 'https://i.ibb.co/2qSJmL8/anonimo.png'
        })
    }

    const onError = () => {
        imagemRef.current.src = 'https://i.ibb.co/2qSJmL8/anonimo.png'
    }
    const save = () => {
        axios.put('/membros/' + match.params.id, {}).then(res => {
            setSuccess(true)
        })
    }

    if (success) {
        return <Redirect to={'/membros'} />
    }

    return (
        <div className='container'>
            <br />
            <div className='card text-white bg-dark'>
                <div className='card-header bg-color'>
                    <form>
                        <div style={{ marginBottom: -15 }} className="form-row">
                            <div style={{ display: "flex", alignItems: "center" }} className="form-group col-md-2">
                                <img style={{ height: 100, width: 100 }} ref={imagemRef}
                                    src={data.foto} onError={onError}
                                    alt={data.nome} className='img-fluid img-thumbnail' />
                            </div>
                            <div style={{ display: "flex", alignItems: "flex-end", marginLeft: -60 }} className="form-group col-md-6">
                                <h1>{data.nome}</h1>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='card-body'>
                    <form>
                        <div className="form-group row">
                            <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input type="text" readonly className="form-control" id="staticEmail" value={data.email} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="inputPassword" className="col-sm-2 col-form-label">Password</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="inputPassword" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default InfoMembro