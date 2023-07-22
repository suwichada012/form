import * as z from "zod";

const schemaFull = z.object({
  id: z.number(),
  firstName: z.string().min(1, { message: "Required" }),
  lastName: z.string().min(1, { message: "Required" }),
  email: z.string().email({ message: "Invalid email" }),
  dateOfBirth: z.string().min(1, { message: "Required" }),
  password: z.string().min(4, { message: "Must be longer than 4 characters" }),
  confirmPassword: z.string().min(1, { message: "Required" }),
});

const userSchema = schemaFull.omit({
  password: true,
  confirmPassword: true,
});
export const usersSchema = z.array(userSchema);

export type User = z.infer<typeof userSchema>;
