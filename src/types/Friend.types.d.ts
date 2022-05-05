export interface IFriend  {
  walletAddress: string;
  email: string;
  name: string;
};

export interface IFriends {
  [walletAddress: string]: Friend;
}


export type FriendContextType = {
  friends: IFriends;
  addFriend: (friend: IFriend) => void;
  updateFriend: (friend: Partial<IFriend>) => void;
  removeFriend: (walletAddress: string) => void;
};