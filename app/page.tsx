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
import ReadItemsProvider from "./_components/ReadItemsProvider";

const rootSx: SxProps = {
  height: '100vh',
};
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
    <Box sx={rootSx}>
      <ReadItemsProvider>
        <AppBar position="fixed" color="default">
          <Toolbar variant="dense" sx={toolbarSx}>
            <Box component="a" sx={logoSx} href="https://games.tiscali.cz/">
              <Typography variant="h6" color="primary" component="div">
                Games.cz News
              </Typography>
            </Box>
            <Box>aaa</Box>
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
      </ReadItemsProvider>
    </Box>
  );
}
