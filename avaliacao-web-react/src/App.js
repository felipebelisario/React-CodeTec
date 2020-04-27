import React from 'react'
import Header from './components/Header'
import Home from './components/Home'
import Cargo from './components/cruds/Cargo/Cargo'
import Equipe from './components/cruds/Equipe/Equipe'
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
                        <Route path='/equipes' exact component={Equipe} />
                        <Route path='/membros' exact component={Membro} />
                        <Route path='/membros/:id' exact component={InfoMembro} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default App
