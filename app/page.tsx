"use client";
import useStore from "@/components/utils/store";
import Form from "@/components/form-rhf";
export default function Home() {
  const [setOpen] = useStore((state) => [state.setOpen]);
  return (
    <div>
      <button onClick={() => setOpen(true)}>Open</button>
      <Form />
    </div>
  );
}
