<p align="center">
  <img src="https://github.com/alexandengstrom/tweelon/assets/123507241/3fdd66a7-4e64-4c92-aa29-f2e705872e0e" alt="Tweelon logo" width="400"> 
  <h1>Tweelon</h1>
</p>

_Tweelon_ is my take on replicating something like Twitter. I started this project because I wanted to dive deep into web development, especially using tools and techniques I hadn't worked with before. Instead of just reading about the 'right' ways to do things, I decided to learn everything hands-on, even if it meant making mistakes along the way. This hands-on approach was more about getting a real feel for the process rather than aiming for perfection from the get-go. So, while Tweelon might have parts that don't match up with typical industry standards, it was a fantastic **learning** journey for me.

For those interested in seeing how it all turned out, there are images below showcasing the final product.

## Features
- **Auto-loading Feed**: New posts load dynamically as users scroll.
- **User Profiles**: Create and customize user profiles.
- **Embed Images in Posts**: Users have the capability to seamlessly embed images directly into their posts.
- **Post Interactions**: Engage with posts through likes and replies.
- **User Authentication**: Secure sign-in process facilitated by JSON web tokens.
- **Real-time Notifications**: Get immediate updates on user interactions with your posts through sockets.
- **Compatibility**: Tweelon is designed to provide a seamless experience for both desktop and mobile users.

## Tech Stack
- **Frontend**: Developed using React.js for a dynamic and interactive UI.
- **Backend**: The server-side runs on Node.js paired with the Express.js framework.
- **Database**: MongoDB, a NoSQL database, handles data storage.
- **Image Storage**: User images and media are stored and retrieved using Firebase Cloud Storage.

## Installation
#### Prerequisites

Before getting started, ensure you have the following tools installed on your machine:

1. **Node.js and npm**: Node.js is the runtime environment Tweelon's backend runs on. The Node.js package includes npm, the package manager for JavaScript libraries.
        Installation guide: [Node.js Official Download Page](https://nodejs.org/en)

2. **React**: Tweelon's frontend is built with React, a JavaScript library for building user interfaces.
        Installation guide (for a new project): [React's Official Documentation](https://react.dev/)

Once you have these tools installed, you can proceed with the installation of Tweelon as described in the subsequent sections.

#### Clone the repository:

```
git clone git@github.com:alexandengstrom/tweelon.git
```

#### Configuration
Before proceeding with the frontend or backend setups, ensure that you have created an **.env** file in the backend directory with the necessary environment variables:
```
cd backend
touch .env
```
Inside the **.env** file, add the following variables:
```
DB_PATH                      = 
TOKEN_SECRET_KEY             =
FIREBASE_API_KEY             = 
FIREBASE_MESSAGING_SENDER_ID = 
FIREBASE_APP_ID              = 
FIREBASE_MEASUREMENT_ID      =
```

**Make sure to provide values for each environment variable**. For security reasons, these variables should not be shared on GitHub. Although the **.env** file is listed in **.gitignore**, always double-check to ensure it hasn't been committed to your repository.

#### Frontend
Navigate to the frontend directory, install the necessary packages, and start the development server:
```
cd frontend
npm install
npm run dev
```
#### Backend
Similarly, navigate to the backend directory, install the required packages, and launch the server:
```
cd backend
npm install
npm start
```

## Further Enhancements and Improvements

In the development journey of Tweelon, while the primary focus was on learning and experimenting, there are certain areas and features that still need attention. Should this platform evolve into a more serious project or be prepared for deployment, several key enhancements and improvements would be essential:

1. **Unit Testing**: The current codebase does not include unit tests. As this project was more of a hands-on learning exercise, the emphasis was not on creating test suites. However, for a robust and production-ready application, implementing unit tests is crucial for stability and reliability.
2. **Route Validation**: Presently, only the login and register routes are validated in the backend. Before moving to a production environment, rigorous validation for all routes should be undertaken to ensure data integrity and prevent potential security breaches.
3. **Dynamic Updates in Frontend**: Some UI elements and features do not update dynamically. A case in point is the profile picture upload—after a new upload, a page refresh is necessary to visualize the change. For a seamless user experience, dynamic updates are essential.
4. **Notification Routes**: The notifications link to /route/postID, but the actual page and functionality for this specific route has not been implemented yet. Implementing this would allow users to directly engage with the related content, enhancing the user experience.
5. **Code Documentation**: The current project lacks comprehensive comments and documentation in the code. While it served its purpose as a personal learning tool, for collaborative development or further project evolution, more extensive commenting would be invaluable. It aids in understanding the logic, eases debugging, and simplifies any future development processes.

The above improvements have been noted, but due to shifting priorities and the commencement of more pressing projects, there hasn't been an opportunity to address these. Tweelon was invaluable as a learning tool, and these enhancements can serve as a roadmap for anyone looking to evolve this project further.

## Requirements

This project consists of a frontend and backend with the following dependencies:

### Frontend

- **axios**: ^1.4.0
- **jwt-decode**: ^3.1.2
- **lodash**: ^4.17.21
- **react**: ^18.2.0
- **react-dom**: ^18.2.0
- **react-infinite-scroll-component**: ^6.1.0
- **react-router-dom**: ^6.14.2
- **socket.io-client**: ^4.7.2

#### Development Dependencies:

- **@types/react**: ^18.2.15
- **@types/react-dom**: ^18.2.7
- **@vitejs/plugin-react**: ^4.0.3
- **eslint**: ^8.45.0
- **eslint-plugin-react**: ^7.32.2
- **eslint-plugin-react-hooks**: ^4.6.0
- **eslint-plugin-react-refresh**: ^0.4.3
- **vite**: ^4.4.5

### Backend

- **@hapi/joi**: ^17.1.1
- **bcryptjs**: ^2.4.3
- **cors**: ^2.8.5
- **dotenv**: ^16.3.1
- **express**: ^4.18.2
- **express-fileupload**: ^1.4.0
- **firebase**: ^10.1.0
- **joi**: ^17.9.2
- **jsonwebtoken**: ^9.0.1
- **mongoose**: ^7.4.2
- **socket.io**: ^4.7.2

#### Development Dependencies:

- **nodemon**: ^3.0.1

## Images

#### Desktop

Sign in page:
![Screenshot from 2023-08-11 08-43-53](https://github.com/alexandengstrom/tweelon/assets/123507241/2e38de94-bcff-4555-b2d9-5ba023caff78)

Feed:
![Screenshot from 2023-08-11 08-40-16](https://github.com/alexandengstrom/tweelon/assets/123507241/b890af9a-5925-4617-a670-1d304beb4fbf)

Notifications:
![Screenshot from 2023-08-11 08-42-58](https://github.com/alexandengstrom/tweelon/assets/123507241/64b20041-d380-4a63-909d-b1f4436a91db)

#### Mobile

Sign in page:

![Screenshot from 2023-08-11 08-44-27](https://github.com/alexandengstrom/tweelon/assets/123507241/5d502bcf-4a8f-4f9a-8308-cf4766839673)

Feed:

![Screenshot from 2023-08-11 08-44-53](https://github.com/alexandengstrom/tweelon/assets/123507241/d611c0d3-cf93-4f92-8eb6-95d796b9dafb)

Notifications:

![Screenshot from 2023-08-11 08-45-51](https://github.com/alexandengstrom/tweelon/assets/123507241/ab9e7996-624f-40e2-b13f-3c74f6c52e31)





