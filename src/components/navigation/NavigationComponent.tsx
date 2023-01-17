import React, { useState } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'About Us', href: 'about-us', current: false },
  { name: 'Journey', href: 'journey', current: false },
  { name: 'Blog', href: 'blog', current: false },
]

export default function NavigationBar(props: any) {
  const [defaultAccount, setDefaultAccount] = useState(null);
  for (const index in navigation) {
    if (navigation[index].name === props.currentNode) {
      navigation[index].current = true;
    } else {
      navigation[index].current = false;
    }
  }
  const isLoggedIn = () => {
    window.ethereum.request({ method: 'eth_accounts' }).then((accounts: any): void => {
      if (accounts.length) {
        console.log(`You're connected to: ${accounts[0]}`);
        setDefaultAccount(accounts[0])
      } else {
        console.log("Metamask is not connected");
      }
    })
  }

  const login = () => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(function (result: any) {
          setDefaultAccount(result[0]);
        })
    } else {
      console.log("Install Metamask");
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
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
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
  )
}