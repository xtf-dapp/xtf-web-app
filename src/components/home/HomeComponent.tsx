import NavbarComponent from '../navigation/NavigationComponent'
import { Button, Card } from 'react-bootstrap';
import Trade from '../trade/TradeComponent';

function Home() {
    return (
        <div>
            <NavbarComponent />
            <Trade showNavbar="false" />
        </div>
    );
}

export default Home;
