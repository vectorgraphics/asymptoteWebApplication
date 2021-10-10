import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { feActionCreator, flActionCreator } from "../../../../../store/funcSubModule";
import { idSelector, fIdSelector, funcEntitiesSelector, funcListSelector } from "../../../../../store/selectors";
import { makeStyles, TextField, Checkbox } from "@material-ui/core";
import { isValidName } from "../../../../../utils/validators"

const intUseStyle = makeStyles((theme) => ({
  cont: {
    flex: "0 1 auto",
    height: "6.5rem",
    marginBottom: "1rem",
    borderRadius: "4px",
    display: "grid",
    gridTemplateRows: "0.5rem 5.5rem 0.5rem",
    gridTemplateColumns: "0.5rem 1fr 0.5rem 1rem 0.5rem",
    border: "2px solid darkgrey",
  },
  functionEntry: {
    height: "5.5rem",
    gridRow: "2/3",
    gridColumn: "2/3",
    display: "grid",
    gridTemplateRows: "2.5rem 0.25rem 2.5rem",
  },
  checkBox: {
    gridRow: "2/3",
    gridColumn: "4/5",
  },
  root: {
    minWidth: "1rem",
    maxWidth: "1rem",
    margin: 0,
    padding: 0,
    borderRadius: 0,
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "transparent !important",
    }
  },
  input: {
    "&:hover": {
      backgroundColor: "transparent",
    }
  },
  firstRow: {
    display: "grid",
    minHeight: "2.5rem",
    maxHeight: "2.5rem",
    gridRow: "1/2",
    gridTemplateColumns: "4rem 0.25rem 1.5rem 0.25rem 5rem 0.5rem 1fr",
  },
  secondRow: {
    display: "grid",
    minHeight: "2.5rem",
    maxHeight: "2.5rem",
    gridRow: "3/4",
    gridTemplateColumns: "4rem 0.25rem 1.5rem 0.25rem 0.5rem 1fr",
  },
  funcName: {
    minWidth: "4rem",
    maxWidth: "4rem",
    gridColumn: "1/2",
  },
  colon: {
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "1.5rem",
    maxWidth: "1.5rem",
    minHeight: "2.5rem",
    maxHeight: "2.5rem",
    gridColumn: "3/4",
    // border: "1px solid blue",
  },
  colonSVG: {
    flex: "1 1 auto",
    margin: 0,
    padding: 0,
  },
  latexBox: {
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "5rem",
    maxWidth: "5rem",
    gridColumn: "5/6",
    // border: "1px solid blue",
  },
  latexBoxSVG: {
    flex: "1 1 auto",
    margin: 0,
    padding: 0,
  },
  intervalBox: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    paddingLeft: "1rem",
    gridColumn: "7/8",
    // border: "1px solid blue",
  },
  letterBox: {
    minWidth: "2rem",
    maxWidth: "2rem",
  },
  letterTextField: {
    flex: "1 1 auto",
    minWidth: "5rem",
  },
  variable: {
    minWidth: "4rem",
    maxWidth: "4rem",
    gridColumn: "1/2",
  },
  mappingSign: {
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "1.5rem",
    maxWidth: "1.5rem",
    gridColumn: "3/4",
    // border: "1px solid blue",
  },
  mappingSignSVG: {
    flex: "1 1 auto",
    margin: 0,
    padding: 0,
  },
  funcFormula: {
    gridColumn: "5/7",
    // border: "1px solid red",
  },
}))

