const baseURL = "http://43.201.103.199";

export const getAll = async () => {
  const response = await axios.get(`${baseURL}/posts`);
  return response;
};
export const getDetail = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/post/${id}`);
    return response;
  } catch (err) {
    return err;
  }
};
export const uploadPost = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/post`, {
      title: data.title,
      content: data.content,
      image: data.image,
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const removeItem = async (id) => {
  const response = await axios.delete(`${baseURL}/post/${id}`);
  return response;
};

export const editItem = async (data, text) => {
  try {
    const response = await axios.patch(`${baseURL}/post/${data.postId}`, {
      title: text.title,
      content: text.content,
      image: data.image,
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const uploadComment = async (data, text) => {
  try {
    const response = await axios.post(
      `${baseURL}/comment/${data.post.postId}`,
      {
        content: text,
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const deleteComment = async (data) => {
  try {
    const response = await axios.delete(`${baseURL}/comment/${data}`);
    return response;
  } catch (err) {
    console.log(err);
  }
};
