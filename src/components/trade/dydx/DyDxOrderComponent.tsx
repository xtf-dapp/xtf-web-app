import React, { useState } from 'react';
import { Modal, Form, Button, Row, Col, InputGroup, Accordion } from 'react-bootstrap';
import { DydxClient, SigningMethod, OrderSide, TimeInForce, OrderType, Market, ApiKeyCredentials } from '@dydxprotocol/v3-client';
import Web3 from 'web3'
import AlertComponent from '../../alert/AlertComponent';
import { AxiosError } from 'axios';


const DYDX_HOST = 'https://api.stage.dydx.exchange';

function DyDxOrderComponent(props: any) {
    const [show, setShow] = useState(false);
    const [orderSide, setOrderSide] = useState("BUY");
    const [type, setType] = useState("LIMIT");
    const [postOnly, setPostOnly] = useState("FALSE");
    const [secondCurrency, setSecondCurrency] = useState(0.0);
    const [firstCurrency, setFirstCurrency] = useState(0.01);
    const [price, setPrice] = useState(1000);
    const [showAlert, setShowAlert] = useState({ show: false, title: "", body: "" });
    const [checkBoxChecked, setCheckBoxChecked] = useState(false);

    const connect = async () => {
        if (!checkBoxChecked) {
            setShowAlert({ show: true, title: "Checkbox Unchecked", body: "In order to proceed, please agree to the transaction signing by the assumed wallet" })
            return;
        }
        setShowAlert({ show: false, title: "", body: "" })
        if (window.ethereum) {
            console.log(window.ethereum)
            window.ethereum.request({ method: 'eth_accounts' }).then((accounts: any): void => {
                if (accounts.length) {
                    var client: DydxClient = new DydxClient(
                        DYDX_HOST,
                        {
                            apiTimeout: 3000,
                            networkId: 5,
                            web3: new Web3(window.ethereum),
                        },
                    );
                    const address = Web3.utils.toChecksumAddress(accounts[0]);
                    client.onboarding.deriveStarkKey(address, SigningMethod.MetaMask)
                        .then(async (starKey) => {
                            if (localStorage.getItem(address + "_key")) {
                                return JSON.parse(localStorage.getItem(address + "_key") || "")
                            }
                            try {
                                const responseFromNewUser = await client.onboarding.createUser({
                                    starkKey: starKey.publicKey,
                                    starkKeyYCoordinate: starKey.publicKeyYCoordinate,
                                    country: 'SG'
                                }, address, null, SigningMethod.MetaMask);
                                return { "APIKey": responseFromNewUser.apiKey, "StarkKey": starKey };
                            } catch (errorFromApiKey) {
                                const resFromGetAPIKeys = await client.onboarding.recoverDefaultApiCredentials(address, SigningMethod.MetaMask);
                                return { "APIKey": resFromGetAPIKeys, "StarkKey": starKey };
                            }
                        })
                        .then(async (responseFromPreviousPromise: any) => {
                            localStorage.setItem(address + "_key", JSON.stringify(responseFromPreviousPromise))
                            const private_client = new DydxClient(
                                DYDX_HOST,
                                {
                                    apiTimeout: 3000,
                                    networkId: 0x5,
                                    web3: new Web3(window.ethereum),
                                    apiKeyCredentials: responseFromPreviousPromise.APIKey,
                                    starkPrivateKey: responseFromPreviousPromise.StarkKey.privateKey,
                                }
                            );

                            try {
                                const accountResponse = await private_client.private.getAccount(address);
                                console.log("response from get Accountts", accountResponse)
                                var reqObj = {
                                    market: props.market,
                                    side: orderSide === "BUY" ? OrderSide.BUY : OrderSide.SELL,
                                    type: OrderType.LIMIT,
                                    timeInForce: TimeInForce.GTT,
                                    postOnly: postOnly === "FALSE" ? false : true,
                                    size: firstCurrency.toString(),
                                    price: price.toString(),
                                    limitFee: '0.015',
                                    expiration: addOneDay()
                                };
                                console.log("Request sent for create order ", JSON.stringify(reqObj))
                                const createOrderResponse = await private_client.private.createOrder(
                                    reqObj, 
                                    accountResponse.account.positionId);
                                console.log("Got Response from create order action");
                                console.log(createOrderResponse);
                                setShow(false)

                            } catch (errorFromCreateOrder: any) {
                                console.log(errorFromCreateOrder)
                                const err = errorFromCreateOrder as AxiosError
                                const str = JSON.parse(err.message.substring(err.message.indexOf("-") + 1))
                                setShowAlert({ show: true, title: "Create Order Failed", body: str.errors[0].msg })
                                setShow(false)
                            }
                        });
                }
            })
        }
    }

    const addOneDay = () => {
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + 1);
        return newDate.toISOString();
    }

    const closeAlert = (arg: any) => {
        setShowAlert({ show: false, title: "", body: "" })
    }

    return (
        <>
            <AlertComponent show={showAlert.show} title={showAlert.title} body={showAlert.body} setShowAlert={closeAlert} />
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
                                    <Form.Control type="number" name="price" step=".01" value={firstCurrency} onChange={(tarEnv) => setFirstCurrency(parseFloat(tarEnv.target.value))} />
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
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Advance Options</Form.Label>
                        <Accordion defaultActiveKey="-1">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Good Till Time</Accordion.Header>
                                <Accordion.Body>
                                    Good Till Time will be by default set to 1 Day
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Limit Fee</Accordion.Header>
                                <Accordion.Body>
                                    Set default to 0.015
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="MetaMask or Wallet selected may ask for max 2 signing of transaction" value={checkBoxChecked+""} onChange={(tarEnv) => setCheckBoxChecked(tarEnv.target.checked)} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                    <Button variant="primary" onClick={() => connect()}>Trade</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DyDxOrderComponent;