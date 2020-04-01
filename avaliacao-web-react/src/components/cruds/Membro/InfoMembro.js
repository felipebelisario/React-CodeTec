import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const InfoMembro = ({ match }) => {
    const [data, setData] = useState([])
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        axios.get('/membros/' + match.params.id).then(res => {
            setData(res.data)
        })
    }, [match.params.id])

    const onChange = evt => {
        setData(evt.target.value)
    }
    const save = () => {
        axios.put('/membros/' + match.params.id, {}).then(res => {
            setSuccess(true)
        })
    }

    if(success){
        return <Redirect to={'/membros'} />
    }

    return (
        <div className='container'>
        <br />
            <div className='card text-white bg-dark'>
            <div className='card-header bg-color'>
                    <form>
                        <div className="form-row">
                            <div style={{display: "flex", alignItems: "center"}} className="form-group col-md-2">
                                <img style={{height: 100, width: 100}} src={data.foto ? data.foto : 'https://i.ibb.co/2qSJmL8/anonimo.png'} alt={data.nome} className='img-fluid img-thumbnail' />
                            </div>
                            <div style={{display: "flex", alignItems: "flex-end", marginLeft: -60}} className="form-group col-md-6">
                                <h1>{data.nome}</h1>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='card-body'>
                    <form>
                        <div class="form-group row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                            <div class="col-sm-10">
                            <input type="text" readonly class="form-control" id="staticEmail" value="email@example.com" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                            <div class="col-sm-10">
                            <input type="password" class="form-control" id="inputPassword" />
                            </div>
                        </div>
                    </form>
                    
                    
                    {/* <div className='card-body card-header-color'>
                    <label style={{float: "left", marginTop: 5}}>Email: </label>
                    <input style={{width: 400, marginLeft: 50}} className='form-control' type="text" value={data.email} readonly/>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default InfoMembro