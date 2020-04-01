import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import CurrencyInput from 'react-currency-input'

const NewMembro = () => {
    const [form, setForm] = useState({})
    const [cargos, setCargos] = useState([])
    const [equipes, setEquipes] = useState([])
    const [success, setSuccess] = useState(false)
    const onChange = field => evt => {
        setForm({
            ...form,
            [field]: evt.target.value
        })
    }

    const save = () => {
        image(form.foto, {
        success : function () {
            if (form.nome != undefined) {
                axios.post('/membros', form).then(res => {
                    window.alert('Adicionado com sucesso!')
                    setSuccess(true)
                })
            }
        },
        failure : function () {window.alert('URL inválida!')}
        });    
    }

    const handleChange = field => (event, maskedvalue, floatvalue) => {
        setForm({
            ...form,
            [field]: maskedvalue
        })
    }

    const $ = (id) => {
        return !id || id.nodeType === 1 ? id : document.getElementById(id);
    }
    const isType = (o,t) => {    return (typeof o).indexOf(t.charAt(0).toLowerCase()) === 0;}
    
    // Here's the meat and potatoes
    const image = (src,cfg) => {    var img, prop, target;
        cfg = cfg || (isType(src,'o') ? src : {});
    
        img = $(src);
        if (img) {
            src = cfg.src || img.src;
        } else {
            img = document.createElement('img');
            src = src || cfg.src;
        }
    
        if (!src) {
            return null;
        }
    
        prop = isType(img.naturalWidth,'u') ? 'width' : 'naturalWidth';
        img.alt = cfg.alt || img.alt;
    
        // Add the image and insert if requested (must be on DOM to load or
        // pull from cache)
        img.src = src;
    
        target = $(cfg.target);
        if (target) {
            target.insertBefore(img, $(cfg.insertBefore) || null);
        }
    
        // Loaded?
        if (img.complete) {
            if (img[prop]) {
                if (isType(cfg.success,'f')) {
                    cfg.success.call(img);
                }
            } else {
                if (isType(cfg.failure,'f')) {
                    cfg.failure.call(img);
                }
            }
        } else {
            if (isType(cfg.success,'f')) {
                img.onload = cfg.success;
            }
            if (isType(cfg.failure,'f')) {
                img.onerror = cfg.failure;
            }
        }
    
        return img;
    }

    useEffect(() => {
        axios.get('/cargos').then(res => {
            setCargos(res.data)
        })
        axios.get('/equipes').then(res => {
            setEquipes(res.data)
        })
    }, [])

    if (success) {
        return <Redirect to='/membros' />
    }

    return (
        <div className='container'>
            <br />
            <div className='card text-white bg-dark'>
                <div className='card-header bg-color'>
                    Novo membro
                </div>
                <div className='card-body' style={{ marginBottom: -20 }}>
                    <div className='card-body card-header-color'>
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
                                        {cargos.map(cargo => <option key={cargo.id} value={cargo.id} select={cargo.id === form.cargo}>{cargo.nome}</option>)}
                                    </select>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="inputEquipe">Equipe</label>
                                    <select className='custom-select mr-sm-2 input-color' onChange={onChange('equipeId')} id='inputEquipe'>
                                        <option selected>Selecione...</option>
                                        {equipes.map(equipe => <option key={equipe.id} value={equipe.id} select={equipe.id === form.equipe}>{equipe.nome}</option>)}
                                    </select>
                                </div>
                            </div>
                            <br />
                            <button type='button' onClick={save} className='btn btn-light'>Salvar</button>
                        </form>
                    </div>
                </div>
            </div>





                {/* <form>
                            <div className='form-group'>
                                <label>Nome:</label>
                                <input type='text' onChange={onChange('nome')} value={form.nome} className='form-control input-color' id='name' placeholder='Nome do membro' />
                                <br />
                                <label>Email:</label>
                                <input type='text' onChange={onChange('email')} value={form.email} className='form-control input-color' id='email' placeholder='Email' />
                                <br />
                                <label>Cargo:</label>
                                <select className='custom-select mr-sm-2' onChange={onChange('cargoId')} id='cargo'>
                                    <option selected>Selecione...</option>
                                    {cargos.map(cargo => <option key={cargo.id} value={cargo.id} select={cargo.id === form.cargo}>{cargo.nome}</option>)}
                                </select>
                                <br />
                                <br />
                                <label>Equipe:</label>
                                <select className='custom-select mr-sm-2' onChange={onChange('equipeId')} id='equipe'>
                                    <option selected>Selecione...</option>
                                    {equipes.map(equipe => <option key={equipe.id} value={equipe.id} select={equipe.id === form.equipe}>{equipe.nome}</option>)}
                                </select>
                                <br />
                                <br />
                                <label>Salario:</label>
                                <CurrencyInput prefix='R$' onChange={handleChange('salario')} value={form.salario} className='form-control input-color' id='email' placeholder='Salário' />
                                <br />
                                <label>Foto (URL):</label>
                                <input type='text' onChange={onChange('foto')} value={form.foto} className='form-control input-color' id='foto' placeholder='URL' />

                            </div>
                            <br />
                            <button type='button' onClick={save} className='btn btn-light'>Salvar</button>
                        </form>
                     </div>
                </div>
            </div>
        </div> */}

        </div>
    )
}

export default NewMembro