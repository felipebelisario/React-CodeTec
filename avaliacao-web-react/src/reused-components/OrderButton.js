import React, { useState } from 'react'

const OrderButton = props => {
    const [icon, setIcon] = useState('plus')

    const canToogle = () => {
        if(props.disabled === true && icon === 'plus') return true
        else return false
    }

    const toggleIcon = () => {
        props.setDisabled(true)
        icon === 'sort-ascending' ? setIcon('sort-descending') : setIcon('sort-ascending')
    }

    const tooltipText = () => { 
        if(icon === 'plus') return 'Adicionar ordenação'
        if(icon === 'sort-ascending') return 'Cescente'
        if(icon === 'sort-descending') return 'Decrescente'
    }

    const trataX = () => {
        setIcon('plus')
        props.tempData.sort(sortAscending(props.ordemPadraoPor))

        props.setNewTempData([...props.tempData])
        props.setDisabled(false)
    }

    const ordenaDados = property => {
        if(icon === 'sort-descending' || icon === 'plus') props.tempData.sort(sortAscending(property))
        else if(icon === 'sort-ascending') props.tempData.sort(sortDescending(property))

        props.setNewTempData([...props.tempData])
    }

    const sortAscending = (property) => (a, b) => {
        if (a[property] > b[property])
            return 1
        else if (a[property] < b[property])
            return -1

        return 0
    }

    const sortDescending = (property) => (a, b) => {
        if (a[property] < b[property])
            return 1
        else if (a[property] > b[property])
            return -1

        return 0
    }

    return (
        <div className='btn-group ml-2' role='group' aria-label='First group'>
            <button disabled={canToogle()} onClick={() => {toggleIcon(); ordenaDados(props.property)}} type='button' className='btn btn-secondary btn-sm'
                dataToggle='tooltip' dataPlacement='left' title={tooltipText()}>
                <span className={'oi oi-' + icon} aria-hidden='true'></span>
            </button>

            {icon !== 'plus' &&
                <button onClick={() => trataX('plus')} type='button' className='btn btn-secondary btn-sm'
                    dataToggle='tooltip' dataPlacement='left' title='Remover ordenação'>
                    <span className='oi oi-x' title='icon nome' aria-hidden='true'></span>
                </button>
            }
        </div>
    )
}

export default OrderButton