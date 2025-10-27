# Foodmine Backend

## Stack

- Express.js (^4.19.2)
- MongoDB (Atlas or external, via mongoose ^8.5.3)
- TypeScript (^5.5.4)

## Endpoints

### User

- `GET    /api/users/seed` — Seed users
- `POST   /api/users/login` — User login
- `POST   /api/users/register` — User registration

### Food

- `GET    /api/foods/seed` — Seed foods
- `GET    /api/foods/` — Get all foods
- `GET    /api/foods/search/:searchTerm` — Search foods by name
- `GET    /api/foods/tags` — Get all tags
- `GET    /api/foods/tag/:tagName` — Get foods by tag
- `GET    /api/foods/:foodId` — Get food by id

### Order (requires authentication)

- `POST   /api/orders/create` — Create order
- `GET    /api/orders/newOrderForCurrentUser` — Get new order for current user
- `POST   /api/orders/pay` — Pay for order
- `GET    /api/orders/track/:id` — Track order by id

## How to run

### Development

1. Install dependencies:
   ```sh
   npm install
   ```
2. Fill in `.env` (see example in `.env.example`)
3. Start MongoDB (or use external Atlas)
4. Start the server:
   ```sh
   npm run start
   ```

### Production (Docker Compose)

1. Make sure the `MONGO_URI` variable points to your external MongoDB
2. Build and run:
   ```sh
   docker-compose up --build
   ```
3. The server will be available at http://localhost:5004/
