export interface User {
  address: string;
  balance: number;
  staked: number;
}

export interface Post {
  id: string;
  tips: number;
  likes: number;
  timestamp: number;
}