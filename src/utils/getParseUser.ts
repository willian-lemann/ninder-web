import { User } from "@models/user";

export function getFormattedParseUser(
  parseUser: Parse.User<Parse.Attributes> | null
) {
  const user: User = {
    email: "",
    name: "",
    avatar: "",
    hasConfirmedRegulation: false,
    bio: "",
    hometown: "",
    occupation: "",
    location: null,
    phone: "",
    birthday: "",
    gender: "",
    nationality: "",
  };

  Object.keys(user).forEach((key) => {
    user[key] = parseUser?.get(key);
  });

  return user;
}
