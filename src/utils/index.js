import axios from "axios";

export const noAuthFetcher = async (url) => {
  try {
    const res = await axios.get(import.meta.env.VITE_APP_BASE_API + url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return res.data; // Axios automatically parses JSON
  } catch (error) {
    // Axios wraps non-2xx responses in error.response
    if (error.response) {
      // Server responded with a status other than 2xx
      return Promise.reject(error.response.data);
    } else {
      // Network error or other
      return Promise.reject({ message: error.message });
    }
  }
};

export const noAuthUpdater = async ({
  url,
  method = "GET",
  body = null,
  responseType = "json",
}) => {
  try {
    let headers = { Accept: "application/json" };
    let dataToSend = body;

    // If body contains a file, convert to FormData
    if (body && body.pdf) {
      const formData = new FormData();
      formData.append("pdf", body.pdf);
      dataToSend = formData;
      // DO NOT set Content-Type manually; Axios sets it automatically
    }

    const res = await axios({
      url: import.meta.env.VITE_APP_BASE_API + url,
      method,
      headers,
      data: dataToSend,
      responseType,
    });

    return res.data;
  } catch (error) {
    if (error.response) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject({ message: error.message });
    }
  }
};
