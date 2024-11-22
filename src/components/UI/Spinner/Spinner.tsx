import { Box, CircularProgress } from "@mui/material";

const Spinner = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress sx={{ mx: "auto" }} />
    </Box>
  );
};

export default Spinner;
