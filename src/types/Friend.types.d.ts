export interface IFriend  {
  walletAddress: string;
  email: string;
  name: string;
  avatarColor: string
}

export interface IFriends {
  [walletAddress: string]: IFriend;
}


export type FriendContextType = {
  friends: IFriends;
  addFriend: (friend: IFriend) => boolean;
  updateFriend: (friend: Partial<IFriend>) => void;
  removeFriend: (walletAddress: string) => void;
};