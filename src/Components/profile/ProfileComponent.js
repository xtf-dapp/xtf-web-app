import Navbar from "../../Navigation/Navbar";
import React, { useState } from 'react'
import { ethers } from 'ethers'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";


/**
 * 
 * Ref Links
 *  https://www.material-tailwind.com/docs/react/card
 */

function Profile() {
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const getUserBalance = (account) => {
        window.ethereum.request({ method: 'eth_getBalance', params: [account, 'latest'] })
            .then(balance => {
                setUserBalance(ethers.utils.formatEther(balance));
            })
            .catch(error => {
                setErrorMessage(error.message);
            });
    }

    const connectWalletHandler = () => {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(result => {
                    accountChangedHandler(result[0]);
                })
        } else {
            setErrorMessage("Install Metamask");
        }
    }

    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount)
        getUserBalance(newAccount)
    }

    connectWalletHandler()
    return (
        <div>
            <Navbar />
            <Card className="w-96">
                <CardBody className="text-center">
                    <Typography variant="h5" className="mb-2">
                        Profile
                    </Typography>
                    <Typography>
                        Default Account: {defaultAccount} <br/>
                        Balance: {userBalance}
                    </Typography>
                </CardBody>
            </Card>
        </div>
    );
}

export default Profile;
