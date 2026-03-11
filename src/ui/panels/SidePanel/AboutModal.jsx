import { Box, Modal, Stack, Typography } from "@mui/material";
import logo from "../../../assets/icons/awaIcon.png";

const containerCSS = {
  position: "absolute",
  alignItems: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {mobile: 482, tablet: 550, laptop: 650},
  bgcolor: "background.light",
  borderWidth: "2px",
  BorderStyle: "solid",
  BorderColor: "text.primary",
  boxShadow: 24,
  p: 4,
};

export const AboutModal = ({isModalOpen=false, setIsModalOpen=() => {}}) => {
  return (
    <Modal
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack sx={containerCSS} direction="column">
        <Box>
          <img style={{maxWidth: "416px"}} src={logo} alt="logo"/>
        </Box>
        <Typography id="about-modal" sx={{display: "block", mt: "1rem"}} variant="h6">
          Powered by
        </Typography>
        <Typography sx={{display: "block", textAlign: "center", m: "0.5rem"}} variant="body2">
          Asymptote, React, Redux, Node.js, Express.js, and MUI.
        </Typography>
      </Stack>
    </Modal>
  );
}
