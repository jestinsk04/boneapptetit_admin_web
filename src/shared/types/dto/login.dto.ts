export type LoginUserData = {
  email: string;
  displayName: string;
  isAdmin: boolean;
};

export type LoginResponse = {
  email: string;
  isAdmin: boolean;
  token: string;
};
