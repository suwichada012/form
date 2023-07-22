"use client";
import useStore from "@components/utils/store";
import Form from "@components/form-rhf";
import useUsers from "@components/utils/useUsers";
export default function Home() {
  const [setOpen] = useStore((state) => [state.setOpen]);
  const { users } = useUsers(true);
  return (
    <div>
      <div>
        {users.map((user) => (
          <div
            key={user.id}
          >{`${user.firstName} ${user.lastName} ${user.email} ${user.dateOfBirth}`}</div>
        ))}
      </div>
      <button onClick={() => setOpen(true)}>Open</button>
      <Form />
    </div>
  );
}
