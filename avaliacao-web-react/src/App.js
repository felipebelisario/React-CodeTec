import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Home from './components/Home'
import Cargo from './components/cruds/Cargo'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

function App() {
    return (
        <div>
            <Router>
                <div>
                    <Header />
                    <Route path='/' exact component={Home} />
                    <Route path='/cargos' component={Cargo} />
                    <Route path='/cargos/new' exact component={Home} />
                </div>
            </Router>
        </div>
    )
}

export default App
