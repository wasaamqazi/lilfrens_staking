
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { useEffect, useState } from "react";
import { ethers } from 'ethers';
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");


/** Do not destructure env variables */
const NFT_ADDRESS = process.env.NEXT_PUBLIC_NFT_ADDRESS;
const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;
const ALCHEMY_MAINNET_URL = process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_RPC;
const ALCHEMY_RINKEBY_URL = process.env.NEXT_PUBLIC_ALCHEMY_RINKEBY_RPC;

const RPC_URL = ENVIRONMENT === "development" ? ALCHEMY_RINKEBY_URL : ALCHEMY_MAINNET_URL;

const web3 = createAlchemyWeb3(RPC_URL);
const contractABI = require("/data/abi.json");

const acceptedChains = ENVIRONMENT === 'development' ? [1, 3, 4, 5, 42] : [1, 2];

export const contract = new web3.eth.Contract(contractABI.abi, NFT_ADDRESS);

export const injected = new InjectedConnector({ supportedChainIds: acceptedChains, });
export const walletConnect = new WalletConnectConnector({
  rpc: {
    1: RPC_URL,
  },
  supportedChainIds: acceptedChains,
});

export const walletlink = new WalletLinkConnector({
  url: RPC_URL,
  appName: 'Lil Frens Mint',
  supportedChainIds: acceptedChains,
})

export const mintWhitelist = async (account, proof, numberOfTokens) => {
  const amount = (numberOfTokens * 0.18).toString();
  const amountToWei = web3.utils.toWei(amount, 'ether');
  const bal = await contract.methods.balanceOf(account).call();

  if(bal >= 2) {
    return {
      success: false,
      status: "⛔️ You've reached the max of 2 mints." 
    }
  }

  const result = contract.methods.mintWhitelist(proof, numberOfTokens).send({ from: account, value: amountToWei }).then((result) => {
    return {
      success: true,
      status: `✅ Minted. Tx: https://etherscan.io/tx/` + result.transactionHash
    };
  }).catch((err) => {
    console.log("Mint transaction failed!");
    return {
      success: false,
      status: "😥 " + err.message
    }
  }).finally((result) => {
    return result;
  });

  return result;
}

  export const mintPublic = async (account, numberOfTokens) => {
    const amount = (numberOfTokens * 0.18).toString();
    const amountToWei = web3.utils.toWei(amount, 'ether');
    const bal = await contract.methods.balanceOf(account).call();

    if(bal >= 2) {
      return {
        success: false,
        status: "⛔️ You've reached the max of 2 mints." 
      }
    }
    const result = contract.methods.mint(numberOfTokens).send({ from: account, value: amountToWei }).then((result) => {
      return {
        success: true,
        status: `✅ Minted. Tx: https://etherscan.io/tx/` + result.transactionHash
      };
    }).catch((err) => {
      console.log("Mint transaction failed!");
      return {
        success: false,
        status: "😥 " + err.message
      }
    });

    return result;
};

export function abridgeAddress(hex, length = 4) {
  return `${hex.substring(0, length + 2)}…${hex.substring(
    hex.length - length
  )}`;
}

export const useENSName = (library, address) => {
  const [ENSName, setENSName] = useState("");
  useEffect(() => {
    if (library && typeof address === "string") {
      let stale = false;

      library
        .lookupAddress(address)
        .then((name) => {
          if (!stale && typeof name === "string") {
            setENSName(name);
          }
        })
        .catch(() => {});

      return () => {
        stale = true;
        setENSName("");
      };
    }
  }, [library, address]);

  return ENSName;
}

export default function blank() { return <></>}
