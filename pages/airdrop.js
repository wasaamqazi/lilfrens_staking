import airdropAbi from '../data/airdrop-abi.json';
import useSWR from 'swr';
import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import Connect from '../components/web3/connect';
import Footer from '../components/core-components/Footer';
import axios from 'axios'

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

const RPC_URL = process.env.NEXT_PUBLIC_ENVIRONMENT === "development" ? process.env.NEXT_PUBLIC_ALCHEMY_RINKEBY_RPC : process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_RPC;
const web3 = createAlchemyWeb3(RPC_URL);
const airdropAddress = "0x3264eeC7b36Abe371D88D12AF182DfD90e32Fd48"
const airdropContract = new web3.eth.Contract(airdropAbi.abi, airdropAddress);


export default function Airdrop() {
    const { active, account, library } = useWeb3React();
    const [loadingClaim, setLoadingClaim] = useState(false);
    const [airdropToken, setAirdropToken] = useState([]);
    const [loadingAirdrop, setLoadingAirdrop] = useState(false);
    const [claimSuccess, setClaimSuccess] = useState(false);
    const [claimFailure, setClaimFailure] = useState(false);

    let airdropProof = [];
    let airdropValid = false;

    useEffect(() => {
        async function getOwnerData() {
            if(account) {
                setLoadingAirdrop(true);
                // Get owned NFTs
                const alchemyOwnerEndpoint = process.env.NEXT_PUBLIC_ENVIRONMENT === "development" ? `https://eth-rinkeby.g.alchemy.com/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}/v1/getNFTs?owner=${account}&contractAddresses%5B%5D=${airdropAddress}&refreshCache=true` : `https://eth-mainnet.g.alchemy.com/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}/v1/getNFTs?owner=${account}&contractAddresses%5B%5D=${airdropAddress}&refreshCache=true`;

                const { data } = await axios.get(alchemyOwnerEndpoint)
                let tokens = []
                if(data.ownedNfts) {
                    data.ownedNfts.map((ownedNft) => tokens.push(ownedNft.id.tokenId))
                }
                setAirdropToken(tokens)
                setLoadingAirdrop(false);
            }
        }
        getOwnerData();
    }, [account])

    const claim = async () => {

        setLoadingClaim(true);
        const result = airdropContract.methods.claim(airdropProof).send({from: account}).then((result) => {
            setLoadingClaim(false);
            setClaimSuccess(true);
            return {
                success: true,
                status: `✅ Claim Tx: https://etherscan.io/tx/` + result.transactionHash
            }
        }).catch((err) => {
            console.log("Claim transaction failed");
            setLoadingClaim(false);
            setClaimFailure(true);
            return {
                success: false,
                status: "😥 " + err.message
            }
        })

        return result;
    }

    // Airdrop claim check
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const airdropRes = useSWR(active && account ? `/api/airdropProof?address=${account}` : null, {
        fetcher, revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false });
    if (!airdropRes.error && airdropRes.data) {
        const { proof, valid } = airdropRes.data;
        airdropProof = proof;
        airdropValid = valid;
    }
    
    const RenderContent = () => {
        if (!account) {

        } else if (loadingAirdrop) {
            return (
                <div className="message">
                    <h1>Loading...</h1>
                </div>
            )
        } else if (airdropToken.length > 0) {
            return (
                <div className="message">
                    <h1>You&apos;ve already claimed your lil fren airdrop!</h1>
                    <a href="https://opensea.io/collection/thelilfrensnft">View Collection on Opensea</a>
                </div>
            )
        }  else if (airdropValid) {
            return (
                <div className="pfp">
                    <div className="left">
                        <img src="/assets/airdrop.gif"></img>
                        <div className='cropOptions'>
                            <button className="downloadButton" disabled={claimSuccess || loadingClaim} onClick={claim}>Claim Airdrop</button>
                        </div>
                        {
                            !claimSuccess && !claimFailure && loadingClaim &&
                            <h1>Pending...</h1>
                        }
                        { claimSuccess && 
                            <h1>✅  Claim transaction successful! Check your wallet!</h1>
                        }
                        { claimFailure && !claimSuccess &&
                            <h1>❌  Claim transaction failed</h1>
                        }
                        </div>
                </div>
            )
            
        } else {
            return (
                <div className="message">
                    <h1>You are not an OG Minter and ineligble for the airdrop 😥 </h1>
                    <a href="https://opensea.io/collection/thelilfrensnft">View Collection on Opensea</a>
                </div>
            )
        }
    }
    return (
        <React.Fragment>
            <div className="wallet-navbar">
                <div className="left">
                <Link href="/">
                    <a className="logo">
                        <img src="/assets/lilfrens-logo.png"></img>
                    </a>
                </Link>
                </div>
                <div className="right">
                    <Connect />
                </div>
            </div>

            
            <div className="airdropContainer">
                {!account && 
                    <div className="pfpConnect">
                        <div className="left">
                            <div>
                                <h1>Airdrop</h1>
                                <p>Claim your lil fren airdrop</p>
                                <Connect />
                            </div>
                        </div>
                        <div className="right">
                            <div className="cloudContainer">
                                {/* <img src="/assets/clouds/clouds7.png" className="selectImg"></img> */}
                                <img src="/assets/airdrop.gif" className="connectImg"></img>
                                
                            </div>
                        </div>
                    </div>                
                }
                {RenderContent()}
            </div>
            <Footer />
        </React.Fragment>
    ) 
}
