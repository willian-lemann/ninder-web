type Errors = {
  [key: string]: string;
};

export const errors: Errors = {
  "auth/email-already-in-use": "Email already in user. Try another one",
  "auth/user-not-found": "User not found on database.",
};
