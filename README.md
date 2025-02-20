# NextPlay

## Overview

This web app allows users to:

- View currently popular games.
- View upcoming game releases.
- Add games to their library.

The project is built with **React (TypeScript + Vite)**, and it uses **Supabase (postgreSQL)** for authentication and database management, along with **Express** for running the server and the **IGDB API** for game-related data.

---

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/TannerGalloway/NextPlay.git
cd NextPlay
```

### 2. Install Dependencies

### Client:
```sh
cd /client
npm install
```
### Server:
```sh
cd /server
npm install
```

### 3. Create Environment Variables

You will need API keys from **Supabase** and **IGDB**. Create a `.env` file in the root of the `client` and `server` directory and add the following keys:

### Client:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
### Server:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
CLIENT_ID=your_igdb_client_id
ACCESS_TOKEN=your_igdb_access_token
```

#### **Getting Supabase Keys**

1. Go to [Supabase](https://supabase.com/).
2. Create a new project.
3. Navigate to **Settings > API** and copy the **Project URL** and **Anon Key**.

#### **Getting IGDB API Keys**

1. Sign up at [IGDB](https://api.igdb.com/).
2. Get your **Client ID** and **Access Token** by following their API documentation.

### 4. Run the Development Server

### Client:
```sh
npm run dev
```
The project should now be running at [http://localhost:5173/](http://localhost:5173/).

### Server:
```sh
npm run express-dev
```

The project should now be running at [http://localhost:8080/](http://localhost:8080).

---

## Deployment

For deployment, ensure your environment variables are set up in your hosting provider. Then have the `server` directory be listed as the root. Build the project:

```sh
npm run build
npm run start
```

And deploy according to your chosen platform's instructions.

---

## Contributing

Feel free to open an issue or submit a pull request if you have improvements or bug fixes.

---

## License

This project is licensed under the MIT License.

