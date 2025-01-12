import React from 'react';
import { Container, CssBaseline, AppBar, Toolbar, Typography } from '@mui/material';
import PostList from './components/PostList';

function App() {
  return (
      <>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Board Application
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <PostList />
        </Container>
      </>
  );
}

export default App;