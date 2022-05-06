import React, { useState } from 'react';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useFriend } from '../../context/FriendContext';
import { FriendContextType } from '../../types/Friend.types';

interface AddFormProps {
  handleClose: () => void;
}

export const AddForm: React.FC<AddFormProps> = ({ handleClose }) => {
  const { addFriend } = useFriend() as FriendContextType;
  const [name, setName] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [email, setEmail] = useState('');
  const [walletAddressError, setWalletAddressError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [formError, setFormError] = useState('');

  const handleAdd = () => {
    setFormError('');
    let hex = Math.floor(Math.random() * 0xffffff);
    let avatarColor = '#' + hex.toString(16);
    const success = addFriend({ walletAddress, name, email, avatarColor });
    if (success) {
      handleClose();
    } else {
      setFormError('Duplicate wallet address');
    }
  };

  const handleWalletAddressChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const error = /^0x[a-fA-F0-9]{40}$/.test(event.currentTarget.value)
      ? ''
      : 'Invalid Address';
    setWalletAddressError(error);
    setWalletAddress(event.currentTarget.value);
  };

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const error =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        event.currentTarget.value
      )
        ? ''
        : 'Invaid Email';
    setEmailError(error);
    setEmail(event.currentTarget.value);
  };

  return (
    <>
      <DialogTitle>Add Friend</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ color: 'red' }}>
          {formError}
        </DialogContentText>
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
            error={!!walletAddressError}
            id="wallet-address"
            label="Wallet Address"
            variant="outlined"
            value={walletAddress}
            onChange={handleWalletAddressChange}
            helperText={walletAddressError}
          />
          <TextField
            error={!!emailError}
            id="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
            helperText={emailError}
          />
        </Box>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleAdd}
            disabled={
              !!emailError ||
              !!walletAddressError ||
              !name ||
              !email ||
              !walletAddress
            }
          >
            Save
          </Button>
        </DialogActions>
      </DialogContent>
    </>
  );
};
