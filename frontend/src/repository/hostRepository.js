import api from "./api";

export const getAllHosts = () => api.get("/hosts/");

export const createHost = (data) => api.post("/hosts/", data);

export const deleteHost = (id) => api.delete(`/hosts/${id}`);
