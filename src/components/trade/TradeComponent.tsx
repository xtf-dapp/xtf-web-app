import React, { useState, useEffect } from 'react'
import NavbarComponent from '../navigation/NavigationComponent'
import { Button, Card, CardGroup } from 'react-bootstrap';
import dydx_logo from '../../assests/dydx_exchange.png'
import gmx_logo from '../../assests/gmx_exchange.png'
import gains_logo from '../../assests/gains_exchange.jpeg'
import synthetix_logo from '../../assests/synthetix_exchange.jpeg'


const traders = [
    {
        title: 'dydx Exchange', href: '/xtf-web-app/#/trade/dydx',
        description: `A powerful and professional exchange for trading perpetuals.
    While trading on our platform, traders enjoy the security, privacy,
    and decentralization benefits of Starkware zero-knowledge proofs.` },
    {
        title: 'GMX Exchange', href: '/xtf-web-app/#/trade/gmx',
        description: `GMX.io is a decentralized exchange (DEX) built on the Ethereum blockchain as a decentralized application (dApp).
        GMX.io provides liquidity pools, allowing users to earn rewards by staking their tokens. Overall, GMX.io aims to provide a decentralized, efficient, and user-friendly platform for cryptocurrency trading.`
    },
    {
        title: 'Gains Exchange', href: '/xtf-web-app/#/trade/gains',
        description: `Gains.trade is a decentralized trading platform built on the Binance Smart Chain. 
        It offers users a range of features, including yield farming, staking, and a decentralized exchange. The platform's native token is GAINS.`
    },
    {
        title: 'Synthetix Exchange', href: '/xtf-web-app/#/trade/synthetix',
        description: `Synthetix is a decentralized protocol on the Ethereum blockchain that enables the creation and trading of synthetic assets, 
        including stocks, commodities, and cryptocurrencies. The platform's native token is SNX.`
    }
]

function Trade(props: any) {

    return (
        <CardGroup>
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
            <Card border="info" style={{ width: '18rem', margin: '20px' }}>
                <Card.Img variant="top" src={gmx_logo} />
                <Card.Body>
                    <Card.Title>GMX Exchange</Card.Title>
                    <Card.Text>
                        GMX.io is a decentralized exchange (DEX) built on the Ethereum blockchain as a decentralized application (dApp).
                        GMX.io provides liquidity pools, allowing users to earn rewards by staking their tokens. Overall, GMX.io aims to provide a decentralized, efficient, and user-friendly platform for cryptocurrency trading.
                    </Card.Text>
                    <Button variant="secondary" href={traders.find(item => item.title == "GMX Exchange")?.href} disabled>Coming Soon</Button>
                </Card.Body>
            </Card>
            <Card border="info" style={{ width: '18rem', margin: '20px' }}>
                <Card.Img variant="top" src={gains_logo} />
                <Card.Body>
                    <Card.Title>Gains Exchange</Card.Title>
                    <Card.Text>
                    Gains.trade is a decentralized trading platform built on the Binance Smart Chain. 
                    It offers users a range of features, including yield farming, staking, and a decentralized exchange. The platform's native token is GAINS.
                    </Card.Text>
                    <Button variant="secondary" href={traders.find(item => item.title == "Gains Exchange")?.href} disabled>Coming Soon</Button>
                </Card.Body>
            </Card>
            <Card border="info" style={{ width: '18rem', margin: '20px' }}>
                <Card.Img variant="top" src={synthetix_logo} />
                <Card.Body>
                    <Card.Title>Synthetix Exchange</Card.Title>
                    <Card.Text>
                    Synthetix is a decentralized protocol on the Ethereum blockchain that enables the creation and trading of synthetic assets, 
                    including stocks, commodities, and cryptocurrencies. The platform's native token is SNX.
                    </Card.Text>
                    <Button variant="secondary" href={traders.find(item => item.title == "Synthetix Exchange")?.href} disabled>Coming Soon</Button>
                </Card.Body>
            </Card>
        </CardGroup>
    );
}

export default Trade;
