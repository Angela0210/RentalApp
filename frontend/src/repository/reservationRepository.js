import api from "./api";

export const getReservationList = (userId) => api.get(`/users/${userId}/list`);

export const addToList = (userId, data) => api.post(`/users/${userId}/list`, data);

export const removeReservation = (reservationId) => api.delete(`/reservations/${reservationId}`);

export const clearList = (userId) => api.delete(`/users/${userId}/list`);

export const confirmAll = (userId) => api.post(`/users/${userId}/list/confirm`);