export function FunctionItem({
    item="f1", isChecked=false, onClick=() => {}, errorsReset=() => {},
    renderObj={}, setRenderObj=() => {},
    reRenderCount=0, setReRenderCount=() => {},
    ...props
  }) {
  const locClasses = intUseStyle(props);
  const [funcNameErr, setFuncNameErr] = useState(false);
  const [varNameErr, setVarNameErr]   = useState(false);
  const [lBoundErr, setLBoundErr]     = useState(false);
  const [uBoundErr, setUBoundErr]     = useState(false);

  const id = useSelector(idSelector);
  const fId = useSelector(fIdSelector);
  const funcEntities = useSelector(funcEntitiesSelector);
  const functionsOrder = funcEntities[id].functionsOrder;
  const funcList = useSelector(funcListSelector);
  const dispatch = useDispatch();

  const variableName = funcEntities[id].variableName;
  const {funcName, lBound, uBound, funcFormula, isDrawn} = funcList[id][item];

  const clearErrorsOut = () => {
    setFuncNameErr(false);
    setLBoundErr(false);
    setVarNameErr(false);
    setLBoundErr(false);
    setUBoundErr(false);
  }

  const funcDataObj = funcList[id];
  const conflictObj = {};

  useEffect(() => (errorsReset.fId === item)? clearErrorsOut(): () => {}, [errorsReset]);
  useEffect(() => {
    for (const element of functionsOrder) {
      if (element !== item && funcDataObj[element].funcName !== "") {
        if (funcDataObj[element].funcName === funcName) {
          conflictObj[element] = funcDataObj[element].funcName;
        }
      }
    }
    if (Object.keys(conflictObj).length > 0) {
      setFuncNameErr(true);
      const fIdToExclude = Object.keys(conflictObj);
      for (const element of fIdToExclude) {
        delete renderObj[element];
      }
      delete renderObj[item];
    } else {
      setFuncNameErr(false);
      const locObj = {};
      for (const element of functionsOrder) {
        if (funcDataObj[element].funcName.trim() !== "" && funcDataObj[element].lBound !== "" && funcDataObj[element].uBound !== "" && funcDataObj[element].isDrawn) {
          locObj[element] = element;
        } else {
          delete renderObj[element];
        }
      }
      setRenderObj({...renderObj, ...locObj});
    }
    // console.log("item:", item);
    // console.log("confObj:", confObj);
    // console.log("------------------------");
  }, [reRenderCount]);

  return (
    <div
      className={locClasses.cont}
      style={(isChecked)? {borderColor: "blue"}: {}}
      onClick={(isChecked)? null: onClick}
    >
      <div className={locClasses.functionEntry}>
        <div className={locClasses.firstRow}>
          <TextField
            className={locClasses.funcName} size="small" variant="outlined" value={funcName}
            onChange={(event) => {
              dispatch(flActionCreator.updateFunction(id, fId, "funcName", event.target.value.trim()));
              setReRenderCount(reRenderCount + 1);
              setFuncNameErr(event.target.value.trim() === "" || !isValidName(event.target.value.trim()));
            }}
            onFocus={(event) => {
              if (event.target.value.trim() === "") {
                setFuncNameErr(true);
              }
            }}
            onBlur={(event) => {
              if (event.target.value.trim() === "") {
                setFuncNameErr(true);
              }
            }}
            error={funcNameErr}
          />
          <div className={locClasses.colon}> <Colon classes={locClasses.colonSVG}/> </div>
          <div className={locClasses.latexBox}> <LatexBox classes={locClasses.latexBoxSVG}/> </div>
          <div className={locClasses.intervalBox}>
            <div> <LetterA classes={locClasses.letterBox}/> </div>
            <TextField
              className={locClasses.letterTextField} size="small" variant="outlined" value={lBound}
              onChange={(event) => {
                dispatch(flActionCreator.updateFunction(id, fId, "lBound", event.target.value));
                setReRenderCount(reRenderCount + 1);
              }}
              onBlur={(event) => (lBound === "")? setLBoundErr(true): setLBoundErr(false)}
              error={lBoundErr}
            />
            <div> <LetterB classes={locClasses.letterBox}/> </div>
            <TextField
              className={locClasses.letterTextField} size="small" variant="outlined" value={uBound}
              onChange={(event) => {
                dispatch(flActionCreator.updateFunction(id, fId, "uBound", event.target.value));
                setReRenderCount(reRenderCount + 1);
              }}
              onBlur={(event) => (uBound === "")? setUBoundErr(true): setUBoundErr(false)}
              error={uBoundErr}
            />
          </div>
        </div>
        <div className={locClasses.secondRow}>
          <TextField
            className={locClasses.variable} size="small" variant="outlined" value={variableName}
            disabled={functionsOrder.findIndex((element) => element === item) !== 0}
            onChange={(event) => dispatch(feActionCreator.setVariableName(id, event.target.value))}
            onBlur={(event) => isValidName(variableName)? setVarNameErr(false): setVarNameErr(true)}
            error={varNameErr}
          />
          <div className={locClasses.mappingSign}> <Mapsto classes={locClasses.mappingSignSVG}/> </div>
          <TextField
            className={locClasses.funcFormula} size="small" variant="outlined" value={funcFormula}
            onChange={(event) => dispatch(flActionCreator.updateFunction(id, fId, "funcFormula", event.target.value))}
          />
        </div>
      </div>
      <Checkbox
        className={locClasses.checkBox} classes={{root: locClasses.root}}
        disableRipple={true} disableFocusRipple={true} checked={isDrawn} size="small" color="primary"
        onChange={(event) => {
          dispatch(flActionCreator.updateFunction(id, item, "isDrawn", !isDrawn));
          setReRenderCount(reRenderCount + 1);
        }}
      />
    </div>
  )
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       Internal Components
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function Colon({classes={}, ...props}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="5.032px" viewBox="0 -430 278 430">
      <defs>
        <path id="MJX-25-TEX-N-3A" d="M78 370Q78 394 95 412T138 430Q162 430 180 414T199 371Q199 346 182
          328T139 310T96 327T78 370ZM78 60Q78 84 95 102T138 120Q162 120 180 104T199 61Q199 36 182 18T139
          0T96 17T78 60Z">
        </path>
      </defs>
      <g stroke="currentColor" fill="currentColor" transform="matrix(1 0 0 -1 0 0)">
        <g data-mml-node="math">
          <g data-mml-node="mo">
            <use xlinkHref="#MJX-25-TEX-N-3A"></use>
          </g>
        </g>
      </g>
    </svg>
  );
}

