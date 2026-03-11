import { Stack, styled } from "@mui/material";

const BaseCSS = {
  display: "flex",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignItems: "stretch",
};

export const StackContainer = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "grow",
  label: "StackCont",
  name: "StackContainer",
})(({theme, direction="row", grow=true, ...props}) => {
  if (direction === "column") {
    return (grow)? {
      ...BaseCSS,
      flexFlow: direction,
      width: "100%",
      height: "100%",
      flexGrow: 1
    }:{
      ...BaseCSS,
      flexFlow: direction,
      width: 1,
    };
  }
  return (grow)? {
    ...BaseCSS,
    flexFlow: direction,
    height: "100%",
    flexGrow: 1
  }: BaseCSS;
});
