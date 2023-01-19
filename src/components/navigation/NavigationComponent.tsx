import React, { useState } from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import AlertComponent from '../alert/AlertComponent';
import './NavigationComponent.css'

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'About Us', href: 'about-us', current: false },
  { name: 'Journey', href: 'journey', current: false },
  { name: 'Blog', href: 'blog', current: false },
]

export default function NavigationBar(props: any) {
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [showAlert, setShowAlert] = useState({ show: false, title: "", body: ""});

  for (const index in navigation) {
    if (navigation[index].name === props.currentNode) {
      navigation[index].current = true;
    } else {
      navigation[index].current = false;
    }
  }
  const isLoggedIn = () => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' }).then((accounts: any): void => {
        if (accounts.length) {
          console.log(`You're connected to: ${accounts[0]}`);
          setDefaultAccount(accounts[0])
        } else {
          console.log("Metamask is not connected");
        }
      })
    } else {
      
    }
  }

  const login = () => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(function (result: any) {
          setDefaultAccount(result[0]);
        })
    } else {
      setShowAlert({ show: true, title: "Error Message", body: "Install Metamask"});
    }
  }

  const getMenu = () => {
    isLoggedIn()

    if (defaultAccount) {
      return (<Nav>
        <Nav.Link href="/profile">Profile</Nav.Link>
      </Nav>)
    } else {
      return (<Nav>
        <Nav.Link onClick={login}>Sign in</Nav.Link>
      </Nav>)
    }
  }

  const closeAlert = (arg: any) => {
    console.log("something")
    setShowAlert({ show: false, title: "", body: ""})
  }

  return (
    <div>
      <AlertComponent show={showAlert.show} title={showAlert.title} body={showAlert.body} setShowAlert={closeAlert}/>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" className="navbar-custom">
        <Container>
          <Navbar.Brand href="#home">XTF</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">

              {navigation.map(item => (
                <Nav.Link href={item.href} >{item.name}</Nav.Link>
              ))}
            </Nav>
            {getMenu()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}