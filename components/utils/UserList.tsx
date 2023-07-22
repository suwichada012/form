"use client";
import { FC } from "react";
import { type User } from "./types";

interface Props {
  user: User;
}

const UserList: FC<Props> = ({ user }) => {
  return (
    <div className="flex gap-2 py-1 px-2 rounded bg-gray-200 flex-wrap text-sm">
      <div>{user.firstName}</div>
      <div>{user.lastName}</div>
      <div>{user.email}</div>
      <div>{user.dateOfBirth}</div>
    </div>
  );
};

export default UserList;
