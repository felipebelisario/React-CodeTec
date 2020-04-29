import React, { useState, createRef, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import CurrencyInput from 'react-currency-input'

const InfoMembro = ({ match }) => {
<<<<<<< HEAD
=======
    var formatterReal = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })

>>>>>>> 9f7776f790e23ee63e1e50f07b9000fa6124a1ef
    const [data, setData] = useState([])
    const [cargo, setCargo] = useState([])
    const [cargos, setCargos] = useState({})
    const [equipe, setEquipe] = useState([])
    const [equipes, setEquipes] = useState([])
    const [success, setSuccess] = useState(false)
    const [editionMode, setEditionMode] = useState(false)
    const imagemRef = createRef()

    useEffect(() => {
        axios.get('/membros/' + match.params.id).then(res => {
            setData(res.data)
        })
    }, [match.params.id])

    useEffect(() => {
        axios.get('/cargos/' + data.cargoId).then(res => {
            setCargo(res.data)
        })
    }, [data.cargoId])

    useEffect(() => {
        axios.get('/equipes/' + data.equipeId).then(res => {
            setEquipe(res.data)
        })
    }, [data.equipeId])

    useEffect(() => {
        axios.get('/cargos/').then(res => {
            setCargos(res.data)
        })
    }, [])

    useEffect(() => {
        axios.get('/equipes/').then(res => {
            setEquipes(res.data)
        })
    }, [])

    const onChange = field => evt => {
        setData({
            ...data,
            [field]: evt.target.value
        })
    }

    const handleChange = field => (event, maskedvalue, floatvalue) => {
        setData({
            ...data,
            [field]: maskedvalue
        })
    }

    if (data.foto === undefined) {
        setData({
            ...data,
            foto: '(Não especificado)'
        })
    }

    const onError = () => {
        imagemRef.current.src = 'https://i.ibb.co/2qSJmL8/anonimo.png'
    }

    const toggle = () => {
        setEditionMode(!editionMode)
    }

    const save = () => {
        axios.put('/membros/' + match.params.id, {
            ...data
        }).then(res => {
            toggle()
        })
    }

    const deleteGeneric = id => {
        axios.delete('/membros/' + id).then(res => {
            setSuccess(true)
        })
    }

