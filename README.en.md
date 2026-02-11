# myvue

This project includes a simple profile input app built with Vue 3 + Vite and a json-server CRUD demo.

## Tech Stack

- Vue 3 + TypeScript
- Vite
- Vue Router
- Vuetify (UI)
- json-server (REST CRUD mock API)

## Features

- Profile input (name/email) with local storage
- View saved values on the About page
- Users/Posts CRUD demo at `/apiRest`

## Folder Summary

- src/views/HomeView.vue: profile input
- src/views/AboutView.vue: saved values
- src/views/ApiRestView.vue: json-server CRUD demo
- db.json: json-server data

## Install

```sh
npm install
```

## Run

### 1) Frontend

```sh
npm run dev
```

### 2) json-server

```sh
npm run api
```

## Usage

- Home: enter name/email and save
- About: view saved values
- API: test Users/Posts CRUD at `/apiRest`

## Dev Notes

- json-server default port: 3000
- Vite default port: 5173
- Data file: `db.json`


## Troubleshooting

- If `npm run api` fails, check the `db.json` path and port.
- If ports conflict, change the `db.json` server port.
	- Example: `json-server --watch db.json --port 3001`
