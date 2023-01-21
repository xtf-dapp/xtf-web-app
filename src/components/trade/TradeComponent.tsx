import NavbarComponent from '../navigation/NavigationComponent'
import { Button, Card } from 'react-bootstrap';

function Trade(props: any) {
    return (
        <div>
            { !props.showNavbar ? <NavbarComponent /> : ""}
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="/dydx_exchange.png" />
                <Card.Body>
                    <Card.Title>dydx Exchange</Card.Title>
                    <Card.Text>
                        A powerful and professional exchange for trading perpetuals.
                        While trading on our platform, traders enjoy the security, privacy,
                        and decentralization benefits of Starkware zero-knowledge proofs.
                    </Card.Text>
                    <Button variant="primary" href="/trade/dydx" >Trade</Button>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Trade;
