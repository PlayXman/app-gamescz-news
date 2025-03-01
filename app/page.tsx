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
import NotificationRegistrationButton from "@/app/_components/notifications/NotificationRegistrationButton";

const rootSx: SxProps = {
  height: '100vh',
};

const toolbarSx: SxProps = {
  alignItems: 'center',
  justifyContent: 'space-between',
};

const mainSx: SxProps = {
  py: 2,
  overflowX: "hidden",
  gap: 2,
};

export default function Page() {
  return (
    <Box sx={rootSx}>
      <AppBar position="fixed" color="default">
        <Toolbar variant="dense" sx={toolbarSx}>
          <Typography variant="h6" color="primary" component="div">
            Games.cz News
          </Typography>
          <NotificationRegistrationButton/>
        </Toolbar>
      </AppBar>
      <Toolbar/>
      <Box sx={mainSx} component="main">
        <Container>
          <Suspense fallback={<ItemLoader/>}>
            <GamesCzItems/>
          </Suspense>
        </Container>
      </Box>
    </Box>
  );
}
