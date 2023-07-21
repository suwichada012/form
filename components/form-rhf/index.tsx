"use client";
import Modal from "react-modal";
import useStore from "../utils/store";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

Modal.setAppElement("#form");

const Form = () => {
  const [open, setOpen] = useStore((state) => [state.open, state.setOpen]);

  const schema = z.object({
    firstName: z.string().min(1, { message: "Required" }),
    lastName: z.string().min(1, { message: "Required" }),
    email: z.string().email({ message: "Invalid email" }),
    dateOfBirth: z.string().min(1, { message: "Required" }),
    password: z.string().min(1, { message: "Required" }),
    confirmPassword: z.string().min(1, { message: "Required" }),
  });

  type schemaType = z.infer<typeof schema>;
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    getValues,
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
          <input {...register("firstName")} />
          {errors.firstName?.message && <p>{errors.firstName?.message}</p>}
        </form>

        <button onClick={() => setOpen(false)}>Close</button>

        <div>{JSON.stringify(values, null, 2)}</div>
        <div>{JSON.stringify(errors, null, 2)}</div>
      </Modal>
    </div>
  );
};

export default Form;
