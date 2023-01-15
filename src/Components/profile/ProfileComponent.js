import Navbar from "../../Navigation/NavigationBar";
import React, { useState } from 'react'
import { ethers } from 'ethers'
import './ProfileComponent.css'

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
            <div class="jumbotron">
                <h1 class="display-4">Hello!</h1>
                <p class="lead">Here are the information we found about you from MetaMask</p>
                <hr class="my-4" />
                <p>Account Address {defaultAccount} <br /> Balance {userBalance}</p>
            </div>
        </div>
    );
}

export default Profile;
