import React, { useEffect, useReducer } from 'react'
import { firebaseDatabase } from './utils/FirebaseUtils'

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

        useEffect(() => {
            dispatch({ type: 'REQUEST' })
            firebaseDatabase.ref(resource).on("value", function (snapshot) {
                dispatch({ type: 'SUCCESS', data: snapshot.val() })
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code)
            });
        }, [])

        return data
    }

    return { useGet }
}

export default init