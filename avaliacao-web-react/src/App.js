import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Home from './components/Home'
import Cargo from './components/cruds/Cargo/Cargo'
import NewCargo from './components/cruds/Cargo/NewCargo'
import EditCargo from './components/cruds/Cargo/EditCargo'
import Equipe from './components/cruds/Equipe/Equipe'
import NewEquipe from './components/cruds/Equipe/NewEquipe'
import EditEquipe from './components/cruds/Equipe/EditEquipe'
import Membro from './components/cruds/Membro/Membro'
import InfoMembro from './components/cruds/Membro/InfoMembro'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

function App() {
    return (
        <div>
            <Router>
                <div>
                    <Header />
                    <Switch>
                        <Route path='/' exact component={Home} />
                        <Route path='/cargos' exact component={Cargo} />
                        <Route path='/cargos/new' exact component={NewCargo} />
                        <Route path='/cargos/:id' exact component={EditCargo} />
                        <Route path='/equipes' exact component={Equipe} />
                        <Route path='/equipes/new' exact component={NewEquipe} />
                        <Route path='/equipes/:id' exact component={EditEquipe} />
                        <Route path='/membros' exact component={Membro} />
                        <Route path='/membros/:id' exact component={InfoMembro} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default App
