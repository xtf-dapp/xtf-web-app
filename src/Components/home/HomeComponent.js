import Navbar from "../../Navigation/NavigationBar";
import Footer from '../footer/FooterComponent'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Home() {
    return (
        <div>
            <Navbar currentNode="Home"/>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="/dydx_exchange.png" />
                <Card.Body>
                    <Card.Title>dydx Exchange</Card.Title>
                    <Card.Text>
                            A powerful and professional exchange for trading perpetuals. 
                            While trading on our platform, traders enjoy the security, privacy, 
                            and decentralization benefits of Starkware zero-knowledge proofs.
                    </Card.Text>
                    <Button variant="primary" href="https://dydx.exchange/about" target="_blank">Learn More</Button>
                </Card.Body>
            </Card>
            <Footer />
        </div>
    );
}

export default Home;
