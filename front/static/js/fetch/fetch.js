const baseURL = "http://43.201.103.199";

export const getAll = async () => {
  const response = await axios.get(`${baseURL}/posts`);
  return response.data;
};