function LatexBox({classes={}, ...props}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="81.704px" viewBox="0 -750 4514.2 1000">
      <defs>
        <path id="MJX-21-TEX-N-5B" d="M118 -250V750H255V710H158V-210H255V-250H118Z"></path>
        <path id="MJX-21-TEX-I-61" d="M33 157Q33 258 109 349T280 441Q331 441 370 392Q386 422 416 422Q429
          422 439 414T449 394Q449 381 412 234T374 68Q374 43 381 35T402 26Q411 27 422 35Q443 55 463 131Q469
          151 473 152Q475 153 483 153H487Q506 153 506 144Q506 138 501 117T481 63T449 13Q436 0 417 -8Q409
          -10 393 -10Q359 -10 336 5T306 36L300 51Q299 52 296 50Q294 48 292 46Q233 -10 172 -10Q117 -10 75
          30T33 157ZM351 328Q351 334 346 350T323 385T277 405Q242 405 210 374T160 293Q131 214 119 129Q119
          126 119 118T118 106Q118 61 136 44T179 26Q217 26 254 59T298 110Q300 114 325 217T351 328Z">
        </path>
        <path id="MJX-21-TEX-N-2C" d="M78 35T78 60T94 103T137 121Q165 121 187 96T210 8Q210 -27 201 -60T180
          -117T154 -158T130 -185T117 -194Q113 -194 104 -185T95 -172Q95 -168 106 -156T131 -126T157 -76T173
          -3V9L172 8Q170 7 167 6T161 3T152 1T140 0Q113 0 96 17Z">
        </path>
        <path id="MJX-21-TEX-I-62" d="M73 647Q73 657 77 670T89 683Q90 683 161 688T234 694Q246 694 246
          685T212 542Q204 508 195 472T180 418L176 399Q176 396 182 402Q231 442 283 442Q345 442 383 396T422
          280Q422 169 343 79T173 -11Q123 -11 82 27T40 150V159Q40 180 48 217T97 414Q147 611 147 623T109
          637Q104 637 101 637H96Q86 637 83 637T76 640T73 647ZM336 325V331Q336 405 275 405Q258 405 240
          397T207 376T181 352T163 330L157 322L136 236Q114 150 114 114Q114 66 138 42Q154 26 178 26Q211 26
          245 58Q270 81 285 114T318 219Q336 291 336 325Z">
        </path>
        <path id="MJX-21-TEX-N-5D" d="M22 710V750H159V-250H22V-210H119V710H22Z"></path>
        <path id="MJX-21-TEX-N-2192" d="M56 237T56 250T70 270H835Q719 357 692 493Q692 494 692 496T691
          499Q691 511 708 511H711Q720 511 723 510T729 506T732 497T735 481T743 456Q765 389 816 336T935
          261Q944 258 944 250Q944 244 939 241T915 231T877 212Q836 186 806 152T761 85T740 35T732 4Q730
          -6 727 -8T711 -11Q691 -11 691 0Q691 7 696 25Q728 151 835 230H70Q56 237 56 250Z">
        </path>
        <path id="MJX-21-TEX-D-52" d="M17 665Q17 672 28 683H221Q415 681 439 677Q461 673 481 667T516
          654T544 639T566 623T584 607T597 592T607 578T614 565T618 554L621 548Q626 530 626 497Q626 447
          613 419Q578 348 473 326L455 321Q462 310 473 292T517 226T578 141T637 72T686 35Q705 30 705
          16Q705 7 693 -1H510Q503 6 404 159L306 310H268V183Q270 67 271 59Q274 42 291 38Q295 37 319
          35Q344 35 353 28Q362 17 353 3L346 -1H28Q16 5 16 16Q16 35 55 35Q96 38 101 52Q106 60 106
          341T101 632Q95 645 55 648Q17 648 17 665ZM241 35Q238 42 237 45T235 78T233 163T233 337V621L237
          635L244 648H133Q136 641 137 638T139 603T141 517T141 341Q141 131 140 89T134 37Q133 36 133
          35H241ZM457 496Q457 540 449 570T425 615T400 634T377 643Q374 643 339 648Q300 648 281 635Q271
          628 270 610T268 481V346H284Q327 346 375 352Q421 364 439 392T457 496ZM492 537T492 496T488
          427T478 389T469 371T464 361Q464 360 465 360Q469 360 497 370Q593 400 593 495Q593 592 477
          630L457 637L461 626Q474 611 488 561Q492 537 492 496ZM464 243Q411 317 410 317Q404 317 401
          315Q384 315 370 312H346L526 35H619L606 50Q553 109 464 243Z">
        </path>
      </defs>
      <g stroke="currentColor" fill="currentColor" transform="matrix(1 0 0 -1 0 0)">
        <g data-mml-node="math"><
          g data-mml-node="mo">
          <use xlinkHref="#MJX-21-TEX-N-5B"></use>
        </g>
          <g data-mml-node="mi" transform="translate(278, 0)">
            <use xlinkHref="#MJX-21-TEX-I-61"></use>
          </g>
          <g data-mml-node="mo" transform="translate(807, 0)">
            <use xlinkHref="#MJX-21-TEX-N-2C"></use>
          </g>
          <g data-mml-node="mi" transform="translate(1251.7, 0)">
            <use xlinkHref="#MJX-21-TEX-I-62"></use>
          </g>
          <g data-mml-node="mo" transform="translate(1680.7, 0)">
            <use xlinkHref="#MJX-21-TEX-N-5D"></use>
          </g>
          <g data-mml-node="mo" transform="translate(2236.4, 0)">
            <use xlinkHref="#MJX-21-TEX-N-2192"></use>
          </g>
          <g data-mml-node="TeXAtom" transform="translate(3514.2, 0)">
            <g data-mml-node="mi">
              <use xlinkHref="#MJX-21-TEX-D-52"></use>
            </g>
          </g>
          <g data-mml-node="mo" transform="translate(4236.2, 0)">
            <use xlinkHref="#MJX-21-TEX-N-2C"></use>
          </g>
        </g>
      </g>
    </svg>
  );
}

