import { DydxClient, Market, OrderSide, OrderType, SigningMethod, TimeInForce } from "@dydxprotocol/v3-client";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { Form, Button, Tab, Nav } from "react-bootstrap";
import { NOTIFICATION_TYPE, Store } from "react-notifications-component";
import Web3 from "web3";

interface FormProps {
    symbol: string;
}

type Markets = {
    [key: string]: string;
};

const markets: Markets = {
    "ETHUSDT": "ETH-USD",
    "BTCUSDT": "BTC-USD",
}

const DYDX_HOST = 'https://api.stage.dydx.exchange';
const DYDX_NETWORK_ID = 5;


const TradeFormComponent: React.FC<FormProps> = ({ symbol }) => {

    const [type, setType] = useState("buy");
    const [total, setTotal] = useState(0);
    const [available, setAvailable] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState(0.0);
    const [price, setPrice] = useState(0.0);

    const handleTypeChange = (key: any) => {
        setType(key);
    };

    const handlePriceChange = (e: any) => {
        setPrice(e.target.value);
    };

    const handleAmountChange = (e: any) => {
        setAmount(e.target.value)
    };

    // Calculate total and available values based on price and amount
    const calculateValues = () => {
        // Calculation logic here
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        alert("info", "Validating fields", "")
        connect()
        // Handle form submission logic here
    };

    const alert = (variant: NOTIFICATION_TYPE, title: string, body: string) => {
        Store.addNotification({
            title: title,
            message: body,
            type: variant,
            insert: "top",
            container: "bottom-left",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        });
    }

    const connect = async () => {
        if (window.ethereum) {
            console.log(window.ethereum)
            setIsLoading(true)
            window.ethereum.request({ method: 'eth_accounts' }).then((accounts: any): void => {
                if (accounts.length) {
                    var client: DydxClient = new DydxClient(
                        DYDX_HOST,
                        {
                            apiTimeout: 3000,
                            networkId: DYDX_NETWORK_ID,
                            web3: new Web3(window.ethereum),
                        },
                    );
                    const address = Web3.utils.toChecksumAddress(accounts[0]);
                    client.onboarding.deriveStarkKey(address, SigningMethod.MetaMask)
                        .then(async (starKey) => {
                            console.log("retrieving of starKey was successful")
                            try {
                                const responseFromNewUser = await client.onboarding.createUser({
                                    starkKey: starKey.publicKey,
                                    starkKeyYCoordinate: starKey.publicKeyYCoordinate,
                                    country: 'SG'
                                }, address, null, SigningMethod.MetaMask);
                                console.log("Creation of New user was successful")
                                return { "APIKey": responseFromNewUser.apiKey, "StarkKey": starKey };
                            } catch (errorFromApiKey) {
                                console.log("Creation of new user was unsuccessful")
                                const resFromGetAPIKeys = await client.onboarding.recoverDefaultApiCredentials(address, SigningMethod.MetaMask);
                                return { "APIKey": resFromGetAPIKeys, "StarkKey": starKey };
                            }
                        })
                        .then(async (responseFromPreviousPromise: any) => {
                            // localStorage.setItem(address + "_key", JSON.stringify(responseFromPreviousPromise))
                            const private_client = new DydxClient(
                                DYDX_HOST,
                                {
                                    apiTimeout: 3000,
                                    networkId: DYDX_NETWORK_ID,
                                    web3: new Web3(window.ethereum),
                                    apiKeyCredentials: responseFromPreviousPromise.APIKey,
                                    starkPrivateKey: responseFromPreviousPromise.StarkKey.privateKey,
                                }
                            );

                            try {
                                const accountResponse = await private_client.private.getAccount(address);
                                console.log("response from get Accountts", accountResponse)
                                const equity = +accountResponse.account.equity
                                if (equity <= 0) {
                                    alert('warning', "Account Selected has no funds", 'Using Token API from DYDX to debit some test funds')
                                    await new Promise(resolve => setTimeout(resolve, 3000)); // 3 sec
                                    const testNetTokens = await private_client.private.requestTestnetTokens();
                                    alert('danger', "Test Funds Added", `Amount with ${testNetTokens.transfer.creditAsset}:${testNetTokens.transfer.creditAmount}`)
                                }
                                var reqObj = {
                                    market: Market.ETH_USD,
                                    side: type === "buy" ? OrderSide.BUY : OrderSide.SELL,
                                    type: OrderType.LIMIT,
                                    timeInForce: TimeInForce.GTT,
                                    postOnly: true,
                                    size: amount.toString(),
                                    price: price.toString(),
                                    limitFee: '0.015',
                                    expiration: addOneDay()
                                };
                                console.log("Request sent for create order ", JSON.stringify(reqObj))
                                const createOrderResponse = await private_client.private.createOrder(
                                    reqObj,
                                    accountResponse.account.positionId);
                                console.log("Got Response from create order action", createOrderResponse);
                                alert('success', "Order Created", `Order Created with id ${createOrderResponse.order.id}`)
                            } catch (errorFromCreateOrder: any) {
                                console.log(errorFromCreateOrder)
                                const err = errorFromCreateOrder as AxiosError
                                const str = JSON.parse(err.message.substring(err.message.indexOf("-") + 1))
                                alert('danger', "Create Order Failed", str.errors[0].msg)
                            }

                            setIsLoading(false)
                        }).catch((err: any) => {
                            console.log(err);
                            setIsLoading(false);
                        });
                } else {
                    setIsLoading(false)
                }
            }).catch((err: any) => { console.log(err); setIsLoading(false); })
        } else {
            Store.addNotification({
                title: "Wallet Not Found!",
                message: "Install Metamask or any wallet",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
        }
    }


    const addOneDay = () => {
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + 1);
        return newDate.toISOString();
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Tab.Container activeKey={type} onSelect={handleTypeChange}>
                <Nav variant="tabs">
                    <Nav.Item>
                        <Nav.Link eventKey="buy">Buy</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="sell">Sell</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content>
                    <Tab.Pane eventKey="buy">
                        <Form.Group controlId="orderMethod">
                            <Form.Label>Method</Form.Label>
                            <Form.Control as="select">
                                <option>Limit</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="orderPrice">
                            <Form.Label>Price ({markets[symbol].split("-")[1]})</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter price"
                                onChange={handlePriceChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="orderAmount">
                            <Form.Label>Amount ({markets[symbol].split("-")[0]})</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter amount"
                                onChange={handleAmountChange}
                            />
                        </Form.Group>
                    </Tab.Pane>
                    <Tab.Pane eventKey="sell">
                        <Form.Group controlId="orderMethod">
                            <Form.Label>Method</Form.Label>
                            <Form.Control as="select">
                                <option>Limit</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="orderPrice">
                            <Form.Label>Price ({markets[symbol].split("-")[1]})</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter price"
                                onChange={handlePriceChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="orderAmount">
                            <Form.Label>Amount ({markets[symbol].split("-")[0]})</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter amount"
                                onChange={handleAmountChange}
                            />
                        </Form.Group>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>

            <Form.Group controlId="orderTotal">
                <Form.Label>Total</Form.Label>
                <Form.Control type="text" value={total} disabled />
            </Form.Group>

            <Form.Group controlId="orderAvailable">
                <Form.Label>Available</Form.Label>
                <Form.Control type="text" value={available} disabled />
            </Form.Group>

            <Button variant={type === "buy" ? "success" : "danger"} type="submit" disabled={isLoading}>
                {type === "buy" ? "Buy" : "Sell"}
            </Button>
        </Form>
    );
};

export default TradeFormComponent;

