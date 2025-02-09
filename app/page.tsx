import {
  AppBar,
  Box,
  Container,
  SxProps,
  Toolbar,
  Typography
} from "@mui/material";
import {Suspense} from "react";
import ItemLoader from "./_components/ItemLoader";
import GamesCzItems from "./_components/GamesCzItems";

const rootSx: SxProps = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'auto 1fr',
  height: '100vh',
};

const mainSx: SxProps = {
  overflow: 'auto',
  py: 2
};

export default function Page() {
  return (
    <Box sx={rootSx}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Games.cz News
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={mainSx} component="main">
        <Container>
          <Suspense fallback={<ItemLoader />}>
            <GamesCzItems />
          </Suspense>
        </Container>
      </Box>
    </Box>
  );
}
