import React, { useState } from 'react'
import Header from './components/Header'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

const Home = () => {
    return (
        <h1>Funcionou aqui ó</h1>
    )
}

const Generos = () => {
    return (
        <h1>Funcionou tambem</h1>
    )
}

function App() {
    return (
        <Router>
            <div>
                <Header />
                <Route path='/' exact component={Home} />
                <Route path='/generos' component={Generos} />
            </div>
        </Router>
    )
}

export default App;
