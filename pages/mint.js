import Head from 'next/head';
import MintNFT from '../components/web3/mint-nft';
import Footer from '../components/core-components/Footer';
import Connect from '../components/web3/connect';
import { useState, useEffect } from 'react';
import { contract } from './utils/_web3';
import Link from 'next/link';
import { Container } from '@mui/material';

export default function Mint() {
  
  const [totalSupply, setTotalSupply] = useState(0);

  useEffect(() => {
    async function getSupply() {
      setTotalSupply(await contract.methods.totalSupply().call());
    }

    getSupply();
  }, [])

  return (
    <div>
      <Head id="home">
        <title>mint | lil frens</title>
        <meta name="description" content="Mint your Lil Frens NFT." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mint-navbar">
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
      <div className="mint-wrapper">
        <div className="mint-box">
          <div className="left">
            <img src="/assets/Fren Cloud.png"></img>
          </div>
          <div className="right">
            <h1 className="mint-head">MINT NOW</h1>
            <p className="supplyCount">supply: {totalSupply} / 2222</p>
            
            <div className="mint-hero">
              <Container>
                <MintNFT />
              </Container>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
