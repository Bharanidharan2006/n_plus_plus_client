export interface LoginUserMutation {
  loginUser: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface LoginUserMutationVariables {
  rollNo: number;
  password: string;
}
