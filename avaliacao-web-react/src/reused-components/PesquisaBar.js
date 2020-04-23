import React, { useState } from 'react'

const PesquisaBar = props => {
    const [search, setSearch] = useState('')

    const keyPressed = evt => {
        if (evt.keyCode === 13) {
            setFiltro()
        }
    }

    const searchChange = evt => {
        setSearch(evt.target.value)
    }

    const setFiltro = () => {
        const filtrado = props.data.filter(item => {
            for (var propriedade in item) {
                if (item.hasOwnProperty(propriedade) && (props.keyWordsToFind === undefined || props.keyWordsToFind.indexOf(propriedade) !== -1)) {
                    if(typeof item[propriedade] === "number"){
                        if (item[propriedade] === parseInt(search)) 
                            return true
                        
                    }
                    if(typeof item[propriedade] === "string"){
                        if (item[propriedade].toUpperCase().indexOf(search.toUpperCase()) !== -1) 
                            return true
                    }
                }
            }
            return false    
        })
        props.setTempNumPages(filtrado.length)
        props.setNewTempData(filtrado)
    }

    return (
        <form onSubmit={e => { e.preventDefault() }}>
            <div className="form-row">
                <div className='form-group col-md-10'>
                    <input onKeyDown={keyPressed} className="form-control" onChange={searchChange} type="text" placeholder="Procurar registros" value={search} />
                </div>
                <div className='form-group col-md-2'>
                    <button onClick={setFiltro} className="btn btn-dark form-control" type="button">Procurar</button>
                </div>
            </div>
        </form>
    )
}

export default PesquisaBar