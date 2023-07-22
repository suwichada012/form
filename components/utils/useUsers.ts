import useStore from "@components/utils/store";
import { useEffect } from "react";
import axios from "axios";
import { URL_DATA, URL_DATA_WRONG } from "utils";
import { type User } from "@components/utils/types";
import { usersSchema } from "@components/utils/types";
function useUsers(right: boolean) {
  const [users, setUsers, setFetchUsers] = useStore((state) => [
    state.users,
    state.setUsers,
    state.setFetchUsers,
  ]);

  async function fetchUsers() {
    const URL = right ? URL_DATA : URL_DATA_WRONG;
    const res = await axios.get<User[]>(URL);

    const result = usersSchema.safeParse(res.data);
    if (!result.success) {
      console.log({ error: result.error.issues });
      return;
    }
    setUsers(result.data);
  }

  useEffect(() => {
    fetchUsers();
    setFetchUsers(fetchUsers);
  }, []);

  return { users, fetchUsers };
}

export default useUsers;
