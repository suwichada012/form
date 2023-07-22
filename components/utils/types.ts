import * as z from "zod";

const userSchema = z.object({
  firstName: z.string().min(1, { message: "Required" }),
  lastName: z.string().min(1, { message: "Required" }),
  email: z.string().email({ message: "Invalid email" }),
  dateOfBirth: z.string().min(1, { message: "Required" }),
  password: z.string().min(4, { message: "Must be longer than 4 characters" }),
  confirmPassword: z.string().min(1, { message: "Required" }),
});

const UserOmit = userSchema.omit({ password: true, confirmPassword: true });
const User = z.object({
  id: z.string(),
  ...UserOmit.shape,
});

export type User = z.infer<typeof User>;
