"use client";

import Modal from "react-modal";
import useStore from "../utils/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { formSchema, type Form } from "@components/utils/types";
import { getErrMsg } from "@components/utils/helper";
import { URL_DATA } from "utils";
Modal.setAppElement("#form");

const defaultValues: Form = {
  firstName: "",
  lastName: "",
  email: "",
  dateOfBirth: "",
  password: "",
  confirmPassword: "",
};

const Form = () => {
  const [open, setOpen] = useStore((state) => [state.open, state.setOpen]);

  const rhf = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const { register, handleSubmit, watch, reset, formState } = rhf;
  const { errors } = formState;
  const values = watch();

  function sendData(data: Form) {
    console.log(data);
    axios
      .post(URL_DATA, data)
      .then((res) => {
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
