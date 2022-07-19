import { useWeb3React } from '@web3-react/core';
import Connect from "../../components/web3/connect";

const MintNFTCard = ({ action, canMint, numToMint, setNumToMint, mintStatus, totalSupply }) => {

  const { active, account } = useWeb3React();

  const decrementNumber = () => {
    if(numToMint > 1) {
      setNumToMint(numToMint - 1);
    } 
  }

  const incrementNumber = () => {
    if(numToMint < 2) {
      setNumToMint(numToMint + 1);
    }
  }

  return (
    <div className="mintSection">
      <div className="mintNumber">
        <span className="mintLabel">QUANTITY</span>
        <button className="numControl" onClick={decrementNumber}>-</button>
        <input className="numMint" value={numToMint} type="number" label="number to mint" />
        <button className="numControl" onClick={incrementNumber}>+</button>
      </div>

      <div className="mintPrice">
        <span className="mintLabel">PRICE</span>
        <span className="price">0.18 ETH</span>
      </div>
      
      {active && account ?
        <button className="mintButton" disabled={!canMint} onClick={action} variant="contained">Mint</button>
        :
        <Connect />
      }
      <p className="disclaimer">Max 2 mints per wallet.</p>
    </div>
  );
}

export default MintNFTCard;