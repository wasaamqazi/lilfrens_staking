import { Grid, Stack } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { mintPublic, mintWhitelist, contract } from '../../pages/utils/_web3';
import MintNFTCard from './mint-nft-card';
import useSWR from 'swr';
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

const NFT_ADDRESS = process.env.NEXT_PUBLIC_NFT_ADDRESS;
const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;
const ALCHEMY_MAINNET_URL = process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_RPC;
const ALCHEMY_RINKEBY_URL = process.env.NEXT_PUBLIC_ALCHEMY_RINKEBY_RPC;
const RPC_URL = ENVIRONMENT === "development" ? ALCHEMY_RINKEBY_URL : ALCHEMY_MAINNET_URL;

const MintNFT = () => {
  const web3 = createAlchemyWeb3(RPC_URL);
  
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { active, account, chainId } = useWeb3React();

  const [whitelistMintStatus, setWhitelistMintStatus] = useState();
  const [publicMintStatus, setPublicMintStatus] = useState();

  const [numToMint, setNumToMint] = useState(1);

  const [isPresaleActive, setIsPresaleActive] = useState(false);
  const [isMainSaleActive, setIsMainSaleActive] = useState(false);

  let whitelistProof = [];
  let whitelistValid = false;
  const whitelistRes = useSWR(active && account ? `/api/whitelistProof?address=${account}` : null, {
    fetcher, revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false });
  if (!whitelistRes.error && whitelistRes.data) {
    const { proof, valid } = whitelistRes.data;
    whitelistProof = proof;
    whitelistValid = valid;
  }

  useEffect(() => {
    async function getSaleStatus() {
      setIsPresaleActive(await contract.methods.isAllowListActive().call())
      setIsMainSaleActive(await contract.methods.isMainSaleActive().call());
    }

    getSaleStatus();
  }, []);

  const onMintWhitelist = async () => {
    const { success, status } = await mintWhitelist(account, whitelistProof, numToMint);
    setWhitelistMintStatus(status);
  };

  const onPublicMint = async () => {
    const { success, status } = await mintPublic(account, numToMint);
    setPublicMintStatus(status);
  };

  return (
    <>
      <Stack id="demo">
        {active && isPresaleActive && !isMainSaleActive && 
          <h2 className="mint-banner">{whitelistMintStatus ? whitelistMintStatus : `Presale Active. You are ${whitelistValid ? "" : "not"} whitelisted`}</h2>
        }
        {active && !isPresaleActive && isMainSaleActive && 
          <h2 className="mint-banner">{publicMintStatus ? publicMintStatus : "Public Sale Active"}</h2>
        }
        <div>
          <Grid item>
            {isPresaleActive && !isMainSaleActive &&
              <MintNFTCard
                title={'Whitelist Mint'}
                canMint={whitelistValid}
                numToMint={numToMint}
                setNumToMint={setNumToMint}
                mintStatus={whitelistMintStatus}
                action={onMintWhitelist}
              />
            }
            {!isPresaleActive && isMainSaleActive &&
              <MintNFTCard
                title={'Public Mint'}
                canMint={active}
                mintStatus={publicMintStatus}
                numToMint={numToMint}
                setNumToMint={setNumToMint}
                action={onPublicMint}
              />
            }
          </Grid>
        </div>
      </Stack>
    </>
  );
}

export default MintNFT;