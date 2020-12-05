import { navigate } from "svelte-routing";

const http = async (
  url: string,
  options?: { method: "POST" | "GET" | "PATCH"; body: string }
) => {
  const token = sessionStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const res = await fetch(`http://localhost:3000/${url}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    navigate("/auth");
    throw new Error("Unauthorized");
  }

  if (res.ok) {
    return res.json();
  }
};

export default http;
