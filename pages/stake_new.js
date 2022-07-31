import Link from "next/link";
const stakenew = () => {
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
      <div className="staking-bg">
        <section className="stake-title-main">
          <div className="container">
            <div className="row">
              <h2 className="staking-title changecolor">Stake Your Frens</h2>
              <h5 className="staking-p ">
                Stake your frens and start earning $FREN token to unlock rewards
                on the rainbow marketplace
              </h5>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <h3 className="frens-staked-black">0</h3>
                <h3 className="frens-staked">Frens Staked</h3>
              </div>
              <div className="col-sm-6">
                <h3 className="frens-staked-black">0</h3>
                <h3 className="frens-staked">Frens Staked</h3>
              </div>
            </div>
          </div>
        </section>

        <section className="stake-area">
          <div className="container">
            <div className="row">
              <div className="stake-b-rect">
                <h2 className="stake-tit">Stake</h2>
                <p className="text321">Select which frens to stake</p>

                <div className="cards-wrap">
                  <div className="single-card">
                    <img
                      className="card-image"
                      src="../assets/stakechar.png"
                      alt=""
                    />

                    <div className="text-chkbox">
                      <input type="checkbox" />
                      <label className="card-tit">Lil Fren #1</label>
                    </div>
                  </div>
                  <div className="single-card">
                    <img
                      className="card-image"
                      src="../assets/stakechar.png"
                      alt=""
                    />

                    <div className="text-chkbox">
                      <input type="checkbox" />
                      <label className="card-tit">Lil Fren #1</label>
                    </div>
                  </div>
                  <div className="single-card">
                    <img
                      className="card-image"
                      src="../assets/stakechar.png"
                      alt=""
                    />

                    <div className="text-chkbox">
                      <input type="checkbox" />
                      <label className="card-tit">Lil Fren #1</label>
                    </div>
                  </div>
                  <div className="single-card">
                    <img
                      className="card-image"
                      src="../assets/stakechar.png"
                      alt=""
                    />

                    <div className="text-chkbox">
                      <input type="checkbox" />
                      <label className="card-tit">Lil Fren #1</label>
                    </div>
                  </div>
                  <div className="single-card">
                    <img
                      className="card-image"
                      src="../assets/stakechar.png"
                      alt=""
                    />

                    <div className="text-chkbox">
                      <input type="checkbox" />
                      <label className="card-tit">Lil Fren #1</label>
                    </div>
                  </div>
                  <div className="single-card">
                    <img
                      className="card-image"
                      src="../assets/stakechar.png"
                      alt=""
                    />

                    <div className="text-chkbox">
                      <input type="checkbox" />
                      <label className="card-tit">Lil Fren #1</label>
                    </div>
                  </div>
                  <div className="single-card">
                    <img
                      className="card-image"
                      src="../assets/stakechar.png"
                      alt=""
                    />

                    <div className="text-chkbox">
                      <input type="checkbox" />
                      <label className="card-tit">Lil Fren #1</label>
                    </div>
                  </div>
                  <div className="single-card">
                    <img
                      className="card-image"
                      src="../assets/stakechar.png"
                      alt=""
                    />

                    <div className="text-chkbox">
                      <input type="checkbox" />
                      <label className="card-tit">Lil Fren #1</label>
                    </div>
                  </div>
                  <div className="single-card">
                    <img
                      className="card-image"
                      src="../assets/stakechar.png"
                      alt=""
                    />

                    <div className="text-chkbox">
                      <input type="checkbox" />
                      <label className="card-tit">Lil Fren #1</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="btn-wrap">
                <button className="stakebtn"> stake your fren (s)</button>
              </div>
              <p style={{ color: "#000" }} className="text321">
                11 Frens Available To Satke
              </p>
            </div>
          </div>
        </section>

        <section className="unstake-area">
          <div className="container">
            <div className="row">
              <div className="stake-b-rect">
                <h2 className="stake-tit">unStake</h2>
                <p className="text321">Select which frens to stake</p>

                <div className="cards-wrap">
                  <div className="single-card">
                    <img
                      className="card-image"
                      src="../assets/stakechar.png"
                      alt=""
                    />

                    <div className="text-chkbox">
                      <input type="checkbox" />
                      <label className="card-tit">Lil Fren #1</label>
                    </div>
                  </div>

                  <div className="single-card">
                    <img
                      className="card-image"
                      src="../assets/stakechar.png"
                      alt=""
                    />

                    <div className="text-chkbox">
                      <input type="checkbox" />
                      <label className="card-tit">Lil Fren #1</label>
                    </div>
                  </div>

                  <div className="single-card">
                    <img
                      className="card-image"
                      src="../assets/stakechar.png"
                      alt=""
                    />

                    <div className="text-chkbox">
                      <input type="checkbox" />
                      <label className="card-tit">Lil Fren #1</label>
                    </div>
                  </div>

                  <div className="single-card">
                    <img
                      className="card-image"
                      src="../assets/stakechar.png"
                      alt=""
                    />

                    <div className="text-chkbox">
                      <input type="checkbox" />
                      <label className="card-tit">Lil Fren #1</label>
                    </div>
                  </div>
                  <div className="single-card">
                    <img
                      className="card-image"
                      src="../assets/stakechar.png"
                      alt=""
                    />

                    <div className="text-chkbox">
                      <input type="checkbox" />
                      <label className="card-tit">Lil Fren #1</label>
                    </div>
                  </div>

                  <div className="single-card">
                    <img
                      className="card-image"
                      src="../assets/stakechar.png"
                      alt=""
                    />

                    <div className="text-chkbox">
                      <input type="checkbox" />
                      <label className="card-tit">Lil Fren #1</label>
                    </div>
                  </div>

                  <div className="single-card">
                    <img
                      className="card-image"
                      src="../assets/stakechar.png"
                      alt=""
                    />

                    <div className="text-chkbox">
                      <input type="checkbox" />
                      <label className="card-tit">Lil Fren #1</label>
                    </div>
                  </div>

                  <div className="single-card">
                    <img
                      className="card-image"
                      src="../assets/stakechar.png"
                      alt=""
                    />

                    <div className="text-chkbox">
                      <input type="checkbox" />
                      <label className="card-tit">Lil Fren #1</label>
                    </div>
                  </div>

                  <div className="single-card">
                    <img
                      className="card-image"
                      src="../assets/stakechar.png"
                      alt=""
                    />

                    <div className="text-chkbox">
                      <input type="checkbox" />
                      <label className="card-tit">Lil Fren #1</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="btn-wrap">
                <button className="stakebtn"> unstake your fren (s)</button>
              </div>
              <p style={{ color: "#000" }} className="text321">
                11 Frens Available To unsatke
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default stakenew;
