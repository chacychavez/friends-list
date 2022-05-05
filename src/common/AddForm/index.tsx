import { Box, Button, Container, TextField } from '@mui/material';
import { useState } from 'react';

export function AddForm() {
  const [name, setName] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [email, setEmail] = useState('');
  return (
    <Container>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '50ch' },
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextField
          id="wallet-address"
          label="Wallet Address"
          variant="outlined"
          value={walletAddress}
          onChange={(e) => {
            setWalletAddress(e.target.value);
          }}
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Button
          variant="contained"
          onClick={() => {
            console.log(name, email, walletAddress);
          }}
        >
          Add Friend
        </Button>
      </Box>
    </Container>
  );
}
