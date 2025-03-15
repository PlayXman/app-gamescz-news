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
  height: '100vh',
};
const mainSx: SxProps = {
  py: 2,
  overflowX: "hidden",
};
const logoSx: SxProps = {
  textDecoration: 'none',
};

export default function Page() {
  return (
    <Box sx={rootSx}>
      <AppBar position="fixed" color="default">
        <Toolbar variant="dense">
          <Box component="a" sx={logoSx} href="https://games.tiscali.cz/">
            <Typography variant="h6" color="primary" component="div">
              Games.cz News
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
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
