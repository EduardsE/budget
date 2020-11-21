const http = async (
  url: string,
  options: { method: "POST" | "GET"; body: string }
) => {
  const res = await fetch(`http://localhost:3000/${url}`, options);

  if (res.ok) {
    return res.json();
  }
};

export default http;
