import React, { useState } from "react";
import cssStyle from "./KeyBinding.module.css";
import { FaKeyboard } from "react-icons/fa";
import { connect } from "react-redux";
import { actionFact } from "../../Store/store";

const Containerconstructor = connect((store) => ({ editorKeyBinding: store.editorKeyBinding }),
  {
    setBinding: actionFact.setBinding
  })

const KeyBinding = Containerconstructor((props) => {
  const [displayFlag, flagUpdater] = useState(false);
  let selectedBinding = props.editorKeyBinding;
  const wrapperStyleObj = {
    display: (displayFlag)? "block" : "none",
  }

  return (
    <div className={cssStyle.kbContainer}>
      <div
        className={cssStyle.kbIcon}
        onClick={(event) => flagUpdater(!displayFlag)}>
        <FaKeyboard/>
      </div>
      <div style={wrapperStyleObj}>
        <button
          style={(selectedBinding === "emacs")? {color: "rgb(255, 128, 128)"} : {color: "rgb(200, 200, 200)"}}
          className ={cssStyle.kbTextEditor}
          onClick={(event) => {
            flagUpdater(!displayFlag);
            props.setBinding("emacs");
          }}> Emacs </button>
        <button
          style={(selectedBinding === "sublime")? {color: "rgb(255, 128, 128)"} : {color: "rgb(200, 200, 200)"}}
          className={cssStyle.kbTextEditor}
          onClick={(event) => {
            flagUpdater(!displayFlag);
            props.setBinding("sublime");
          }}> Sublime Text </button>
        <button
          style={(selectedBinding === "vim")? {color: "rgb(255, 128, 128)"} : {color: "rgb(200, 200, 200)"}}
          className={cssStyle.kbTextEditor}
          onClick={(event) => {
            props.setBinding("vim");
            flagUpdater(!displayFlag);
          }}> Vim </button>
      </div>
    </div>
  )
})

export default KeyBinding;

