import NavbarComponent from '../navigation/NavigationComponent'
import { Button, Card } from 'react-bootstrap';
import Trade from '../trade/TradeComponent';
import { useEffect } from 'react';

function Home() {
    return (
        <div>
            <NavbarComponent />
            <Trade />
        </div>
    );
}

export default Home;
