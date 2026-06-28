import api from "./api";

export const getAllAccommodations = () => api.get("/accommodations/");

export const getAccommodationById = (id) => api.get(`/accommodations/${id}`);

export const createAccommodation = (data) => api.post("/accommodations/", data);

export const updateAccommodation = (id, data) => api.put(`/accommodations/${id}`, data);

export const deleteAccommodation = (id) => api.delete(`/accommodations/${id}`);

export const markAsRented = (id) => api.patch(`/accommodations/${id}/rent`);
