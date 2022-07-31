import MainHeader from "../components/core-components/MainHeader";
import Footer from "../components/core-components/Footer";
import Accordion from "../components/core-components/Accordion";
import { useState, useEffect } from "react";
import Staking from "./staking";

const useWidth = () => {
  const [width, setWidth] = useState(1500);
  const handleResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);
  return width;
};

export default function Index() {
  const [showCollabTeam, setShowCollabTeam] = useState(false);
  const width = useWidth();

  function toggleCollabTeam() {
    setShowCollabTeam(!showCollabTeam);
  }

  return (
    <div className="home">
      <MainHeader />
      <video
        loop
        autoPlay
        muted
        src={
          width > 800 ? "/assets/herovideo.mp4" : "/assets/herovideovert.mp4"
        }
      ></video>
      <div className="aboutContainer">
        <div className="about">
          <h2>WHO ARE THE</h2>
          <h1>LIL FRENS?</h1>
          <p>
            we are the mighty lil frens set on our mission to better this space
            through our values of transparency, ownership, and responsibility.
          </p>
          <p>
            we aim to deliver the highest quality products and experiences to
            our consumers.
          </p>
          <p>
            our hope is to carry the torch forward for a better web3 & to set
            the bar higher for other projects/teams
          </p>
          <img className="image2" src="/assets/clouds/cloud4.png"></img>
        </div>
      </div>
      <div className="transition">
        <div className="one">
          <div>
            LIL SUPPLY,<br></br>BIG QUALITY
          </div>
        </div>
        <div className="two">
          <img src="/assets/rainbow.png"></img>
        </div>
        <div className="three">TRANSPARENCY. OWNERSHIP. RESPONSIBILITY.</div>
        <div className="four">
          <video loop autoPlay muted src="/assets/rotate_animation.mp4"></video>
        </div>
      </div>
      <div className="teamContainer">
        <h1>LIL TEAM</h1>
        <div className="team">
          <div className="team-member">
            <img className="team-photo" src="/assets/team/danny.png"></img>
            <h2 className="team-member-name" style={{ color: "#F53E32" }}>
              DANNY
            </h2>
            <h4 className="team-member-title">FOUNDER</h4>
            <p className="team-member-description">
              law student pursuing passions and chasing dreams in web3.{" "}
              <br></br>good to meet you fren!
            </p>
            <a
              className="team-member-link"
              href="https://twitter.com/thelilfrens"
            >
              <img src="/assets/icons/twitter-black.svg"></img>
              <span>@thelilfrens</span>
            </a>
          </div>
          <div className="team-member">
            <img className="team-photo" src="/assets/team/amine.png"></img>
            <h2 className="team-member-name" style={{ color: "#FFC328" }}>
              AMINE
            </h2>
            <h4 className="team-member-title">ARTIST</h4>
            <p className="team-member-description">
              {
                "3D Artist | VFX Artist | 100k+ TikTok | 50k IG | You've seen my work somewhere | Sculpting a frenly metaverse"
              }
            </p>
            <a
              className="team-member-link"
              href="https://twitter.com/AmineKanzari1"
            >
              <img src="/assets/icons/twitter-black.svg"></img>
              <span>@AmineKanzari1</span>
            </a>
          </div>
          <div className="team-member">
            <img className="team-photo" src="/assets/team/roland.png"></img>
            <h2 className="team-member-name" style={{ color: "#FF8E3D" }}>
              ROLAND
            </h2>
            <h4 className="team-member-title">DEVELOPER</h4>
            <p className="team-member-description">
              ex-coinbase engineer, developer for FULL SEND METACARD, mems,
              Brain Vomits Garden, and more.
            </p>
            <a
              className="team-member-link"
              href="https://twitter.com/rolandtshen"
            >
              <img src="/assets/icons/twitter-black.svg"></img>
              <span>@rolandtshen</span>
            </a>
          </div>
        </div>
        {showCollabTeam && (
          <div className="team" style={{ marginTop: "40px" }}>
            <div className="team-member">
              <img className="team-photo" src="/assets/team/alma.png"></img>
              <h2 className="team-member-name" style={{ color: "#F53E32" }}>
                ALMA
              </h2>
              <a
                className="team-member-link"
                href="https://twitter.com/paulz_a"
              >
                <img src="/assets/icons/twitter-black.svg"></img>
                <span>@paulz_a</span>
              </a>
            </div>
            <div className="team-member">
              <img className="team-photo" src="/assets/team/ironfist.png"></img>
              <h2 className="team-member-name" style={{ color: "#F53E32" }}>
                IRONFIST
              </h2>
              <a
                className="team-member-link"
                href="https://twitter.com/ironfistlol"
              >
                <img src="/assets/icons/twitter-black.svg"></img>
                <span>@ironfistlol</span>
              </a>
            </div>
            <div className="team-member">
              <img className="team-photo" src="/assets/team/niner.png"></img>
              <h2 className="team-member-name" style={{ color: "#F53E32" }}>
                NINER
              </h2>
              <a
                className="team-member-link"
                href="https://twitter.com/lijiuer1"
              >
                <img src="/assets/icons/twitter-black.svg"></img>
                <span>@lijiuer1</span>
              </a>
            </div>
            <div className="team-member">
              <img className="team-photo" src="/assets/team/xh121x.png"></img>
              <h2 className="team-member-name" style={{ color: "#F53E32" }}>
                xH121x
              </h2>
              <a className="team-member-link" href="https://twitter.com/xh121x">
                <img src="/assets/icons/twitter-black.svg"></img>
                <span>@xh121x</span>
              </a>
            </div>
            <div className="team-member">
              <img className="team-photo" src="/assets/team/kronos.png"></img>
              <h2 className="team-member-name" style={{ color: "#F53E32" }}>
                KRONOS
              </h2>
              <h4 className="team-member-title">Strategic Advisor</h4>
            </div>
          </div>
        )}
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button onClick={toggleCollabTeam} className="viewCollabTeam">
            {showCollabTeam ? "HIDE COLLAB TEAM" : "SHOW COLLAB TEAM"}
          </button>
        </div>
      </div>
      <div className="mapContainer">
        <h1>LIL MAP</h1>
        <div className="map">
          <div className="phase">
            <img src="/assets/clouds/cloud1.png"></img>
            <h1 style={{ color: "#F09CC7" }}>PHASE 1</h1>
            <p style={{ color: "#F09CC7" }}>
              2,222 lil frens are born!
              <br></br>
              stake & yield $fren
            </p>
          </div>
          <div className="phase">
            <img src="/assets/clouds/cloud2.png"></img>
            <h1 style={{ color: "#E89D9E" }}>PHASE 2</h1>
            <p style={{ color: "#E89D9E" }}>the rainbow marketplace opens!</p>
            <p style={{ color: "#E89D9E" }}>
              spend your hard earned $fren on rare traits, nfts, and exclusive
              whitelist spots
            </p>
            <p style={{ color: "#E89D9E" }}>never grind again...</p>
          </div>
          <div className="phase">
            <img src="/assets/clouds/cloud3.png"></img>
            <h1 style={{ color: "#90E481" }}>PHASE 3</h1>
            <p style={{ color: "#90E481" }}>frens evolve</p>
            <p style={{ color: "#90E481" }}>
              animations hit the rainbow marketplace
            </p>
            <p style={{ color: "#90E481" }}>
              along with a variety of new exclusive rare traits
            </p>
          </div>
          <div className="phase">
            <img src="/assets/clouds/cloud4.png"></img>
            <h1 style={{ color: "#8CC3F1" }}>PHASE 4</h1>
            <p style={{ color: "#8CC3F1" }}>lets get physical</p>
            <p style={{ color: "#8CC3F1" }}>
              designer toys & apparel available on the rainbow marketplace
            </p>
            <p style={{ color: "#8CC3F1" }}>better save up on $fren!</p>
          </div>
          <div className="phase">
            <img src="/assets/clouds/cloud5.png"></img>
            <h1 style={{ color: "#C278FF" }}>PHASE 5</h1>
            <p style={{ color: "#C278FF" }}>the lil city</p>
            <p style={{ color: "#C278FF" }}>when things get real...</p>
          </div>
        </div>
      </div>
      <div className="faqContainer">
        <div className="faq">
          <h1>FAQ</h1>
          <Accordion
            title="wen mint?"
            content={`april 27th @ 8 AM PST / 11 AM EST`}
          />
          <Accordion title="mint price?" content={`0.18 eth`} />
          <Accordion
            title="what's the max mint?"
            content={`2 lil frens per wallet.`}
          />
          <Accordion
            title="why stake?"
            content={`acquire $fren through staking, spend this brand locked token at our rainbow market place! shop for animations, rare traits, whitelist spots for exclusive projects and much much more.`}
          />
          <Accordion
            title="why the low supply?"
            content={`we've personally seen low supply projects greatly outperform high supply and as this is a community first project, it only made sense to have our supply lil at 2,222`}
          />
        </div>
      </div>
      <div className="closeContainer">
        <div className="close-cta">
          <h1>
            {"LET'S STAY "} <span style={{ color: "#FFF800" }}>FRENS</span>
          </h1>
          <h3>Follow us on Twitter!</h3>
          <a href="https://twitter.com/thelilfrens" rel="noreferrer noopener">
            Twitter
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
