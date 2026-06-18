export type RegisterFormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

export type RegisterResponse = {
  success: boolean;
  message: string;
  user: {
    id: string;
    email: string;
    name: string | null;
  };
};
