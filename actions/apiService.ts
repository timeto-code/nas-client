import http from "./httpService";

export const fetchData = async (url: string, params = {}) => {
  try {
    const response = await http.get(url, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postData = async (url: string, data: any) => {
  try {
    const response = await http.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateData = async (url: string, data: any) => {
  try {
    const response = await http.put(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (url: string) => {
  try {
    const response = await http.delete(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};
