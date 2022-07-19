import axios from 'axios'
import React, { useState } from 'react'
import MainHeader from '../components/core-components/MainHeader'
import Link from 'next/link';
import Footer from '../components/core-components/Footer'

export default function Frenslist() {

    const [address, setAddress] = useState("")
    const [checkState, setCheckState] = useState(null)
    const [error, setError] = useState(null)

    async function checkFrenslist() {
        if(!address) {
            setError("Enter a valid wallet address")
        }
        const { data } = await axios.get(`/api/whitelistProof?address=${address}`)
        console.log(data)
        setCheckState(data.valid)
    }

    const onChange = (event) => {
        setAddress(event.target.value);
    };
    

    return (
        <React.Fragment>
             {/* <Link href="/">
                <a className="logo" style={{position: "absolute", height: "40px", top: "10px", left: "10px"}}>
                    <img style={{ height: "40px" }} src="/assets/lilfrens-logo.png"></img>
                </a>
            </Link> */}
            <MainHeader />
            <div className="frenslistCheckContainer">
                <div className="frenslistCheck">
                    <div className="left">
                        <img src="/assets/Fren Cloud_2.png"></img>
                    </div>
                    <div className="right">
                        <div>
                            <h1>FRENSLIST CHECKER</h1>
                            <p>Enter your address and check if you are on the frenslist!</p>
                            <div className="submit">
                                <input placeholder="Input your wallet address" value={address} onChange={onChange} />
                                <button onClick={checkFrenslist}>{">"}</button>
                            </div>
                            {checkState === true &&
                                <div className="checkState">
                                    ✅ this address is on the frenslist!
                                </div>
                            }
                            {checkState === false &&
                                <div className="checkState">
                                    ⛔️ this address could not be found on the frenslist
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}