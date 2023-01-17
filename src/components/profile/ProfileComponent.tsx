import Navbar from "../navigation/NavigationComponent";
import React, { useState } from 'react'
import { ethers } from 'ethers'
import './ProfileComponent.css'

/**
 * 
 * Ref Links
 *  https://www.material-tailwind.com/docs/react/card
 */

function Profile() {
    const [defaultAccount, setDefaultAccount] = useState("");
    const [userBalance, setUserBalance] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function getUserBalance(account: any) {
        window.ethereum.request({ method: 'eth_getBalance', params: [account, 'latest'] })
            .then(function (balance: any) {
                    setUserBalance(ethers.utils.formatEther(balance));
                })
            .catch(function (error: any) {
                    setErrorMessage(error.message);
                });
    }

    const connectWalletHandler = () => {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(function (result: any) {
                        accountChangedHandler(result[0]);
                    })
        } else {
            setErrorMessage("Install Metamask");
        }
    }

    const accountChangedHandler = function (newAccount: any) {
        setDefaultAccount(newAccount);
        getUserBalance(newAccount);
    }

    connectWalletHandler()
    return (
        <div>
            <Navbar />
            <div className="jumbotron">
                <h1 className="display-4">Hello!</h1>
                <p className="lead">Here are the information we found about you from MetaMask</p>
                <hr className="my-4" />
                <p>Account Address {defaultAccount} <br /> Balance {userBalance}</p>
            </div>
        </div>
    );
}

export default Profile;
