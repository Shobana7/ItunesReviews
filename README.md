# Itunes Reviews Viewer

The web application  fetches and displays new reviews from the last 5 days for the iTunes app. It consists of nodejs backend and a React frontend. The backend polls the App Store api every 5 mins.

## Technologies Used

### Backend

* Node.js
* Express.js
* Axios
* Socket.io
* fs (File System module)

### Frontend

* React
* Bootstrap
* Socket.io-client

## Setup Instructions

1. Clone the repository
   ```
     git clone <repoUrl>
    ```
3. Open a terminal and install frontend dependencies:
   ```
    npm install
    ```
5. In another terminal, navigate to the backend folder and install dependencies:
   ```
    cd backend
    npm install
   ```

7. Start the server:
   ```
     npm run dev
    ```
   The server should be running on localhost:3000

9. Start the frontend app:
    ```
    npm run dev
    ```
   You should be able to see the React app at localhost:5173
   
