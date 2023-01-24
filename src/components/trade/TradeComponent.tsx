import React, { useState, useEffect } from 'react'
import NavbarComponent from '../navigation/NavigationComponent'
import { Button, Card } from 'react-bootstrap';
import dydx_logo from '../../assests/dydx_exchange.png'


const traders = [
    {
        title: 'dydx Exchange', href: '/xtf-web-app/#/trade/dydx', description: `A powerful and professional exchange for trading perpetuals.
    While trading on our platform, traders enjoy the security, privacy,
    and decentralization benefits of Starkware zero-knowledge proofs.` }
]

function Trade(props: any) {

    return (
        <div>
            <Card border="info" style={{ width: '18rem', margin: '20px' }}>
                <Card.Img variant="top" src={dydx_logo} />
                <Card.Body>
                    <Card.Title>dydx Exchange</Card.Title>
                    <Card.Text>
                        A powerful and professional exchange for trading perpetuals.
                        While trading on our platform, traders enjoy the security, privacy,
                        and decentralization benefits of Starkware zero-knowledge proofs.
                    </Card.Text>
                    <Button variant="primary" href={traders.find(item => item.title == "dydx Exchange")?.href} >Trade</Button>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Trade;
