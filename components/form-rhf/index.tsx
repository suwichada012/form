"use client";
import Modal from "react-modal";
import useStore from "../utils/store";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import * as z from "zod";

Modal.setAppElement("#form");

const Form = () => {
  const [open, setOpen] = useStore((state) => [state.open, state.setOpen]);

  const schema = z
    .object({
      firstName: z.string().min(1, { message: "Required" }),
      lastName: z.string().min(1, { message: "Required" }),
      email: z.string().email({ message: "Invalid email" }),
      dateOfBirth: z.string().min(1, { message: "Required" }),
      password: z.string().min(1, { message: "Required" }),
      confirmPassword: z.string().min(1, { message: "Required" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  type schemaType = z.infer<typeof schema>;
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
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: "",
      password: "",
      confirmPassword: "",
    },
  });

  const values = useWatch({ control });
  return (
    <div id="form">
      <Modal isOpen={open}>
        <div>Add User</div>

        <form onSubmit={handleSubmit((d) => console.log(d))}>
          <input {...register("firstName")} type="text" />
          <ErrorMessage errors={errors} name="firstName" />
          {errors.firstName?.message && <p>{errors.firstName?.message}</p>}

          <input {...register("lastName")} type="text" />
          {errors.lastName?.message && <p>{errors.lastName?.message}</p>}

          <input {...register("email")} type="text" />
          {errors.email?.message && <p>{errors.email?.message}</p>}

          <input {...register("dateOfBirth")} type="date" />
          {errors.dateOfBirth?.message && <p>{errors.dateOfBirth?.message}</p>}

          <input {...register("password")} type="password" />
          {errors.password?.message && <p>{errors.password?.message}</p>}

          <input {...register("confirmPassword")} type="password" />
          {errors.confirmPassword?.message && (
            <p>{errors.confirmPassword?.message}</p>
          )}

          <button type="submit">Submit</button>
        </form>

        <button
          onClick={() => {
            setOpen(false);
            reset();
          }}
        >
          Close
        </button>

        <div>{JSON.stringify(values, null, 2)}</div>
        {/* <div>{JSON.stringify(errors, null, 2)}</div> */}
      </Modal>
    </div>
  );
};

export default Form;
