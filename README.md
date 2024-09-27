# DreamStreamer 🎧

Welcome to **DreamStreamer**, a full-fledged music streaming platform that allows users to browse, play, and manage their favorite albums and tracks. This project integrates various AWS services to provide an efficient and scalable backend solution. 

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [AWS Services Used](#aws-services-used)
5. [Setup Instructions](#setup-instructions)
6. [Screenshots](#screenshots)

## Project Overview

DreamStreamer is a music streaming platform where users can stream tracks, view albums, browse by genre, and more. Admins can manage content through a custom dashboard. The platform features user authentication, media streaming from AWS S3, and a fully functional admin panel to manage albums, tracks, artists, and genres.

## Tech Stack

Frontend:
- **Vite** - Fast build tool for modern web projects.
- **Vue 3** - JavaScript framework for building user interfaces.
- **Tailwind CSS** - A utility-first CSS framework for rapid UI development.
- **Axios**: Promise-based HTTP client for the browser to communicate with the backend API.
- **AWS Amplify**: For easy integration with AWS Cognito (User Authentication).

Backend/Database:
- **AWS Lambda** - Serverless functions for API handling (CRUD operations).
- **Amazon RDS (MySQL)** - Database for storing albums, tracks, artists, and genres.
Other Services:
- **Amazon S3** - Storage for media files like album covers and mp3 files.
- **AWS API Gateway** - RESTful API to interact with Lambda functions.
- **AWS Cognito** - User authentication and verification.
- **AWS CloudFront** - CDN service for faster content delivery.

## Features

### User Facing Frontend:
- **Landing Page**: The introductory page of the application.
- **Home Page**: A curated view of albums and trending songs.
- **Search & Browse View**: Search for tracks or browse by genre or artist.
- **Album View**: Detailed view of an album with tracklist.
- **Browse Albums View**: Users can browse all available albums.
- **User Profile View**: Manage user information and change the password.

### Authentication:
- **Login Page**: Users can log in to access the platform.
- **Sign Up Page**: Users can create an account to access features.
- **User Profile Management**: Users can view their profile and update their password.

### Admin Portal:
- **Admin Dashboard**: Displays analytics and summary of albums, tracks, artists, and genres.
- **Manage Albums**: Admin can add, edit, or delete albums.
- **Manage Tracks**: Admin can add, edit, or delete tracks.
- **Manage Artists**: Admin can manage artists' information.
- **Manage Genres**: Admin can add, edit, or delete genres.

## AWS Services Used

### 1. **Amazon S3** - Media Storage:
   - Amazon S3 is used to store and deliver media files such as album covers and music tracks. It allows us to efficiently handle the large media files required for the platform.

### 2. **Amazon RDS (MySQL)** - Database:
   - All music metadata such as albums, tracks, artists, and genres are stored in Amazon RDS MySQL. RDS provides a scalable and reliable database solution.

### 3. **AWS Lambda** - Serverless Compute:
   - AWS Lambda handles the backend logic for CRUD operations (Create, Read, Update, Delete) on albums, tracks, genres, and artists. These functions are triggered by API Gateway requests.

### 4. **AWS API Gateway** - RESTful API:
   - API Gateway is used to manage all the API requests and serves as an interface between the client (Vue.js app) and AWS Lambda.

### 5. **AWS Cognito** - User Authentication:
   - AWS Cognito handles user sign-up, sign-in, and profile management. It ensures secure access to the platform with features like password resets and email verification.

### 6. **AWS CloudFront** - Content Delivery:
   - AWS CloudFront is integrated to optimize the delivery of static assets (images, CSS, JS), improving website performance and load times.

## Setup Instructions

### Prerequisites:
- Node.js and npm installed.
- AWS account set up with appropriate services.
- Vue CLI installed globally.

### Backend Setup:
1. **Amazon S3**: Set up an S3 bucket to host media files (album covers, music tracks).
2. **Amazon RDS**: Create a MySQL database in Amazon RDS and set up the tables for albums, tracks, artists, and genres.
3. **AWS Lambda**: Create Lambda functions to handle CRUD operations. These functions will be triggered via API Gateway.
4. **AWS Cognito**: Set up a Cognito user pool to manage user authentication.

### Frontend Setup:
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/DreamStreamer.git
   cd DreamStreamer

2. Install Dependencies:
   ```bash
   npm install
3. Configure AWS Amplify
   ```bash
   amplify configure
4. Start the vue.js application
   ```bash
   npm run dev

## Screenshots

### Landing Page
![Landing Page 1 0](https://github.com/user-attachments/assets/751ad27c-b108-43ec-83f4-7aa7e74345df)


### Home Page
![Home Page 1 0](https://github.com/user-attachments/assets/64e1c484-0673-44e7-a06f-605e5bac3a98)

### Browse Albums
![View All Albums](https://github.com/user-attachments/assets/112efd20-eb88-4a73-904b-e84ef9451da7)

### Admin Dashboard
![Admin Dashboard 1 0](https://github.com/user-attachments/assets/60695676-f2e3-4ff4-ba3d-7d7fc19b8a04)
![Admin Dashboard 1 1](https://github.com/user-attachments/assets/8aade5c5-7f35-490b-89e7-9f23c413451a)


   




