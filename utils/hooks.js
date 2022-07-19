const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

/** Do not destructure env variables */
const NFT_ADDRESS = process.env.NEXT_PUBLIC_NFT_ADDRESS;
const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;
const ALCHEMY_MAINNET_URL = process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_RPC;
const ALCHEMY_RINKEBY_URL = process.env.NEXT_PUBLIC_ALCHEMY_RINKEBY_RPC;

const RPC_URL = ENVIRONMENT === "development" ? ALCHEMY_RINKEBY_URL : ALCHEMY_MAINNET_URL;
const web3 = createAlchemyWeb3(RPC_URL);

const contractABI = require("/data/abi.json");
const contract = new web3.eth.Contract(contractABI.abi, NFT_ADDRESS);


export const useWalletMembershipAccess = () => {
    // react states for chechking if user can access or not
    const [access, setAccess] = useState(false);
    const { account, library } = useWeb3React();
  
    async function checkWalletMembership() {
        const balance = await contract.methods.balanceOf(account).call();
        return balance >= 1;
    }
  
    // check wallet when account is connected
    if (library && account) {
      checkWalletMembership().then(setAccess);
    } else if (access) {
      // reset the state if wallet is disconnected
      setAccess(false);
    }
  
    return access;
};