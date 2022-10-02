// import { createUserWithEmailAndPassword, auth } from "../../config/firebase";
import { User } from "../../models/user";
import { createUserService } from "../user/createUserService";

export async function signUpService(
  email: string,
  password: string,
  name: string
) {
  // const response = await createUserWithEmailAndPassword(auth, email, password);
  // const user: User = {
  //   avatar: response.user.displayName,
  //   email,
  //   name,
  //   userId: response.user.uid,
  // };
  // await createUserService(user);
  // const token = await response.user.getIdToken();
  // return {
  //   token,
  //   user,
  // };
}
