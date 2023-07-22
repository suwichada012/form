if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not set");
}
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const URL_DATA = `${API_URL}/users`;
export const URL_DATA_WRONG = `${API_URL}/users_wrong`;
