"use client";

import Modal from "react-modal";
import useStore from "../utils/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { formSchema, type Form } from "@components/utils/types";
// import { getErrMsg } from "@components/utils/helper";
import { URL_DATA } from "utils";
import { getInitData } from "@components/utils/helper";

Modal.setAppElement("#form");

const FormRHF = () => {
  const [open, setOpen, fetchUsers] = useStore((state) => [
    state.open,
    state.setOpen,
    state.fetchUsers,
  ]);

  const rhf = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: getInitData(true),
    mode: "onTouched", // Try onSubmit
  });
  const { register, handleSubmit, watch, reset, setValue, formState } = rhf;
  const { errors, isSubmitting, isValid } = formState;
  // const values = watch();

  async function sendData(data: Form) {
    try {
      const res = await axios.post(URL_DATA, data);
      setOpen(false);
      fetchUsers();
      reset(getInitData(false));
    } catch (err) {
      console.log(err);
    }
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
            <input
              {...register("firstName")}
              type="text"
              id="firstName"
              disabled={isSubmitting}
            />
            <ErrorMessage errors={errors} name="firstName" />
            {/* {errors.firstName?.message && errors.firstName?.message} */}
          </div>

          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              {...register("lastName")}
              type="text"
              id="lastName"
              disabled={isSubmitting}
            />
            <ErrorMessage errors={errors} name="lastName" />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              {...register("email")}
              type="text"
              id="email"
              disabled={isSubmitting}
            />
            <ErrorMessage errors={errors} name="email" />
          </div>

          <div>
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              {...register("dateOfBirth")}
              type="text"
              id="dateOfBirth"
              disabled={isSubmitting}
            />
            <ErrorMessage errors={errors} name="dateOfBirth" />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              {...register("password")}
              type="password"
              id="password"
              disabled={isSubmitting}
            />
            <ErrorMessage errors={errors} name="password" />
          </div>

          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              {...register("confirmPassword")}
              type="password"
              id="confirmPassword"
              disabled={isSubmitting}
            />
            <ErrorMessage errors={errors} name="confirmPassword" />
          </div>
          <button type="submit" disabled={isSubmitting || !isValid}>
            {formState.isSubmitting ? "Working" : "Submit"}
          </button>
          <button
            onClick={() => {
              setOpen(false);
              reset(getInitData(false));
            }}
            disabled={isSubmitting}
          >
            Close
          </button>
        </form>

        {/* <div>{JSON.stringify(values, null, 2)}</div>
        <div>{JSON.stringify(getErrMsg(errors))}</div> */}
      </Modal>
    </div>
  );
};

export default FormRHF;
