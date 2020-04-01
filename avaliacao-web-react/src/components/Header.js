import React, { useState } from 'react'
import {
    Navbar,
    NavbarBrand,
    Collapse,
    Nav,
    NavItem,
    NavLink,
    NavbarToggler
} from 'reactstrap'
import { Link } from 'react-router-dom'

const Header = () => {
    const [open, setOpen] = useState(false)
    const toogle = () => {
        setOpen(!open)
    }

    return (
        <Navbar color='dark' dark expand='md'>
            <NavbarBrand tag={Link} to='/'>Avaliação ReactJs</NavbarBrand>
            <NavbarToggler onClick={toogle} />
            <Collapse isOpen={open} navbar>
                <Nav className='mr-auto' navbar>
                    <NavItem>
                        <NavLink tag={Link} to='/cargos'>Cargos</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='/equipes'>Equipes</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='/membros'>Membros</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default Header
