# Rental App

Airbnb-like accommodation rental app built with **FastAPI + SQLite** (backend) and **React + Vite** (frontend).

\---

## Project Structure

```
rental-app/
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── requirements.txt
│   ├── models/
│   │   └── models.py          # SQLAlchemy entities (Accommodation, Host, Country, User, ReservationList, Reservation)
│   ├── schemas/
│   │   └── schemas.py         # Pydantic schemas (Schema suffix, Create/Update DTOs)
│   ├── repository/
│   │   ├── accommodation\_repository.py
│   │   ├── host\_repository.py
│   │   ├── country\_repository.py
│   │   └── reservation\_repository.py
│   ├── service/
│   │   ├── accommodation\_service.py
│   │   ├── host\_service.py
│   │   ├── country\_service.py
│   │   └── reservation\_service.py
│   └── web/
│       ├── accommodation\_router.py
│       ├── host\_router.py
│       ├── country\_router.py
│       └── reservation\_router.py
│
└── frontend/
    ├── src/
    │   ├── repository/        # Axios calls (repository pattern)
    │   │   ├── api.js
    │   │   ├── accommodationRepository.js
    │   │   ├── hostRepository.js
    │   │   ├── countryRepository.js
    │   │   └── reservationRepository.js
    │   ├── components/
    │   │   ├── AccommodationCard.jsx
    │   │   ├── Modal.jsx
    │   │   └── Navbar.jsx
    │   └── pages/
    │       ├── HomePage.jsx
    │       ├── AccommodationsPage.jsx
    │       ├── AccommodationDetailPage.jsx
    │       ├── HostsPage.jsx
    │       ├── CountriesPage.jsx
    │       └── ReservationsPage.jsx
    ├── index.html
    └── vite.config.js
```

\---

## Running the Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

API runs at: http://localhost:8000  
Swagger UI: http://localhost:8000/docs

\---

## Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at: http://localhost:5173

\---

## API Endpoints

### Countries

* `GET /countries/` — list all
* `GET /countries/{id}` — get one
* `POST /countries/` — create
* `DELETE /countries/{id}` — delete

### Hosts

* `GET /hosts/` — list all
* `POST /hosts/` — create
* `DELETE /hosts/{id}` — delete

### Accommodations

* `GET /accommodations/` — list all
* `GET /accommodations/{id}` — get one
* `POST /accommodations/` — create
* `PUT /accommodations/{id}` — update
* `DELETE /accommodations/{id}` — delete
* `PATCH /accommodations/{id}/rent` — mark as rented

### Users \& Reservations

* `POST /users` — create user (also creates empty reservation list)
* `GET /users` — list users
* `GET /users/{id}/list` — get reservation list
* `POST /users/{id}/list` — add to list
* `DELETE /users/{id}/list` — clear list
* `POST /users/{id}/list/confirm` — confirm all (marks accommodations as rented)
* `DELETE /reservations/{id}` — remove single reservation

\---

## Frontend Routes

|Route|Page|
|-|-|
|`/`|Home — all accommodations with Details button|
|`/accommodations`|Full CRUD — add, edit, delete, mark rented|
|`/accommodations/:id`|Detail page|
|`/hosts`|List + add/delete hosts|
|`/countries`|List + add/delete countries|
|`/reservations`|Reservation list — add, remove, clear, confirm all|

\---

## Notes

* Data is stored in `rentals.db` (SQLite, auto-created on first run)
* Reservation list uses a fixed `USER\_ID = 1` — create that user first via `POST /users`
* Categories: `ROOM`, `HOUSE`, `FLAT`, `APARTMENT`, `HOTEL`, `MOTEL`

\---

## Testing

All API endpoints have been successfully tested via **Swagger UI** at `http://localhost:8000/docs`.

Tested operations include:

* Creating, updating, and deleting countries, hosts, and accommodations
* Marking an accommodation as rented
* Creating a user and their reservation list
* Adding accommodations to the reservation list
* Removing a single reservation from the list
* Clearing the entire reservation list
* Confirming all reservations (marks all accommodations as rented)

