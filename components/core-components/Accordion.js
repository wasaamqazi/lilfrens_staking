import React, { useState, useRef } from "react";

function Accordion(props) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [iconUrl, setIconUrl] = useState(false)

  const content = useRef(null);
  const [style, setStyle] = useState({})
  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
    setIconUrl(!iconUrl);
  }

  return (
    <div className="accordion__section" style={style}>
      <button className={`accordion ${setActive}`} style={style} onClick={toggleAccordion}>
        <span className="accordion__title">{props.title}</span>
        <img className="plus" src={iconUrl ? "/assets/minus.svg" : "/assets/plus.svg"} />
      </button>
      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
        className="accordion__content"
      >
        <div
          className="accordion__text"
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      </div>
    </div>
  );
}

export default Accordion;