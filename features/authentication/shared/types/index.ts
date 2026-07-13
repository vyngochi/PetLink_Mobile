export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type User = {
  id: string;
  userName: string;
  email: string;
  phone: string;
  fullName: string | null;
  avatar: string | null;
  role: string;
  createAt: string;
  updateAt: string;
};
