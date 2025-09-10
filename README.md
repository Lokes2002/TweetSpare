# TweetSpare – Social Media Platform

TweetSpare is a full-stack social media platform inspired by Twitter. It allows users to post text, images, and videos, interact via likes, dislikes, and comments, manage profiles, follow/unfollow users, and communicate through chat and direct messages. Hashtags make content searchable, and post views provide engagement insights.

The frontend is built with React, using functional components, hooks, and Redux for real-time state management. The backend uses Spring Boot with RESTful APIs to manage users, posts, comments, likes, messages, and profiles, secured with JWT authentication. The database is implemented with MySQL and JPA/Hibernate for efficient data management.

---

## Table of Contents
1. [Project Overview](#project-overview)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Architecture](#architecture)  
5. [Frontend](#frontend)  
6. [Backend](#backend)  
7. [Database](#database)  
8. [State Management](#state-management)  
9. [Authentication](#authentication)  
10. [Challenges Faced](#challenges-faced)  
11. [Future Enhancements](#future-enhancements)  
12. [Setup Instructions](#setup-instructions)  
13. [Screenshots](#screenshots)  

---

## Project Overview

TweetSpare is designed to mimic the core functionalities of a modern social media platform. Users can create posts, share media content, engage with other users’ content, and communicate privately through direct messages. This project was built solo, giving complete ownership of both frontend and backend development. The application emphasizes usability, responsiveness, and real-time updates for an engaging user experience.

---

## Features

- **Post Tweets**: Users can post text, images, and videos.  
- **Likes/Dislikes**: Users can express reactions to posts.  
- **Comments**: Users can comment on tweets and reply to others.  
- **Profile Management**: Users can update bio, profile picture, background image, and see followers/following.  
- **Hashtags**: Posts can include hashtags for better organization and searchability.  
- **Real-time Views**: Posts show the number of views.  
- **Follow/Unfollow**: Users can manage connections.  
- **Chat & Messaging**: Direct messaging to communicate with followers.  
- **Search**: Users can search tweets, hashtags, or other users.  
- **Responsive Design**: Works across desktop and mobile devices.  

---

## Tech Stack

**Frontend:**  
- React.js  
- Redux for state management  
- Material-UI for styling  
- Axios for API requests  

**Backend:**  
- Spring Boot (Java)  
- REST APIs  
- JWT for secure authentication  

**Database:**  
- MySQL  
- JPA/Hibernate for ORM  

---

## Architecture

The application follows a **client-server architecture**:  

- **Frontend**: React handles UI components, forms, and state. Redux manages application-wide state to ensure consistent data flow. Axios communicates with backend APIs.  
- **Backend**: Spring Boot exposes RESTful endpoints for user management, tweets, likes, comments, and messaging. JWT tokens ensure secure access.  
- **Database**: MySQL stores users, tweets, likes, comments, chat messages, and follower relationships.  

The system is modular, allowing each feature to function independently while integrating seamlessly with the rest of the application.

---

## Frontend

- Designed using **React functional components** and hooks like `useState`, `useEffect`, `useSelector`, and `useDispatch`.  
- **Formik** and **Yup** are used for form validation.  
- Components include: `HomeSection`, `TweetCard`, `Profile`, `Chat`, `Navigation`, etc.  
- Integrated **dark mode** and responsive design for better UX.  
- Axios interceptors handle JWT tokens and API requests efficiently.  

---

## Backend

- Built with **Spring Boot**, exposing REST endpoints for all features: authentication, tweets, comments, likes, messages, and profiles.  
- Used **Spring Security** for JWT-based authentication and authorization.  
- Controllers handle requests, Services contain business logic, and Repositories interact with the database.  
- Error handling and validation implemented for robust API responses.  

---

## Database

- **Users Table**: Stores user info including email, password, bio, profile image, followers, following, and registration details.  
- **Tweets Table**: Stores tweet text, media links, user references, and timestamps.  
- **Comments Table**: Stores replies and nested comments.  
- **Likes Table**: Tracks user likes/dislikes for each tweet.  
- **Messages Table**: Stores chat messages with sender, receiver, and timestamps.  

---

## State Management

- **Redux** centralizes the application state for user sessions, tweet feeds, and notifications.  
- Actions and reducers manage the creation, update, and deletion of tweets, comments, likes, and messages.  
- Ensures that the frontend is reactive and reflects the latest backend data instantly.  

---

## Authentication

- **JWT Tokens**: Generated at login and stored in localStorage.  
- Secure endpoints ensure only authenticated users can post, comment, or send messages.  
- Token validation occurs at each API request for robust security.  

---

## Challenges Faced

1. **Redux State Management**: Ensuring tweet feed updated in real-time was tricky; solved by carefully structuring actions and reducers.  
2. **Infinite Loops in React**: Fixed issues with `useEffect` dependencies.  
3. **Backend Mapping**: Avoided StackOverflowError by creating simplified DTOs for followers/following lists.  
4. **Media Handling**: Ensured images and videos are correctly uploaded and displayed without cropping or resizing issues.  

---

## Future Enhancements

- Deploy the full application on cloud platforms.  
- Add notifications for likes, comments, and messages.  
- Group chat functionality for multiple users.  
- Advanced analytics to track user engagement and popular hashtags.  
- Improve AI-based content moderation for media posts.  

---

## Setup Instructions

**Frontend:**  
1. Clone the repository: `git clone <repo-url>`  
2. Navigate to frontend folder: `cd frontend`  
3. Install dependencies: `npm install`  
4. Start the app: `npm start`  

**Backend:**  
1. Navigate to backend folder: `cd backend`  
2. Configure database in `application.properties`  
3. Build project: `mvn clean install`  
4. Run Spring Boot app: `mvn spring-boot:run`  

---

## Screenshots

*(Add screenshots of homepage, profile, tweet feed, chat, etc. to make it visually appealing.)*  

---

**Conclusion**  
TweetSpare is a comprehensive full-stack social media project that showcases **frontend, backend, database, and full-stack integration skills**. Building it solo allowed me to gain deep understanding of modern web development, problem-solving, and project management.

---


