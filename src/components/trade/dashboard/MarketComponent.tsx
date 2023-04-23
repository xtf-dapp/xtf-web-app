import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";

interface Market {
    id: string;
    display_value: string;
}

const markets: Market[] = [
    { id: "ETHUSDT", display_value: "ETH-USD" },
    { id: "BTCUSDT", display_value: "BTC-USD" },
];

interface ChildProps {
    onMarketChange: (newValue: string) => void;
}

const MarketComponent: React.FC<ChildProps> = ({ onMarketChange }) => {
    const [active, setActive] = useState<string>(markets[0].id);

    const handleClick = (marketId: string) => {
        setActive(marketId);
        onMarketChange(marketId)
    };

    return (
        <ListGroup>
            {markets.map((market) => (
                <ListGroup.Item
                    key={market.id}
                    action
                    active={active === market.id}
                    onClick={() => handleClick(market.id)}
                >
                    {market.display_value}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default MarketComponent;
