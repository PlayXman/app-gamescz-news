import  type {Metadata, Viewport} from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from './_utils/theme';
import {ReactNode} from "react";
import {Box, CssBaseline, SxProps} from "@mui/material";
import ReadItemsProvider from "@/app/_components/ReadItemsProvider";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Games.cz News',
  robots: {
    index: false,
  },
};

export const viewport: Viewport = {
  themeColor: '#282828',
}

const rootSx: SxProps = {
  height: '100vh',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={rootSx}>
              <ReadItemsProvider>
                {children}
              </ReadItemsProvider>
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
