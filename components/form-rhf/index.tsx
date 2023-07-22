"use client";
import Modal from "react-modal";
import useStore from "../utils/store";
import { useForm, useWatch, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import * as z from "zod";
import axios from "axios";
Modal.setAppElement("#form");

const schema = z
  .object({
    firstName: z.string().min(1, { message: "Required" }),
    lastName: z.string().min(1, { message: "Required" }),
    email: z.string().email({ message: "Invalid email" }),
    dateOfBirth: z.string().min(1, { message: "Required" }),
    password: z
      .string()
      .min(4, { message: "Must be longer than 4 characters" }),
    confirmPassword: z.string().min(1, { message: "Required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      return z.coerce.date().safeParse(data.dateOfBirth).success;
    },
    {
      message: "Plase input valid date",
      path: ["dateOfBirth"],
    }
  )
  .refine(
    (data) => {
      const nYear = new Date().getFullYear();
      const bYear = new Date(data.dateOfBirth).getFullYear();
      return nYear - bYear >= 18;
    },
    {
      message: "You must be 18 years old",
      path: ["dateOfBirth"],
    }
  );
type schemaType = z.infer<typeof schema>;

const Form = () => {
  const [open, setOpen] = useStore((state) => [state.open, state.setOpen]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<schemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "sdfdsd",
      lastName: "dddfd",
      email: "1@1.com",
      dateOfBirth: "2022-01-01",
      password: "123",
      confirmPassword: "123",
    },
  });

  const values = useWatch({ control });
  console.log({ fd: register("firstName") });
  // console.log(values);

  function sendData(data: schemaType) {
    console.log(data);
    axios
      .post("/api/register", data)
      .then((res) => {
        console.log(res);
        setOpen(false);
        reset();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div id="form">
      <Modal isOpen={open}>
        <form
          onSubmit={handleSubmit(sendData)}
          className="flex flex-col gap-2 items-start"
        >
          <div>
            <label htmlFor="firstName">First Name</label>
            <input {...register("firstName")} type="text" id="firstName" />
            <ErrorMessage errors={errors} name="firstName" />
            {/* {errors.firstName?.message && errors.firstName?.message} */}
          </div>

          <div>
            <label htmlFor="lastName">Last Name</label>
            <input {...register("lastName")} type="text" id="lastName" />
            <ErrorMessage errors={errors} name="lastName" />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input {...register("email")} type="text" id="email" />
            <ErrorMessage errors={errors} name="email" />
          </div>

          <div>
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input {...register("dateOfBirth")} type="text" id="dateOfBirth" />
            <ErrorMessage errors={errors} name="dateOfBirth" />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input {...register("password")} type="password" id="password" />
            <ErrorMessage errors={errors} name="password" />
          </div>

          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              {...register("confirmPassword")}
              type="password"
              id="confirmPassword"
            />
            <ErrorMessage errors={errors} name="confirmPassword" />
          </div>
          <button type="submit">Submit</button>
          <button
            onClick={() => {
              setOpen(false);
              reset();
            }}
          >
            Close
          </button>
        </form>

        <div>{JSON.stringify(values, null, 2)}</div>
        <div>{JSON.stringify(getErrMsg(errors))}</div>
      </Modal>
    </div>
  );
};

export default Form;

function getErrMsg(errors: FieldErrors<schemaType>) {
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
