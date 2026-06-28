import requests

BASE = "http://localhost:8000"

# 1. Countries
countries = [
    {"name": "Macedonia", "continent": "Europe"},
    {"name": "Germany", "continent": "Europe"},
    {"name": "Japan", "continent": "Asia"},
    {"name": "USA", "continent": "North America"},
    {"name": "France", "continent": "Europe"},
]

country_ids = []
for c in countries:
    r = requests.post(f"{BASE}/countries/", json=c)
    country_ids.append(r.json()["id"])
    print(f"Created country: {c['name']}")

# 2. Hosts
hosts = [
    {"name": "Marko", "surname": "Petrovski", "country_id": country_ids[0]},
    {"name": "Hans", "surname": "Müller", "country_id": country_ids[1]},
    {"name": "Yuki", "surname": "Tanaka", "country_id": country_ids[2]},
    {"name": "John", "surname": "Smith", "country_id": country_ids[3]},
    {"name": "Sophie", "surname": "Dupont", "country_id": country_ids[4]},
]

host_ids = []
for h in hosts:
    r = requests.post(f"{BASE}/hosts/", json=h)
    host_ids.append(r.json()["id"])
    print(f"Created host: {h['name']} {h['surname']}")

# 3. Accommodations
accommodations = [
    {"name": "Cozy Room in Skopje", "category": "ROOM", "host_id": host_ids[0], "numRooms": 1, "is_available": True},
    {"name": "Modern Flat in Berlin", "category": "FLAT", "host_id": host_ids[1], "numRooms": 2, "is_available": True},
    {"name": "Traditional House in Kyoto", "category": "HOUSE", "host_id": host_ids[2], "numRooms": 4, "is_available": True},
    {"name": "NYC Apartment", "category": "APARTMENT", "host_id": host_ids[3], "numRooms": 3, "is_available": True},
    {"name": "Paris Boutique Hotel", "category": "HOTEL", "host_id": host_ids[4], "numRooms": 10, "is_available": True},
    {"name": "Mountain Motel Mavrovo", "category": "MOTEL", "host_id": host_ids[0], "numRooms": 6, "is_available": True},
    {"name": "Studio Flat Munich", "category": "FLAT", "host_id": host_ids[1], "numRooms": 1, "is_available": False},
    {"name": "Beach House Ohrid", "category": "HOUSE", "host_id": host_ids[0], "numRooms": 5, "is_available": True},
]

for a in accommodations:
    requests.post(f"{BASE}/accommodations/", json=a)
    print(f"Created accommodation: {a['name']}")

# 4. User with reservation list
r = requests.post(f"{BASE}/users", json={"name": "Angela", "surname": "Janevska"})
user_id = r.json()["id"]
print(f"Created user: Angela Janevska (id={user_id})")

print("\nDone! Seed data loaded successfully.")
print(f"User ID for reservations: {user_id}")
