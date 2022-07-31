import Link from "next/link";

const staking = () => {
  return (
    <>
      <header id="lilheader">
        <div className="container">
          <div className="row">
            <div className="col-sm-4 col-4">
              <img className="loogo" src="../assets/lilfrens-logo.png" alt="" />
            </div>
            <div className="col-sm-8 col-8">
              <ul className="navigations">
                <li>
                  <Link href="#">
                    <a className="navs-link"> stake</a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a className="navs-link"> pfp</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <div className="containerS">
        <img
          className="img-fluid stakebanner"
          src="../assets/stakebanner.webp"
          alt=""
        />

        <div className="centered">
          <h2 className="staking-title ">Stake your frens</h2>
          <h5 className="staking-p ">
            Stake your frens and start earning $FREN token to unlock rewards on
            the rainbow marketplace
          </h5>

          <div className="btn-wrapper-c-wallet ">
            <button className="connect-wallet">Connect Wallet</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default staking;
