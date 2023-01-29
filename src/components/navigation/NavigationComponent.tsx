import React, { useState, useEffect } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import './NavigationComponent.css'
import { Store } from 'react-notifications-component';

const navigation = [
  { name: 'Home', href: '/xtf-web-app/', current: false },
  { name: 'About Us', href: '/xtf-web-app/#/about-us', current: false },
  { name: 'Journey', href: '/xtf-web-app/#/journey', current: false },
  { name: 'Blog', href: '/xtf-web-app/#/blog', current: false },
  { name: 'Chart', href: '/xtf-web-app/#/trade/dydx/chart', current: false },
]

export default function NavigationBar(props: any) {
  const [defaultAccount, setDefaultAccount] = useState(null);

  useEffect(() => {

    if (navigation) {
      for (const index in navigation) {
        if (navigation[index].name === props.currentNode) {
          navigation[index].current = true;
        } else {
          navigation[index].current = false;
        }
      }
    }

  });


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
    }
  }

  const login = () => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(function (result: any) {
          setDefaultAccount(result[0]);
        })
    } else {
      Store.addNotification({
        title: "Wallet Not Found!",
        message: "Install Metamask or any wallet",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
    }
  }

  const getMenu = () => {
    isLoggedIn()

    if (defaultAccount) {
      return (<Nav>
        <Nav.Link href="/xtf-web-app/#/profile">Profile</Nav.Link>
      </Nav>)
    } else {
      return (<Nav>
        <Nav.Link onClick={login}>Sign in</Nav.Link>
      </Nav>)
    }
  }


  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" className="navbar-custom">
        <Container>
          <Navbar.Brand href="/xtf-web-app/">XTF</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">

              {navigation.map(item => (
                <Nav.Link href={item.href} key={item.name}>{item.name}</Nav.Link>
              ))}
            </Nav>
            {getMenu()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}