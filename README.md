# Tweelon

Tweelon is a basic replication of Twitter, aimed primarily at exploring the basics of web development using new-to-me technologies. As a result, certain aspects of the project might deviate from established best practices, as the primary goal was learning through hands-on experimentation.

## Features
- **Auto-loading Feed**: New posts load dynamically as users scroll.
- **User Profiles**: Create and customize user profiles.
- **Embed Images in Posts**: Users have the capability to seamlessly embed images directly into their posts.
- **Post Interactions**: Engage with posts through likes and replies.
- **User Authentication**: Secure sign-in process facilitated by JSON web tokens.
- **Real-time Notifications**: Get immediate updates on user interactions with your posts through sockets.
- **Compatibility**: Tweelon is designed to provide a seamless experience for both desktop and mobile users.

## Tech Stack
- **Database**: MongoDB, a NoSQL database, handles data storage.
- **Frontend**: Developed using React.js for a dynamic and interactive UI.
- **Backend**: The server-side runs on Node.js paired with the Express.js framework.
- **Image Storage**: User images and media are stored and retrieved using Firebase Cloud Storage.

## Installation
To get the project up and running on your local machine:

```
git clone git@github.com:alexandengstrom/tweelon.git
```

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




