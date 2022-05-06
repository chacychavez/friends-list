import { Grid } from '@mui/material';
import { FriendCard } from './FriendCard';
import { useFriend } from '../../context/FriendContext';
import { IFriend, FriendContextType } from '../../types/Friend.types';

export function FriendList() {
  const { friends } = useFriend() as FriendContextType;
  return (
    <Grid container spacing={6}>
      {Object.values(friends).map((friend: IFriend) => (
        <Grid item xs={6} key={friend.walletAddress}>
          <FriendCard friend={friend} />
        </Grid>
      ))}
    </Grid>
  );
}
