import { FieldErrors } from "react-hook-form";
import { type Form } from "./types";

export function getErrMsg(errors: FieldErrors<Form>) {
  const err: {
    [key: string]: string;
  } = {
    firstName: errors.firstName?.message || "",
    lastName: errors.lastName?.message || "",
    email: errors.email?.message || "",
    dateOfBirth: errors.dateOfBirth?.message || "",
    password: errors.password?.message || "",
    confirmPassword: errors.confirmPassword?.message || "",
  };

  Object.keys(err).forEach((key) => {
    if (err[key] === "") {
      delete err[key];
    }
  });

  return err;
}