function Mapsto({classes={}, ...props}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18.096px" viewBox="0 -511 1000 522">
      <defs>
        <path id="MJX-21-TEX-N-21A6" d="M95 155V109Q95 83 92 73T75 63Q61 63 58 74T54 130Q54 140 54 180T55
          250Q55 421 57 425Q61 437 75 437Q88 437 91 428T95 393V345V270H835Q719 357 692 493Q692 494 692 496T691
          499Q691 511 708 511H711Q720 511 723 510T729 506T732 497T735 481T743 456Q765 389 816 336T935 261Q944
          258 944 250Q944 244 939 241T915 231T877 212Q836 186 806 152T761 85T740 35T732 4Q730 -6 727 -8T711
          -11Q691 -11 691 0Q691 7 696 25Q728 151 835 230H95V155Z">
        </path>
      </defs>
      <g stroke="currentColor" fill="currentColor" transform="matrix(1 0 0 -1 0 0)">
        <g data-mml-node="math">
          <g data-mml-node="mo">
            <use xlinkHref="#MJX-21-TEX-N-21A6"></use>
          </g>
        </g>
      </g>
    </svg>
  );
}

function LetterA({classes={}, ...props}) {
  return (
    <div style={{marginLeft: "1rem", marginRight: "0.5rem"}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28.680px" viewBox="0 -583 1584.8 665">
          <defs>
            <path id="MJX-7-TEX-I-61" d="M33 157Q33 258 109 349T280 441Q331 441 370 392Q386 422 416 422Q429 422
              439 414T449 394Q449 381 412 234T374 68Q374 43 381 35T402 26Q411 27 422 35Q443 55 463 131Q469 151
              473 152Q475 153 483 153H487Q506 153 506 144Q506 138 501 117T481 63T449 13Q436 0 417 -8Q409 -10 393
              -10Q359 -10 336 5T306 36L300 51Q299 52 296 50Q294 48 292 46Q233 -10 172 -10Q117 -10 75 30T33 157ZM351
              328Q351 334 346 350T323 385T277 405Q242 405 210 374T160 293Q131 214 119 129Q119 126 119 118T118
              106Q118 61 136 44T179 26Q217 26 254 59T298 110Q300 114 325 217T351 328Z">
            </path>
            <path id="MJX-7-TEX-N-3D" d="M56 347Q56 360 70 367H707Q722 359 722 347Q722 336 708 328L390 327H72Q56
              332 56 347ZM56 153Q56 168 72 173H708Q722 163 722 153Q722 140 707 133H70Q56 140 56 153Z">
            </path>
          </defs>
          <g stroke="currentColor" fill="currentColor" transform="matrix(1 0 0 -1 0 0)">
            <g data-mml-node="math">
              <g data-mml-node="mi">
                <use xlinkHref="#MJX-7-TEX-I-61"></use>
              </g>
              <g data-mml-node="mo" transform="translate(806.8, 0)">
                <use xlinkHref="#MJX-7-TEX-N-3D"></use>
              </g>
            </g>
          </g>
        </svg>
    </div>
  );
}

function LetterB({classes={}, ...props}) {
  return (
    <div style={{marginLeft: "1rem", marginRight: "0.5rem"}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="26.872px" viewBox="0 -694 1484.8 776">
        <defs>
          <path id="MJX-6-TEX-I-62" d="M73 647Q73 657 77 670T89 683Q90 683 161 688T234 694Q246 694 246 685T212
            542Q204 508 195 472T180 418L176 399Q176 396 182 402Q231 442 283 442Q345 442 383 396T422 280Q422 169
            343 79T173 -11Q123 -11 82 27T40 150V159Q40 180 48 217T97 414Q147 611 147 623T109 637Q104 637 101
            637H96Q86 637 83 637T76 640T73 647ZM336 325V331Q336 405 275 405Q258 405 240 397T207 376T181 352T163
            330L157 322L136 236Q114 150 114 114Q114 66 138 42Q154 26 178 26Q211 26 245 58Q270 81 285 114T318
            219Q336 291 336 325Z">
          </path>
          <path id="MJX-6-TEX-N-3D" d="M56 347Q56 360 70 367H707Q722 359 722 347Q722 336 708 328L390 327H72Q56
            332 56 347ZM56 153Q56 168 72 173H708Q722 163 722 153Q722 140 707 133H70Q56 140 56 153Z">
          </path>
        </defs>
        <g stroke="currentColor" fill="currentColor" transform="matrix(1 0 0 -1 0 0)">
          <g data-mml-node="math">
            <g data-mml-node="mi">
            <use xlinkHref="#MJX-6-TEX-I-62"></use>
          </g>
            <g data-mml-node="mo" transform="translate(706.8, 0)">
              <use xlinkHref="#MJX-6-TEX-N-3D"></use>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

