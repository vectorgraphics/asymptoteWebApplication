import { useState, useEffect, useRef } from "react";
import { Box, Stack } from "@mui/material";

export const ResizableContainers = ({children, direction = "row", ratio = [1, 1], bounds = [150, 50]}) => {
  const initialState = initialSize(ratio);
  const [isResizing, setIsResizing] = useState(false);
  const [size1, setSize1] = useState(initialState[0]);
  const [size2, setSize2] = useState(initialState[1]);
  
  const fpRef = useRef(null);
  const spRef = useRef(null);
  const resizerRef = useRef(null);
  
  let base, widthOrHeight = "";
  switch (direction) {
    case "row":
      base = "left";
      widthOrHeight = "width";
      break;
      case "column":
        base = "top";
        widthOrHeight = "height";
      break;
    default:
      throw Error("Wrong direction value!");
  }
  const Children = normalizeChildren(children);
  
  const startResizing = () => {
    const element = document.getElementById("previewIframe");
    spRef.current.style.transition = "";
    if (element) {
      element.style.pointerEvents = "none"; 
    }
    setIsResizing(true);
  }

  const stopResizing = () => {
    const element = document.getElementById("previewIframe");
    if (element) {
      element.style.pointerEvents = "auto";
    }
    setIsResizing(false);
    if (spRef.current) {
      spRef.current.style.transition = `${widthOrHeight} 0.2s ease-in-out`;
    }
  }

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  
  const resize = (event) => {
    const baseSize = fpRef.current.getBoundingClientRect()[base] + 50;
    if (isResizing) {
      if (direction === "row") {
        if (event.clientX > bounds[0] + baseSize && event.clientX < windowWidth - bounds[0]) {
          setSize1(event.clientX - baseSize - 4);
          setSize2(windowWidth - event.clientX - 4);
        }
      } else if (direction === "column") {
        if (event.clientY > bounds[1] + baseSize && event.clientY < windowHeight - bounds[1]) {
          setSize1(event.clientY - baseSize - 4);
          setSize2(windowHeight - event.clientY - 4);
        }
      }
    }
  };
  
  const setEqualWidth = () => {
    if (widthOrHeight === "width") {
      setSize1("50%");
      setSize2("50%");
    }
  }

  // useEffect(() => {
  //   iframeRef.current = document.getElementById("previewIframe");
  // }, [])

  useEffect(() => {
    window.addEventListener("resize", setEqualWidth);
    window.addEventListener("mouseup", stopResizing);
    window.addEventListener("mousemove", resize);
    return () => {
      window.removeEventListener("resize", setEqualWidth);
      window.removeEventListener("mouseup", stopResizing);
      window.removeEventListener("mousemove", resize);
    }
  })

  return (
    <Stack
      sx={{
        overflow: "hidden",
        flexGrow: 1
      }}
      direction={direction}
      onMouseDown={(event) => event.preventDefault()}
    >
      <Box
        ref={fpRef}
        sx={{
          display: "flex",
          flexGrow: ratio[0],
          [widthOrHeight]: size1,
        }}
      >
        {(typeof Children[0] === "function")? Children[0](): Children[0]}
      </Box>
      {
        Children[1] &&
        <>
          <Box
            aria-hidden={true}
            ref={resizerRef}
            sx={resizerSx(direction, isResizing)}
            onMouseDown={startResizing}
          />
          <Box
            ref={spRef}
            sx={{
              display: "flex",
              flexGrow: ratio[1],
              [widthOrHeight]: (initialState[0] === "auto")? 35: size2,
            }}
          >
            {(typeof Children[1] === "function")? Children[1](): Children[1]}
          </Box>
        </>
      }
    </Stack>
  )
}

const resizerSx = (direction, isResizing) => [
  {
    bgcolor: (isResizing)? "extraColors.pureRed": "background.main",
  },
  (direction === "row") && {
    width: 4,
    height: "100%",
    cursor: "col-resize",
    resize: "horizontal",
    borderRightWidth: "2px", 
    borderRightStyle: "solid",
    borderRightColor: (isResizing)? "extraColors.pureRed": "text.secondary",
    "&:hover": {
      bgcolor: "extraColors.pureRed",
      borderRightColor: "extraColors.pureRed",
    }
  },
  (direction === "column") && {
    width: "100%",
    height: 4,
    cursor: "row-resize",
    resize: "vertical",
    borderBottomWidth: "2px", 
    borderBottomStyle: "solid",
    borderBottomColor: (isResizing)? "extraColors.pureRed": "text.secondary",
    "&:hover": {
      bgcolor: "extraColors.pureRed",
      borderBottomColor: "extraColors.pureRed",
    }
  },
]


const normalizeChildren = (children) => {
  const arr = [];
  if (children) {
    if (children.length === 2) {
      for (const element of children) {
        if (element) {
          arr.push(element);
        } else {
          continue;
        }
      }
      return arr;
    }
    return [children, null];
  }
  return [null, null];
}

const initialSize = (ratio) => {
  if (ratio[0] && ratio[1]) {
    const proportion = ratio[0] / ratio[1];
    if (proportion === 1) {
      return ["50%", "50%"];
    } else if (proportion > 1) {
      return [1 - 1 / proportion, 1 / proportion];
    } else {
      return [1 / proportion, 1 - 1 / proportion];
    }
  } else {
    return ["auto", "auto"]
  }
}