<<<<<<< HEAD
    if(success){
=======
    if (success) {
>>>>>>> 9f7776f790e23ee63e1e50f07b9000fa6124a1ef
        return <Redirect to='/membros' />
    }

    return (
        <>
            {editionMode === false &&
                <div className='container' style={{ marginBottom: 20 }}>
                    <br />
                    <div className='card text-white bg-dark'>
                        <div className='card-header bg-color'>
                            <form style={{ position: "static" }}>
                                <div style={{ marginBottom: -15 }} className="form-row">
                                    <div style={{ display: "flex", alignItems: "center" }} className="form-group col-md-2">
                                        <img style={{ height: 100, width: 120 }} ref={imagemRef}
                                            src={data.foto} onError={onError}
                                            alt={data.nome} className='img-fluid img-thumbnail' />
                                    </div>
                                    <div style={{ display: "flex", alignItems: "flex-end" }} className="form-group col-md-5">
                                        <h1>{data.nome}</h1>
                                    </div>
                                    <div style={{ position: "relative" }} className="form-group col-md-5">
                                        <button style={{ position: "absolute", right: 80 }} onClick={toggle} type='button' className='btn btn-light'>Editar</button>
<<<<<<< HEAD
                                        <button style={{ position: "absolute", right: 0 }} onClick={() => {if (window.confirm('Tem certeza que quer remover esse item?')) deleteGeneric(data.id)}} type='button' className='btn btn-secondary'>Excluir</button>
=======
                                        <button style={{ position: "absolute", right: 0 }} onClick={() => { if (window.confirm('Tem certeza que quer remover esse item?')) deleteGeneric(data.id) }} type='button' className='btn btn-secondary'>Excluir</button>
>>>>>>> 9f7776f790e23ee63e1e50f07b9000fa6124a1ef
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className='card-body'>
<<<<<<< HEAD
                            <form>
                                <div style={{ marginLeft: 20 }} className="form-group row">
                                    <div style={{ backgroundColor: "#2A2A2A", height: 40, textAlign: "center" }} className="col-sm-2 col-form-label rounded">
                                        <label for="staticEmail" >Email:</label>
                                    </div>
                                    <div style={{ marginTop: 6 }} className="col-sm-10">
                                        <p className="form-group" style={{ color: "#DDDDDD" }}>{data.email}</p>
=======
                            <form autoComplete="off">
                                <div style={{ marginTop: 10, marginLeft: 20 }} className="form-group row">
                                    <div style={{ backgroundColor: "#2A2A2A", height: 40, textAlign: "center" }} className="col-sm-2 col-form-label rounded">
                                        <label for="staticEmail" >Email:</label>
                                    </div>
                                    <div style={{ marginTop: 6 }} className="form-group col-sm-10">
                                        <p style={{ color: "#DDDDDD" }}>{data.email}</p>
>>>>>>> 9f7776f790e23ee63e1e50f07b9000fa6124a1ef
                                    </div>
                                </div>
                                <div style={{ marginLeft: 20 }} className="form-group row">
                                    <div style={{ backgroundColor: "#2A2A2A", height: 40, textAlign: "center" }} className="col-sm-2 col-form-label rounded">
                                        <label for="staticEmail" >Foto (URL):</label>
                                    </div>
                                    <div style={{ marginTop: 6 }} className="form-group col-sm-10">
<<<<<<< HEAD
                                        <p style={{ color: "#DDDDDD" }}>{data.foto}</p>
                                    </div>
                                </div>
                                <div style={{ marginTop: -15, marginLeft: 20 }} className="form-group row">
                                    <div style={{ backgroundColor: "#2A2A2A", height: 40, textAlign: "center" }} className="col-sm-2 col-form-label rounded">
                                        <label for="staticEmail" >Equipe:</label>
                                    </div>
                                    <div style={{ marginTop: 6 }} className="col-sm-10">
=======
                                        <p style={{ whiteSpace: "nowrap", overflow: "auto", color: "#DDDDDD" }}>{data.foto}</p>
                                    </div>
                                </div>
                                <div style={{ marginLeft: 20 }} className="form-group row">
                                    <div style={{ backgroundColor: "#2A2A2A", height: 40, textAlign: "center" }} className="col-sm-2 col-form-label rounded">
                                        <label for="staticEmail" >Equipe:</label>
                                    </div>
                                    <div style={{ marginTop: 6 }} className="form-group col-sm-10">
>>>>>>> 9f7776f790e23ee63e1e50f07b9000fa6124a1ef
                                        <p style={{ color: "#DDDDDD" }}>{equipe.nome}</p>
                                    </div>
                                </div>
                                <div style={{ marginLeft: 20 }} className="form-group row">
                                    <div style={{ backgroundColor: "#2A2A2A", height: 40, textAlign: "center" }} className="col-sm-2 col-form-label rounded">
                                        <label for="staticEmail" >Cargo:</label>
                                    </div>
<<<<<<< HEAD
                                    <div style={{ marginTop: 6 }} className="col-sm-10">
=======
                                    <div style={{ marginTop: 6 }} className="form-group col-sm-10">
>>>>>>> 9f7776f790e23ee63e1e50f07b9000fa6124a1ef
                                        <p style={{ color: "#DDDDDD" }}>{cargo.nome}</p>
                                    </div>
                                </div>
                                <div style={{ marginLeft: 20 }} className="form-group row">
                                    <div style={{ backgroundColor: "#2A2A2A", height: 40, textAlign: "center" }} className="col-sm-2 col-form-label rounded">
                                        <label for="staticEmail" >Salário:</label>
                                    </div>
<<<<<<< HEAD
                                    <div style={{ marginTop: 6 }} className="col-sm-10">
                                        <p style={{ color: "#DDDDDD" }}>R${data.salario}</p>
=======
                                    <div style={{ marginTop: 6 }} className="form-group col-sm-10">
                                        <p style={{ color: "#DDDDDD" }}>{formatterReal.format(data.salario)}</p>
>>>>>>> 9f7776f790e23ee63e1e50f07b9000fa6124a1ef
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }

            {editionMode === true &&
                <div className='container' style={{ marginBottom: 20 }}>
                    <br />
                    <div className='card text-white bg-dark'>
                        <div className='card-header bg-color'>
                            <form style={{ position: "static" }}>
                                <div style={{ marginBottom: -15 }} className="form-row">
                                    <div style={{ display: "flex", alignItems: "center" }} className="form-group col-md-2">
                                        <img style={{ height: 100, width: 120 }} ref={imagemRef}
                                            src={data.foto} onError={onError}
                                            alt={data.nome} className='img-fluid img-thumbnail' />
                                    </div>
                                    <div style={{ display: "flex", alignItems: "flex-end" }} className="form-group col-md-5">
                                        <input onChange={onChange('nome')} className='form-control' value={data.nome} />
                                    </div>
                                    <div style={{ position: "relative" }} className="form-group col-md-5">
<<<<<<< HEAD
                                        <button style={{ position: "absolute", right: 0 }} onClick={() => {window.location.reload()}} type='button' className='btn btn-secondary'>Cancelar</button>
=======
                                        <button style={{ position: "absolute", right: 0 }} onClick={() => { window.location.reload() }} type='button' className='btn btn-secondary'>Cancelar</button>
>>>>>>> 9f7776f790e23ee63e1e50f07b9000fa6124a1ef
                                        <button style={{ position: "absolute", right: 100 }} onClick={save} type='button' className='btn btn-light'>Salvar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className='card-body'>
<<<<<<< HEAD
                            <form>
=======
                            <form autoComplete="off">
>>>>>>> 9f7776f790e23ee63e1e50f07b9000fa6124a1ef
                                <div style={{ marginLeft: 20 }} className="form-group row">
                                    <div style={{ backgroundColor: "#2A2A2A", height: 40, textAlign: "center" }} className="col-sm-2 col-form-label rounded">
                                        <label for="staticEmail" >Email:</label>
                                    </div>
                                    <div style={{ marginTop: 6 }} className="col-sm-10">
                                        <input onChange={onChange('email')} className='form-control' value={data.email} />
                                    </div>
                                </div>
                                <div style={{ marginLeft: 20 }} className="form-group row">
                                    <div style={{ backgroundColor: "#2A2A2A", height: 40, textAlign: "center" }} className="col-sm-2 col-form-label rounded">
                                        <label for="staticEmail" >Foto (URL):</label>
                                    </div>
                                    <div style={{ marginTop: 6 }} className="form-group col-sm-10">
                                        <input onChange={onChange('foto')} className='form-control' value={data.foto} />
                                    </div>
                                </div>
                                <div style={{ marginTop: -15, marginLeft: 20 }} className="form-group row">
                                    <div style={{ backgroundColor: "#2A2A2A", height: 40, textAlign: "center" }} className="col-sm-2 col-form-label rounded">
                                        <label for="staticEmail" >Equipe:</label>
                                    </div>
                                    <div style={{ marginTop: 6 }} className="col-sm-3">
                                        <select className='custom-select mr-sm-2 input-color' onChange={onChange('equipeId')} id='inputCargo'>
                                            <option selected>{equipe.nome}</option>
                                            {equipes.map(eqp => {
                                                if (eqp.id !== equipe.id) {
                                                    return <option key={eqp.id} value={eqp.id} select={eqp.id === data.equipeId}>{eqp.nome}</option>
                                                }
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div style={{ marginLeft: 20 }} className="form-group row">
                                    <div style={{ backgroundColor: "#2A2A2A", height: 40, textAlign: "center" }} className="col-sm-2 col-form-label rounded">
                                        <label for="staticEmail" >Cargo:</label>
                                    </div>
                                    <div style={{ marginTop: 6 }} className="col-sm-3">
                                        <select className='custom-select mr-sm-2 input-color' onChange={onChange('cargoId')} id='inputCargo'>
                                            <option selected>{cargo.nome}</option>
                                            {cargos.map(crg => {
                                                if (crg.id !== cargo.id) {
                                                    return <option key={crg.id} value={crg.id} select={crg.id === data.cargoId}>{crg.nome}</option>
                                                }
                                            })}
                                        </select>                                    </div>
                                </div>
                                <div style={{ marginLeft: 20 }} className="form-group row">
                                    <div style={{ backgroundColor: "#2A2A2A", height: 40, textAlign: "center" }} className="col-sm-2 col-form-label rounded">
                                        <label for="staticEmail" >Salário:</label>
                                    </div>
                                    <div style={{ marginTop: 6 }} className="col-sm-3">
                                        <CurrencyInput prefix='R$' onChange={handleChange('salario')} value={data.salario} className='form-control input-color' id='inputSalario' placeholder='Salário' />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default InfoMembro