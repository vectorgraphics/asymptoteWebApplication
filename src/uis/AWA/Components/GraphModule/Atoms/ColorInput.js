import { useState, useEffect, useLayoutEffect } from "react";
import { asyColors, X11Colors } from "../../../../../utils/AsyTools/asyColorSet";
import { ComboBox } from "../../../Atoms/ComboBox";
import { ColorWheel } from "./ColorWheel";

export function ColorInput({className="", format="asy colors", label="color input",  onSelectColor= () => {}, ...props}) {
  const [asyColorState, setAsyColorState] = useState(asyColors[49]);
  const [x11ColorState, setX11ColorState] = useState(X11Colors[7]);
  const [colorState, setColorState] = useState((format === "asy colors")? asyColorState.value: x11ColorState.value);

  switch (format) {
    case "asy colors":
      return (
        <ComboBox
          className={className}
          label={label} dataArray={asyColors} property="text" value={asyColorState}
          onInputChange={(event, value) => {
            const colorValue = asyColors.filter((obj) => obj.text === value);
            if (colorValue.length > 0) {
              setAsyColorState(colorValue[0]);
              setColorState(colorValue[0].value);
              onSelectColor(colorValue[0].value);
            }
          }}/>
      );
    case "X11 colors":
      return (
        <ComboBox
          className={className}
          label={label} dataArray={X11Colors} property="text" value={x11ColorState}
          onInputChange={(event, value) => {
            const colorValue = X11Colors.filter((obj) => obj.text === value);
            if (colorValue.length > 0) {
              setX11ColorState(colorValue[0]);
              setColorState(colorValue[0].value);
              onSelectColor(colorValue[0].value);
            }
          }}/>
      );
    case "color wheel":
      return (
        <div className={className}>
          <ColorWheel isOpen={true} width="12rem" label={label} startColor={colorState} onPickColor={onSelectColor}/>
        </div>
        )

    default:
      return null;
  }
}

