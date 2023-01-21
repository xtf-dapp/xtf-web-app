import React, { useState } from 'react';
import { Modal, Form, Button, Row, Col, InputGroup, Accordion } from 'react-bootstrap';
import { DydxClient, SigningMethod, OrderSide, TimeInForce, OrderType } from '@dydxprotocol/v3-client';
import Web3 from 'web3'

const DYDX_HOST = 'https://api.stage.dydx.exchange';

function DyDxOrderComponent(props: any) {
    const [show, setShow] = useState(false);
    const [orderSide, setOrderSide] = useState("BUY");
    const [type, setType] = useState("LIMIT");
    const [postOnly, setPostOnly] = useState("FALSE");
    const [secondCurrency, setSecondCurrency] = useState(0.0);
    const [firstCurrency, setFirstCurrency] = useState(0.0);
    const [price, setPrice] = useState(0.0);

    const connect = async () => {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_accounts' }).then((accounts: any): void => {
                if (accounts.length) {
                    console.log(`You're connected to: ${accounts[0]}`);
                    var client: DydxClient = new DydxClient(
                        DYDX_HOST,
                        {
                            networkId: 5,
                            web3: new Web3(window.ethereum),
                        },
                    );
                    const address = Web3.utils.toChecksumAddress(accounts[0]);



                    client.onboarding.deriveStarkKey(address, SigningMethod.MetaMask).then((starKey) => {

                        

                        client.ethPrivate.createApiKey(
                            address,
                            SigningMethod.MetaMask
                        ).then((resFromGetAPIKeys) => {
                            console.log("Succcess from GET API ", resFromGetAPIKeys)
                            return new Promise((resolve, reject) => resolve(resFromGetAPIKeys))
                        }).catch((errorFromApiKey) => {
                            console.log("Error from API Keys retreival ", errorFromApiKey)
                            client.onboarding.createUser(
                                {
                                    starkKey: starKey.publicKey,
                                    starkKeyYCoordinate: starKey.publicKeyYCoordinate,
                                    country: 'SG'
                                },
                                address,
                                null,
                                SigningMethod.MetaMask
                            ).then((responseFromNewUser) => {
                                return new Promise((resolve, reject) => resolve(responseFromNewUser.apiKey))
                            })
                        }).then((finalCombined) => {
                            console.log("Final COombined call", finalCombined)
                            nextSteps(finalCombined, starKey)
                        })

                        // client.onboarding.createUser(
                        //     {
                        //         starkKey: starKey.publicKey,
                        //         starkKeyYCoordinate: starKey.publicKeyYCoordinate,
                        //         country: 'SG'
                        //     },
                        //     address,
                        //     null,
                        //     SigningMethod.MetaMask
                        // ).then((creteUserResp) => {
                        //     nextSteps(creteUserResp.apiKey, starKey)
                        // }).catch((erroWhenCreatingUser) => {
                        //     console.log("Error Creating User ", erroWhenCreatingUser)
                        //     if(erroWhenCreatingUser.contains("already in use")){
                        //         //StarKey is already in use, user is already registered:
                        //         client.private.getApiKeys().then((getApiKeyResponse) => {
                        //             nextSteps(getApiKeyResponse, starKey)
                        //         })
                        //     }
                        // })
                    });


                }
            })
        }
    }

    const nextSteps = async (apiKey: any, starKey: any) => {
        console.log("nextSteps ", apiKey, starKey)
        const client = new DydxClient(
            DYDX_HOST,
            {
                networkId: 5,
                web3: new Web3(window.ethereum),
                apiKeyCredentials: apiKey,
                starkPrivateKey: starKey,
            },
        );
        console.log("Newly created clinet", client)
        console.log("Newly created clinet", props)
        client.private.createOrder(
            {
                market: props.market,
                side: orderSide === "BUY" ? OrderSide.BUY : OrderSide.SELL,
                type: OrderType.LIMIT,
                timeInForce: TimeInForce.GTT,
                postOnly: postOnly === "FALSE" ? false : true,
                size: '0.1',
                price: '1',
                limitFee: '0.015',
                expiration: '2023-01-30T21:30:20.200Z',
                clientId: "dasdasdasdasdasda"
            },
            '1', // required for creating the order signature
        ).then((createOrderResponse) => {
            console.log("Got Response from create order action")
            console.log(createOrderResponse)
        }).catch((errorFromCreateOrder) => {
            console.log(errorFromCreateOrder)
        })
    }

    return (
        <>
            <button type="button" className="btn btn-primary btn-sm" onClick={() => setShow(true)}>
                Transact
            </button>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.market}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Side</Form.Label>
                        <Form.Select aria-label="Order Side" onChange={(tarEnv) => setOrderSide(tarEnv.target.value)}>
                            <option>Order Side</option>
                            <option value="BUY" selected>BUY</option>
                            <option value="SELL">SELL</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Type</Form.Label>
                        <Form.Select aria-label="Type" onChange={(tarEnv) => setType(tarEnv.target.value)}>
                            <option>Type</option>
                            <option value="MARKET">MARKET</option>
                            <option value="LIMIT" selected>LIMIT</option>
                            <option value="STOP_LIMIT">STOP_LIMIT</option>
                            <option value="TRAILING_STOP">TRAILING_STOP</option>
                            <option value="TAKE_PROFIT">TAKE_PROFIT</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Type</Form.Label>
                        <Form.Select aria-label="Post only" onChange={(tarEnv) => setPostOnly(tarEnv.target.value)}>
                            <option>Post Only</option>
                            <option value="TRUE">TRUE</option>
                            <option value="FALSE" selected>FALSE</option>
                        </Form.Select>
                        <Form.Text className="text-muted">
                            Whether the order should be canceled if it would fill immediately on reaching the matching-engine.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Amount</Form.Label>
                        <Row>
                            <Col>
                                <InputGroup className="mb-3">
                                    <Form.Control type="number" name="price" step=".0001" value={firstCurrency} onChange={(tarEnv) => setFirstCurrency(parseFloat(tarEnv.target.value))} />
                                    <InputGroup.Text id="basic-addon1">{props.market.split('-')[0]}</InputGroup.Text>
                                </InputGroup>
                            </Col>
                            <Col>
                                <InputGroup className="mb-3">
                                    <Form.Control type="number" name="price" step=".0001" value={secondCurrency} onChange={(tarEnv) => setSecondCurrency(parseFloat(tarEnv.target.value))} />
                                    <InputGroup.Text id="basic-addon1">{props.market.split('-')[1]}</InputGroup.Text>
                                </InputGroup>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Price</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control type="number" name="price" step=".0001" value={price} onChange={(tarEnv) => setPrice(parseFloat(tarEnv.target.value))} />
                            <InputGroup.Text id="basic-addon1">USD</InputGroup.Text>
                        </InputGroup>
                        <Form.Text className="text-muted">
                            Worst accepted price of the base asset in USD.
                        </Form.Text>
                    </Form.Group>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Advance</Accordion.Header>
                            <Accordion.Body>
                                Good Till Time will be by default set to 1 Day
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                    <Button variant="primary" onClick={() => connect()}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DyDxOrderComponent;