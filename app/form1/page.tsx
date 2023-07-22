"use client";
import useStore from "@components/utils/store";

import FormVanilla from "@components/form-vanilla";
import useUsers from "@components/utils/useUsers";
import UserList from "@components/utils/UserList";

export default function Form1() {
  const [setOpen] = useStore((state) => [state.setOpen]);
  const { users } = useUsers(true);
  return (
    <div>
      <h3>Vanilla React Form</h3>
      <button onClick={() => setOpen(true)}>Add User</button>
      <div className="flex flex-col gap-1 mt-2">
        {users.map((user) => (
          <UserList key={user.id} user={user} />
        ))}
      </div>
      <FormVanilla />
    </div>
  );
}
