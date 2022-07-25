import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    // UncontrolledDropdown,
    // DropdownToggle,
    // DropdownMenu,
    // DropdownItem 
} from 'reactstrap';

export default function Header(props) {
    const [isOpen,setIsOpen]= useState(false)

    const toggles =()=>{
        setIsOpen(!isOpen)
    }
    const navigate=useNavigate()
    const logout=()=>{
        navigate("/",{state:{}})
    }
    return (
        <div>
            <Navbar color='light' light expand="md">
                    <NavbarBrand>Welcome {props.role.toUpperCase()} </NavbarBrand>
                    <NavbarToggler onClick={()=>toggles} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink onClick={()=>logout()}>Logout</NavLink>
                        </NavItem>
                        {/* <NavItem>
                            <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                        </NavItem> */}
                        {/* <UncontrolledDropdown nav inNavbar> */}
                            {/* <DropdownToggle nav caret> */}
                            {/* Options */}
                            {/* </DropdownToggle> */}
                            {/* <DropdownMenu right> */}
                            {/* <DropdownItem>
                                Option 1
                            </DropdownItem>
                            <DropdownItem>
                                Option 2
                            </DropdownItem> */}
                            {/* <DropdownItem divider /> */}
                            {/* <DropdownItem> */}
                                {/* Logout */}
                            {/* </DropdownItem> */}
                            {/* </DropdownMenu> */}
                        {/* </UncontrolledDropdown> */}
                        </Nav>
                    </Collapse>
                </Navbar>
        </div>
    )
}
