import React, { useState } from 'react';
import './App.css';
import { AddForm } from './../../common/AddForm';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Fab,
  Dialog,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { FriendList } from '../../common/FriendList';
import { FriendProvider } from '../../context/FrirendContext';
import { styled } from '@mui/material/styles';

const StyledFab = styled(Fab)({
  position: 'fixed',
  zIndex: 1,
  top: 50,
  left: 50,
  width: '20ch',
});

export function App() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="App">
      <AppBar color="transparent" position="static" sx={{ mb: 5 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ m: 'auto', display: { xs: 'none', md: 'flex' } }}
            >
              Friends List
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <FriendProvider>
        <Container>
          <StyledFab
            color="primary"
            variant="extended"
            onClick={handleClickOpen}
          >
            <Add />
            Add friend
          </StyledFab>
          <Dialog open={open} onClose={handleClose}>
            <AddForm handleClose={handleClose} />
          </Dialog>
          <FriendList />
        </Container>
      </FriendProvider>
    </div>
  );
}

export default App;
