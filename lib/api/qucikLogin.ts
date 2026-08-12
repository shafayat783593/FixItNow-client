import { serverFetch } from "./serverFetch";



export async function quickLogin(credentials: { email: string; password: string }) {
  const res = await serverFetch("/api/auth/login", {
    method: "POST",
    body: credentials,
  });
  return res;
}