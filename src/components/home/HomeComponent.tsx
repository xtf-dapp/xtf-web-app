import NavbarComponent from '../navigation/NavigationComponent'
import { Button, Card } from 'react-bootstrap';
import { useEffect } from 'react';
import TradeDashboard from '../trade/dashboard/TradeDashboardComponent';

function Home() {
    return (
        <div>
            <NavbarComponent />
            <TradeDashboard />
        </div>
    );
}

export default Home;
