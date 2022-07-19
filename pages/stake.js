import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MainHeader from '../components/core-components/MainHeader'
import Link from 'next/link';
import Footer from '../components/core-components/Footer'
import { useWeb3React } from '@web3-react/core';
import Connect from '../components/web3/connect'
import { render } from 'react-dom';
import nftContractAbi from '../data/abi.json';
import stakingAbi from '../data/staking-abi.json';
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
import { ethers } from 'ethers';
import { ConstructionOutlined } from '@mui/icons-material';

const RPC_URL = process.env.NEXT_PUBLIC_ENVIRONMENT === "development" ? process.env.NEXT_PUBLIC_ALCHEMY_RINKEBY_RPC : process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_RPC;
const web3 = createAlchemyWeb3(RPC_URL);

const nftContract = new web3.eth.Contract(nftContractAbi.abi, process.env.NEXT_PUBLIC_NFT_ADDRESS);
const stakingContract = new web3.eth.Contract(stakingAbi.abi, process.env.NEXT_PUBLIC_STAKING_ADDRESS);

export default function Stake() {

    const { account, library } = useWeb3React();
    const [ownedNfts, setOwnedNfts] = useState([])
    const [stakableNfts, setStakableNfts] = useState([])
    const [error, setError] = useState(null)
    const [loadingStake, setLoadingStake] = useState(false)
    const [loadingUnstake, setLoadingUnstake] = useState(false)
    const [availableRewards, setAvailableRewards] = useState(0)
    const [deposits, setDeposits] = useState([])
    const [depositMetadata, setDepositMetadata] = useState([])

    async function findLastStakingTx() {
        //find when deposited
        const { data } = await axios.get(`https://api.covalenthq.com/v1/1/address/${account}/transactions_v2/?key=${process.env.NEXT_PUBLIC_COVALENT_KEY}`)
        
        function isDeposit(item) {
            if(!item) {
                return false
            }

            return item["log_events"][0]["decoded"]["params"][1]["value"] == process.env.NEXT_PUBLIC_STAKING_ADDRESS.toLowerCase()
        }

        var stakingTransactions = data.data.items.filter(item => item["to_address"].toLowerCase() == process.env.NEXT_PUBLIC_STAKING_ADDRESS.toLowerCase())

        let isLastTxDeposit = isDeposit(stakingTransactions[0])

        return {
            isLastTxDeposit: isLastTxDeposit, 
            lastTransaction: stakingTransactions[0]
        }
    }

    useEffect(() => {
        async function getOwnerData() {
            if(account) {
                // Get owned NFTs
                const alchemyOwnerEndpoint = process.env.NEXT_PUBLIC_ENVIRONMENT === "development" ? `https://eth-rinkeby.g.alchemy.com/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}/v1/getNFTs?owner=${account}&contractAddresses%5B%5D=${process.env.NEXT_PUBLIC_NFT_ADDRESS}&refreshCache=true` : `https://eth-mainnet.g.alchemy.com/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}/v1/getNFTs?owner=${account}&contractAddresses%5B%5D=${process.env.NEXT_PUBLIC_NFT_ADDRESS}&refreshCache=true`;

                const { data } = await axios.get(alchemyOwnerEndpoint)
                let stakable = []
                if(data.ownedNfts) {
                    setOwnedNfts(data.ownedNfts)
                    data.ownedNfts.map((ownedNft) => stakable.push(ownedNft.id.tokenId))
                }
                setStakableNfts(stakable)
            }
        }
        
        async function getStakedTokens() {
            if(account) {
                const deposits = await stakingContract.methods.depositsOf(account).call();
                setDeposits(deposits)

                if(deposits.length > 0) {
                    const allDepositMetadata = []
                    for(var i = 0; i < deposits.length; i++) {
                        const { data } = await axios.get(`https://eth-${process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? "mainnet" : "rinkeby"}.g.alchemy.com/v2/8OLXudYP0uKxrvR8PifKb0Dn_8UMEua_/getNFTMetadata?contractAddress=${process.env.NEXT_PUBLIC_NFT_ADDRESS}&tokenId=${deposits[i]}&tokenType=erc721`);
                        allDepositMetadata.push(data)
                    }
                    setDepositMetadata(allDepositMetadata)
                }
            }
        }

        getOwnerData();
        getStakedTokens();
    }, [account, loadingStake, loadingUnstake])

    useEffect(() => {
        async function getUnclaimedRewards() {
            const RATE = 833333333333333;
            if(account) {
                // use depositMetadata to get all tokenIds deposited
                var depositedTokenIds = []
                for(var i = 0; i < depositMetadata.length; i++) {
                    depositedTokenIds.push(depositMetadata[i].id.tokenId);
                }
                const rewards = await stakingContract.methods.calculateRewards(account, depositedTokenIds).call();
                
                let depositBlock = 0;
                let { isLastTxDeposit, lastTransaction } = await findLastStakingTx();

                if(isLastTxDeposit && lastTransaction) {
                    depositBlock = lastTransaction["block_height"]
                }

                if(depositBlock != 0) {
                    // calculate rewards by block
                    let totalRewards = ethers.utils.parseEther("0");
                    for(var i = 0; i < rewards.length; i++) {
                        const reward = ethers.utils.parseEther(rewards[i])
                        totalRewards = totalRewards.add(reward)
                    }

                    const blockDiff = Math.abs(await web3.eth.getBlockNumber() - depositBlock)
                    setAvailableRewards(ethers.utils.formatEther(totalRewards) / RATE / blockDiff)
                }
            }
        }
        getUnclaimedRewards();
    }, [depositMetadata])


    async function isApprovedForAll() {
        const isApproved = await nftContract.methods.isApprovedForAll(account, process.env.NEXT_PUBLIC_STAKING_ADDRESS).call();
        console.log(isApproved)
        return isApproved
    }

    const stake = async () => {
        // check if approved
        const isApproved = await isApprovedForAll();
        if(!isApproved) {
            // first need to set approval for all
            setLoadingStake(true)
            const approvalTx = await nftContract.methods.setApprovalForAll(process.env.NEXT_PUBLIC_STAKING_ADDRESS, true).send({ from: account });
            console.log(approvalTx)
        }

        setLoadingStake(true)
        const result = stakingContract.methods.deposit(stakableNfts).send({ from: account }).then((result) => {
            setLoadingStake(false)
            return {
                success: true,
                status: `✅ Staked Tx: https://etherscan.io/tx/` + result.transactionHash
            };
        }).catch((err) => {
            console.log("Stake transaction failed!");
            setLoadingStake(false)
            return {
                success: false,
                status: "😥 " + err.message
            }
        });

        return result;
    }

    const unstake = async () => {

        // check if approved
        const isApproved = await isApprovedForAll();
        if(!isApproved) {
            // first need to set approval for all
            setLoadingUnstake(true)
            const approvalTx = await nftContract.methods.setApprovalForAll(process.env.NEXT_PUBLIC_STAKING_ADDRESS, true);
        }

        setLoadingUnstake(true)
        // get all tokens first
        const result = stakingContract.methods.withdraw(deposits).send({ from: account }).then((result) => {
            setLoadingUnstake(false)
            return {
                success: true,
                status: `✅ Staked Tx: https://etherscan.io/tx/` + result.transactionHash
            };
        }).catch((err) => {
            setLoadingUnstake(false)
            console.log("Stake transaction failed!");
            return {
                success: false,
                status: "😥 " + err.message
            }
        });

        return result;
    }

    const updateDeposits = (e) => {
        var tokenId = e.target.value
        const idx = deposits.indexOf(tokenId)
        var temp = [...deposits]

        if(idx > -1) {
            temp.splice(idx, 1);
            console.log(temp)
        }
        else {
            //add it back
            temp.push(tokenId)
        }
        setDeposits(temp)
    }

    const updateStakableNfts = (e) => {
        var tokenId = e.target.value
        const idx = stakableNfts.indexOf(tokenId)
        var temp = [...stakableNfts]

        if(idx > -1) {
            temp.splice(idx, 1);
        }
        else {
            //add it back
            temp.push(tokenId)
        }
        setStakableNfts(temp)
    }

    const renderContent = () => {
        if(!account) {
            return (
                <div>
                    <Connect />
                </div>
            )
        }
        else {
            return (
                <div className="stake">
                    <div className="stats">
                        <div className="stat">
                            <div className="number">{depositMetadata.length}</div>
                            <div className="name">frens staked</div>
                        </div>
                        <div className="stat">
                            <div className="number">{(availableRewards).toFixed(2)}</div>
                            <div className="name">accumulated $FREN</div>
                            <span className="loader"></span>
                        </div>
                    </div>

                    {ownedNfts.length > 0 &&
                        <div className="stakeArea">
                            <h2>STAKE</h2>
                            <p>select which frens to stake</p>
                            <div className="stakable">
                                {ownedNfts.map((ownedNft, idx) => {
                                    var img = 'https://lilfrens.mypinata.cloud/ipfs/QmeJP7AeFENt43WM4o8fQsjfjdSqUsZf2aRFryHD3KcMGc/' + ownedNft.id.tokenId.slice(-1) + '.png'
                                    return (
                                        <div key={idx} className="stakeSelect">
                                            <img src={img}></img>
                                            <input defaultChecked type="checkbox" value={ownedNft.id.tokenId} onChange={updateStakableNfts}></input>
                                            <label>{ownedNft.metadata.name}</label>
                                        </div>
                                    )
                                })}
                            </div>
                            <button className="stakeButton" onClick={stake}>{loadingStake ? "STAKING..." : "STAKE YOUR FREN(s)"}</button>
                            <div className="availableToStake">{ownedNfts.length} frens available to stake</div>
                        </div>
                    }
                    {depositMetadata.length > 0 &&
                        <div className="stakeArea">
                            <h2>UNSTAKE</h2>
                            <p>select which frens to unstake</p>
                            <div className="stakable">
                                {depositMetadata.map((deposit, idx) => {
                                    var img = 'https://lilfrens.mypinata.cloud/ipfs/QmeJP7AeFENt43WM4o8fQsjfjdSqUsZf2aRFryHD3KcMGc/' + deposit.id.tokenId + '.png'
                                    return (
                                        <div key={idx} className="stakeSelect">
                                            <img src={img}></img>
                                            <input defaultChecked type="checkbox" value={deposit.id.tokenId} onChange={updateDeposits}></input>
                                            <label>{deposit.metadata.name}</label>
                                        </div>
                                    )
                                })}
                            </div>
                            <button className="unstakeButton" onClick={unstake}>{loadingUnstake ? "UNSTAKING..." : "UNSTAKE YOUR FREN(s)"}</button>
                        </div>
                    }
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
            <div className="stakingContainer">
                <div className="staking">
                    <div className="left">
                        <img src="/assets/stakingGraphic.png"></img>
                    </div>
                    <div className="right">
                        <div>
                            <h1>STAKE YOUR FRENS</h1>
                            <p>stake your frens and start earning $FREN tokens to unlock rewards on the Rainbow Marketplace.</p>
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}