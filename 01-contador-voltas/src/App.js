import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'

import Button from 'react-bootstrap/Button';

import MostraVoltas from './components/MostraVoltas'
import MostraTempo from './components/MostraTempo'

function App() {
    const [numVoltas, setNumVoltas] = useState(0)
    const [running, setRunning] = useState(false)
    const [tempo, setTempo] = useState(0)

    const increment = () => {
        setNumVoltas(numVoltas + 1)
    }

    const decrement = () => {
        if(numVoltas != 0)
            setNumVoltas(numVoltas - 1)
    }

    const reset = () => {
        setTempo(0)

        if(running) setRunning(!running)
    }

    useEffect(() => {
        let timer = null
        if (running) {
            timer = setInterval(() => {
                setTempo(old => old + 1)
            }, 1000)
        }
        return () => {
            if(timer) {
                clearInterval(timer)
            }
        }
    }, [running]) // A cada alteração da const running é ativado

    const toggleRunningRun = () => {
        if (!running)
            setRunning(!running)
    }

    const toggleRunningStop = () => {
        if (running)
            setRunning(!running)
    }

    return (
        <>
            <MostraVoltas voltas={numVoltas} />
            <Button variant="outline-dark bigger" onClick={increment}>+</Button>
            <Button variant="outline-dark bigger" onClick={decrement}>-</Button>
            {
                numVoltas > 0 &&
                <MostraTempo tempo={parseInt(tempo/numVoltas)} />
            }
            <div>
                <Button variant="outline-dark" size='lg' onClick={toggleRunningRun}>Iniciar</Button>
                <Button variant="outline-dark" size='lg' onClick={toggleRunningStop}>Parar</Button>
                <Button variant="outline-dark" size='lg' onClick={reset}>Resetar</Button>
            </div>
        </>
    )
}

export default App;
