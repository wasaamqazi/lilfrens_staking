import React, { useEffect, useState } from "react";
import axios from 'axios'
import Link from 'next/link';
import Connect from '../components/web3/connect'
import { useWeb3React } from '@web3-react/core';
import Footer from '../components/core-components/Footer'
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import stakingAbi from '../data/staking-abi.json';
import { alpha, styled } from '@mui/material/styles';
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

const RPC_URL = process.env.NEXT_PUBLIC_ENVIRONMENT === "development" ? process.env.NEXT_PUBLIC_ALCHEMY_RINKEBY_RPC : process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_RPC;
const web3 = createAlchemyWeb3(RPC_URL);

const stakingContract = new web3.eth.Contract(stakingAbi.abi, process.env.NEXT_PUBLIC_STAKING_ADDRESS);
// const HALF_VALUE = [300, 220, 650, 900, 0, 0, 1333, 2000]
const HEAD_VALUE = [450, 120, 1000, 1000, 0, 0, 2000, 2000]
const TORSO_VALUE = [285, 100, 1300, 1300, 0, 0, 2000, 2000]

export default function Pfp() {
    const { account, library } = useWeb3React();
    const [depositMetadata, setDepositMetadata] = useState([]);
    const [loadingMetadata, setLoadingMetadata] = useState(false);
    const [loadingStakable, setLoadingStakable] = useState(false);
    const [stakableNfts, setStakableNfts] = useState([]);
    const [pfpSize, setPfpSize] = useState('torso');
    const [pfpIndex, setPfpIndex] = useState(0);


    useEffect(() => {
        async function getOwnerData() {
            if(account) {
                setLoadingStakable(true);
                // Get owned NFTs
                const alchemyOwnerEndpoint = process.env.NEXT_PUBLIC_ENVIRONMENT === "development" ? `https://eth-rinkeby.g.alchemy.com/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}/v1/getNFTs?owner=${account}&contractAddresses%5B%5D=${process.env.NEXT_PUBLIC_NFT_ADDRESS}&refreshCache=true` : `https://eth-mainnet.g.alchemy.com/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}/v1/getNFTs?owner=${account}&contractAddresses%5B%5D=${process.env.NEXT_PUBLIC_NFT_ADDRESS}&refreshCache=true`;

                const { data } = await axios.get(alchemyOwnerEndpoint)
                let stakable = []
                if(data.ownedNfts) {
                    data.ownedNfts.map((ownedNft) => stakable.push(ownedNft.id.tokenId))
                }
                setStakableNfts(stakable)
            }
        }

        async function getStakedTokens() {
            if(account) {
                const deposits = await stakingContract.methods.depositsOf(account).call();

                if(deposits.length > 0) {
                    setLoadingMetadata(true);
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
    }, [account])

    useEffect(() => {
        if (loadingMetadata) {
            setLoadingMetadata(false)
        }
        if (loadingStakable) {
            setLoadingStakable(false)
        }
    }, [depositMetadata, stakableNfts])

    const RenderContent = () => {

        useEffect(() => {
            if (depositMetadata.length > 0) {
                cropImage()
            }

        }, [depositMetadata, pfpSize, pfpIndex])

        const handleIndexChange = (e) => {
            setPfpIndex(e.target.value)
        }

        const handlePfpChange = (e) => {
            setPfpSize(e.target.value);
        }

        const cropImage = () => {
            // Init canvas obj
            const originalImage = new Image();
            originalImage.src = depositMetadata[pfpIndex].media[0].gateway;
            
            originalImage.src = "https://lilfrens.mypinata.cloud/ipfs/QmeJP7AeFENt43WM4o8fQsjfjdSqUsZf2aRFryHD3KcMGc/" + depositMetadata[pfpIndex].id.tokenId + ".png"
            originalImage.crossOrigin="anonymous"
            originalImage.onload = () => {
                const canvas = document.getElementById('pfpCanvas');
                if (!canvas) {
                    return
                }
                const ctx = canvas.getContext('2d');
                
                const cropVal = [];
                if (pfpSize == 'torso') {
                    cropVal = [...TORSO_VALUE];
                } else {
                    cropVal = [...HEAD_VALUE]
                }

                canvas.width = cropVal[6];
                canvas.height = cropVal[7];
                ctx.drawImage(originalImage, 
                    cropVal[0], cropVal[1], cropVal[2], cropVal[3],
                    cropVal[4], cropVal[5], cropVal[6], cropVal[7]);
            }
        }

        const downloadImage = () => {
            let tempLink = document.createElement('a');

            //generate a new filename
            let fileName = depositMetadata[pfpIndex].metadata.name + `.png`;
            
            //configure the link to download the resized image
            tempLink.download = fileName;
            tempLink.href = document.getElementById('pfpCanvas').toDataURL("image/png", 1);
        
            //trigger a click on the link to start the download
            tempLink.click();
        }

        if (!account) {

        } else if (loadingMetadata || loadingStakable) {
            return (
                <div className="message">
                    <h1>Loading...</h1>
                </div>
            )
        } else if (depositMetadata.length > 0) {
            return (
                <div className="pfp">
                    <div className="left">
                        <div className="selectContainer">
                            <CustomSelect
                                id="pfp-select"
                                value={pfpIndex}
                                onChange={handleIndexChange}
                            >
                                {
                                    depositMetadata.map((fren, i) => {
                                        const url = "https://lilfrens.mypinata.cloud/ipfs/QmeJP7AeFENt43WM4o8fQsjfjdSqUsZf2aRFryHD3KcMGc/" + fren.id.tokenId + ".png"
                                        return (
                                            <CustomMenuItem value={i} key={i}>
                                                <img src={url}></img>
                                                <p className="frenName">{fren.metadata.name}</p>
                                                
                                            </CustomMenuItem>
                                        )
                                    })
                                }
                            </CustomSelect>
                        </div>
                        <canvas id="pfpCanvas"></canvas>
                        <div className="cropOptions" value={pfpSize}>
                            <button className="cropOptionButton" value='head' onClick={handlePfpChange}>Head</button>
                            <button className="cropOptionButton" value='torso' onClick={handlePfpChange}>Torso</button>
                            <button className="downloadButton" onClick={downloadImage}>Download</button>
                        </div>
                    </div>
                </div>
            )
            
        } else if (stakableNfts.length > 0) {
            return (
                <div className="message">
                    <h1>Your lil frens aren&apos;t staked. Stake now to use the PFP Tool</h1>
                    <Link href="/stake"><a className="cta">stake</a></Link>
                </div>
            )
        } else {
            return (
                <div className="message">
                    <h1>You have no lil frens</h1>
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

            
            <div className="pfpContainer">
                {!account && 
                    <div className="pfpConnect">
                        <div className="left">
                            <div>
                                <h1>PFP TOOL</h1>
                                <p>turn your lil fren into a lil pfp</p>
                                <Connect />
                            </div>
                        </div>
                        <div className="right">
                            <div className="cloudContainer">
                                <img src="/assets/clouds/cloud6.png" className="selectImg"></img>
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

const CustomMenuItem = styled(MenuItem)(({theme}) => ({
    margin: '0 auto',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',

    'img': {
        width: '50px',
        paddingRight: '5px',
        display: 'flex'
    },

    '.frenName': {
        display: 'flex',
    },
}))

const CustomSelect = styled(Select)(({ theme }) => ({
    margin: `0 auto`,
    width: 200,
    padding: `0px 1px`,
    textAlign: 'left',
    backgroundColor: 'white',
    '& .MuiSelect-select': {
        padding: `10px 10px`,
        border:  'none',
        borderBottom: '2px solid black',
        'img': {
            width: '50px',
            paddingRight: '10px'
        },
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'row',
    },

    'img': {
        width: '20px'
    },

    
}));