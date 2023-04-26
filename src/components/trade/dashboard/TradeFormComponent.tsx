import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

interface FormProps {
    symbol: string;
}


const TradeFormComponent: React.FC<FormProps> = ({ symbol }) => {

    const [type, setType] = useState("buy");
    const [total, setTotal] = useState(0);
    const [available, setAvailable] = useState(0);

    const handleTypeChange = (e: any) => {
        setType(e.target.value);
    };

    const handlePriceChange = (e: any) => {
        // Handle price change logic here
    };

    const handleAmountChange = (e: any) => {
        // Handle amount change logic here
    };

    // Calculate total and available values based on price and amount
    const calculateValues = () => {
        // Calculation logic here
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="orderType">
                <Form.Check
                    type="radio"
                    name="type"
                    value="buy"
                    checked={type === "buy"}
                    onChange={handleTypeChange}
                    label="Buy"
                />
                <Form.Check
                    type="radio"
                    name="type"
                    value="sell"
                    checked={type === "sell"}
                    onChange={handleTypeChange}
                    label="Sell"
                />
            </Form.Group>

            <Form.Group controlId="orderMethod">
                <Form.Label>Method</Form.Label>
                <Form.Control as="select">
                    <option>Limit</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="orderPrice">
                <Form.Label>Price (USD)</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter price"
                    onChange={handlePriceChange}
                />
            </Form.Group>

            <Form.Group controlId="orderAmount">
                <Form.Label>Amount (BTC)</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter amount"
                    onChange={handleAmountChange}
                />
            </Form.Group>

            <Form.Group controlId="orderTotal">
                <Form.Label>Total</Form.Label>
                <Form.Control type="text" value={total} disabled />
            </Form.Group>

            <Form.Group controlId="orderAvailable">
                <Form.Label>Available</Form.Label>
                <Form.Control type="text" value={available} disabled />
            </Form.Group>

            <Button variant={type === "buy" ? "success" : "danger"} type="submit">
                {type === "buy" ? "Buy" : "Sell"}
            </Button>
        </Form>
    );
};

export default TradeFormComponent;

