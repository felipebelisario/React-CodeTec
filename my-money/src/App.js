import React, {
    useEffect,
    useState,
    useReducer
} from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import Header from './Header'
import Calendar from './tabs/Calendar'
import Historic from './tabs/Historic'
import Home from './tabs/Home'


function App() {
    return (
        <div>
            <Router>
                <div class="wrapper">

                    <Header />
                    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                        <Switch>
                            <Route path='/' exact component={Home} />
                            <Route path='/calendar' exact component={Calendar} />
                            <Route path='/historic' exact component={Historic} />
                        </Switch>
                    </div>

                </div >
            </Router>
        </div>
    )
}

export default App