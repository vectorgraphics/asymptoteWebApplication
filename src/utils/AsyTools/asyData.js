// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Asy graphModule basic data
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const asyPicData = {
  width: "10 cm",
  height: "10 cm",
  aspectRatio: "Ignore-Aspect",
}

export const asyFuncData = {
  funcLabel: "no Label",
  varName: "",
  lBound : "",
  uBound: "",
  formula: "",
  parName: "",
  parValues: "",
  condFunc: "return true;",
  joinOp: "straight",
  joinOpFunc: "",
  markerType: "no marker",
  markerSize: "",
  markerFill: "NoFill",
  markerColor: "black",
  curvePen: "default pen",
}

export const asyAxisData = {
  label: "no label",
  relativePos: 1,
  omitLabels: "",
  min: "",
  max: "",
  align: "NoAlign",
  axisLocation: "bottom",
  scale: "linear",
  extend: "true",
  axisPen: "default pen",
  endArrow: "None",
  ticks: "NoTicks",
  tickLabel: "null",
  tickLabelFormat: "",
  ticksExtend: "false",
  omitTicks: "",
  omitTickLabels: "",
  majorTickDivision: "0",
  minorTickDivision: "0",
  majorTickSteps: "0",
  minorTickSteps: "0",
  majorTickSize: "0",
  minorTickSize: "0",
  majorTickPen: "default pen",
  minorTickPen: "default pen",
}

export const asyPenData = {
  lineType: "solid",
  lineWidth: "0.5bp",
  lineCap: "roundcap",
  joinStyle: "roundjoin",
  fillRule: "zerowinding",
  baseAlign: "nobasealign",
  fontSize: "12pt",
  opacity: "1",
  blend: "None",
  color: "black",
  pattern: "None",
};

export const asyLabelData = {
  string: "",
  position: "",
  positionPair: "",
  relativePos: "0.5",
  pen: "default pen",
  fillType: "NoFill",
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%  Asy graphModule special data
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const asySpecialDefaults = {
  picture: {
    preview: null,
    asyDefault: "currentpicture",
  },
  pen: {
    preview: "default pen",
    asyDefault: "currentpen",
  },
  Label: {
    preview: "no Label",
    asyDefault: null,
  },
  marker: {
    preview: "no marker",
    asyDefault: "nomarker",
  },
}