"use client";
import useStore from "@components/utils/store";
import Form from "@components/form-rhf";
import useUsers from "@components/utils/useUsers";
import UserList from "@components/utils/UserList";

export default function Home() {
  const [setOpen] = useStore((state) => [state.setOpen]);
  const { users, isLoading } = useUsers(true);
  console.log({ isLoading });
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <button onClick={() => setOpen(true)}>Add User</button>
      <div className="flex flex-col gap-1 mt-2">
        {users.map((user) => (
          <UserList key={user.id} user={user} />
        ))}
      </div>

      <Form />
    </div>
  );
}
