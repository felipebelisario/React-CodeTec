import React, { useEffect, useReducer } from 'react'
import axios from 'axios'

const INITIAL_STATE = {
    loading: true,
    data: {}
}

const reducer = (state, action) => {
    if (action.type === 'REQUEST') {
        return {
            ...state,
            loading: true
        }
    }

    if (action.type === 'SUCCESS') {
        return {
            ...state,
            loading: false,
            data: action.data
        }
    }

    return state
}

const init = baseURL => {
    const useGet = resource => {
        const [data, dispatch] = useReducer(reducer, INITIAL_STATE)
        const [data1, dispatch2] = useReducer(reducer, INITIAL_STATE)

        useEffect(() => {
            dispatch({ type: 'REQUEST' })
            axios.get(baseURL + resource + '.json').then(res => {
                dispatch({ type: 'SUCCESS', data: res.data })
            })
        }, [])

        return data
    }

    return { useGet }
}

export default init