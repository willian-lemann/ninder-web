import { object, string, number, date } from "yup";
import { differenceInYears } from "date-fns";

const emailRegexPattern =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export const signInSchema = object({
  email: string()
    .required("Email must not be empty.")
    .matches(emailRegexPattern, { message: "Email must be valid." }),
  password: string()
    .required("Password must not be empty.")
    .min(8, "Password must be at least 8 digits.")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
});

export const userInformationSchema = object({
  name: string().required("Name must not be empty."),
  email: string()
    .required("Email must not be empty.")
    .matches(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      { message: "Email must be valid." }
    ),
  hometown: string().required("Hometown is required."),
  occupation: string().required("Occupation is required."),
  bio: string().required("Bio is required."),
});

export const userProfileSchema = object().shape({
  nationality: string().required("Nationality is required."),
  birthday: date()
    .required("Birthday is required.")
    .test("test if is more than 18y", "You must be 18+ to join", (value) => {
      return differenceInYears(new Date(), new Date(value as Date)) >= 18;
    }),
  gender: number().moreThan(0, "Gender is required"),
  password: string()
    .required("Password must not be empty.")
    .min(8, "Must be at least 8 digits."),
  confirmPassword: string()
    .required("Must not be empty.")
    .test("password-match", "Must match with password.", (value, data) => {
      return value === data.parent.password;
    }),
});
