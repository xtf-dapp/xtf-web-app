import React from 'react'
import { DydxClient } from '@dydxprotocol/v3-client';
import NavbarComponent from '../../navigation/NavigationComponent'


function DyDxComponent() {

    const connect = async () => {
        const client: DydxClient = new DydxClient(
            'https://api.stage.dydx.exchange',
            {
                apiTimeout: 3000,
                starkPrivateKey: '01234abcd...',
            },
        );
        console.log(client.public.getMarkets());
        
    }
    connect()
    return (  
        <div>
            <NavbarComponent />
            DyDxCompoennnnts
        </div>
    );
}

export default DyDxComponent;
