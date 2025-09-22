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

// Variables (input to the mutation)
export interface ChangePasswordMutationVariables {
  input: {
    rollno: number;
    password: string;
    masterPassword: string;
  };
}

// Result (output of the mutation)
export interface ChangePasswordMutation {
  changePassword: boolean;
}
