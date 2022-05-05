import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Box,
  TextField,
  Button,
} from '@mui/material';
import { IFriend } from '../../../types/Friend.types';
import { useFriend } from '../../../context/FrirendContext';
import { FriendContextType } from '../../../types/Friend.types';

interface FriendCardProps {
  friend: IFriend;
}
export const FriendCard: React.FC<FriendCardProps> = ({ friend }) => {
  const { updateFriend, removeFriend } = useFriend() as FriendContextType;
  const [name, setName] = useState(friend.name);
  const [email, setEmail] = useState(friend.email);
  const [showUpdate, setShowUpdate] = useState<boolean>(false);

  const [emailError, setEmailError] = useState('');

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
    <Card sx={{ minWidth: 275 }}>
      {!showUpdate ? (
        <>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Name
            </Typography>
            <Typography variant="h5" component="div">
              {friend.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Wallet Address
            </Typography>
            <Typography variant="h5" component="div">
              {friend.walletAddress}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Email
            </Typography>
            <Typography variant="h5" component="div">
              {friend.email}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => {
                setShowUpdate(true);
              }}
            >
              Update
            </Button>
            <Button
              size="small"
              onClick={() => {
                removeFriend(friend.walletAddress);
              }}
            >
              Remove
            </Button>
          </CardActions>
        </>
      ) : (
        <>
          <CardContent>
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
                disabled
                id="wallet-address"
                label="Wallet Address"
                variant="outlined"
                value={friend.walletAddress}
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
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => {
                setShowUpdate(false);
                updateFriend({
                  walletAddress: friend.walletAddress,
                  name,
                  email,
                });
              }}
            >
              Save
            </Button>
          </CardActions>
        </>
      )}
    </Card>
  );
};
