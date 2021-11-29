import React, { useState } from 'react';
//@ts-ignore
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Typography, Button } from '@mui/material';

import './App.css';
import { useColorMode } from './contexts';
import { Claim } from './components/Claim';

const claims: { handle: string; amount: number, url: string }[] = [];

const FindClaim = () => {
  const [found, setFound] = useState<{ handle: string; amount: number, url: string }[]>([]);

  return (
    <div style={{ maxWidth: '80%', width: 1200, margin: '2rem auto' }}>
      <Typography style={{ textAlign: 'center' }}>Find TBT Claim</Typography>
      <input
        placeholder="your addresss"
        onBlur={e => {
          const f = claims.filter(c =>
            c.handle.toLowerCase().startsWith(e.target.value.toLowerCase()),
          );
          setFound(f as any);
        }}
      />

      <Button>Search</Button>

      {found.map((f, i) => (
        <div
          key={i}
          style={{ padding: '1rem', borderRadius: '1rem', margin: '1rem 0' }}
        >
          <Typography>{f.handle}: </Typography>
          <p
            style={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              display: 'block',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
            }}
          >
            <a
              style={{
                maxWidth: '100%',
              }}
              href={f.url}
              target="_blank"
              rel="noreferrer"
            >
              {f.url}
            </a>
          </p>
        </div>
      ))}
    </div>
  );
};

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

// eslint-disable-next-line
const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = React.useState(
    getWindowDimensions(),
  );

  React.useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};

function App() {
  const colorModeCtx = useColorMode();

  React.useEffect(() => {}, [colorModeCtx.mode]);

  const theme = React.useMemo(() => {
    let mode: 'light' | 'dark';
    if (colorModeCtx.mode === 'dark' || !colorModeCtx.mode) {
      mode = 'dark';
    } else {
      mode = 'light';
    }

    return createTheme({
      palette: {
        mode,
      },
    });
  }, [colorModeCtx.mode]);

  return (
    <div className="App" style={{ backgroundColor: 'transparent' }}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <Box
            maxWidth="60ch"
            width="calc(100% - 60px)"
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <Box height="40px" />
            <Switch>
              <Route path="/" exact component={Claim} />
              <Route path="/find" component={FindClaim} />
            </Switch>
            <Box height="80px" />
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
