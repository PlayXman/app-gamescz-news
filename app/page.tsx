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
import ItemCounter from "./_components/ItemCounter";


const toolbarSx: SxProps = {
  justifyContent: 'space-between'
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
    <>
      <AppBar position="fixed" color="default">
        <Toolbar variant="dense" sx={toolbarSx}>
          <Box component="a" sx={logoSx} href="https://games.tiscali.cz/">
            <Typography variant="h6" color="primary" component="div">
              Games.cz News
            </Typography>
          </Box>
          <Box>
            <ItemCounter />
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
    </>
  );
}
