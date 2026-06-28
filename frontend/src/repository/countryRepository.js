import api from "./api";

export const getAllCountries = () => api.get("/countries/");

export const createCountry = (data) => api.post("/countries/", data);

export const deleteCountry = (id) => api.delete(`/countries/${id}`);
