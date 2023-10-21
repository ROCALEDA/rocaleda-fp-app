import API_URL from "./config";

const fetchData = async (
  endpoint: string,
  method: string = "GET",
  body?: any
) => {
  const options: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}/${endpoint}`, options);
  const data = await response.json();

  if (!response.ok) {
    console.log("data", data);
    const errorMessage = data.detail?.[0].msg || "Error occurred";
    throw new Error(errorMessage);
  }

  return { status: response.status, data };
};

export const login = async (email: string, password: string) => {
  return fetchData("auth", "POST", { email, password });
};