"use client";
import useStore from "@/components/utils/store";
import Form from "@/components/form-rhf";
import { useEffect } from "react";
export default function Home() {
  const [setOpen, users, setUsers] = useStore((state) => [
    state.setOpen,
    state.users,
    state.setUsers,
  ]);
  return (
    <div>
      <button onClick={() => setOpen(true)}>Open</button>
      <Form />
    </div>
  );
}
