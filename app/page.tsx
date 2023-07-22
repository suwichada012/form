"use client";

import useUsers from "@components/utils/useUsers";
import UserList from "@components/utils/UserList";

export default function Home() {
  const { users, error } = useUsers(true);

  return (
    <div>
      <h3>Users</h3>
      {error && (
        <div className="text-red-500">
          Oops! Something went wrong. We are fixing it right now.
        </div>
      )}
      <div className="flex flex-col gap-1 mt-2">
        {users.map((user) => (
          <UserList key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
