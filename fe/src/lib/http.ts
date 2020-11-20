const http = async (url: string) => {
  const res = await fetch(`http://localhost:3000/${url}`);

  if (res.ok) {
    return res.json();
  }
};

export default http;
