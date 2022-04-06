import axios from "../configApi";
import { removeEmptyObject } from "common/helpers";

export const getUsersAPI = async params => {
  try {
    const res = await axios.get(`/users`, {
      params: removeEmptyObject(params)
    });

    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updatePermissionUser = async params => {
  try {
    const res = await axios.post(`/users/${params.userId}/set-permission`, {
      role: params.role
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateUser = async user => {
  try {
    const res = await axios.put(`/users/${user.userId}`, user.form);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateMyProfile = async user => {
  try {
    const res = await axios.put(`/auth/profile`, {
      displayName: user.displayName,
      phone: user.phone
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteUser = async id => {
  try {
    const res = await axios.delete(`/users/${id}`);

    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserAPI = async id => {
  try {
    const res = await axios.get(`/users/${id}`);

    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
