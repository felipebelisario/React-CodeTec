import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    const [sidebarActive, setSidebarActive] = useState()

    useEffect(() => {
        if (window.location.pathname === '/') setSidebarActive(0)
        if (window.location.pathname === '/calendar') setSidebarActive(1)
        if (window.location.pathname === '/historic') setSidebarActive(2)
    }, [])

    return (
        <nav id="sidebar">
            <div id="dismiss">
                <i class="fas fa-arrow-left"></i>
            </div>

            <div style={{ textAlign: "center" }} class="sidebar-header">
                <h3>
                    <img style={{ width: 120, height: 100 }} src="https://imagepng.org/wp-content/uploads/2019/05/dinheiro-icone.png" alt="img" /> <br />
                        My Money
                    </h3>
            </div>

            <ul class="list-unstyled components">
                <p style={{ textAlign: "center" }}>Bem vindo!</p>
                <li class={sidebarActive === 0 ? "active" : ""}>
                    <Link onClick={() => setSidebarActive(0)} to="/">Home</Link>
                </li>
                <li class={sidebarActive === 1 ? "active" : ""}>
                    <Link onClick={() => setSidebarActive(1)} to="/calendar">Calendar</Link>
                </li>
                <li class={sidebarActive === 2 ? "active" : ""}>
                    <Link onClick={() => setSidebarActive(2)} to="/historic">Historic</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Header
