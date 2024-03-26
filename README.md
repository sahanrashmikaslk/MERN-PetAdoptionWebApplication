# Pet Adoption Web Application using MERN

![Pet Adoption Web Application](./ScreenShots/loginpage.png)

This is a MERN (MongoDB, Express.js, React.js, Node.js) stack project for a Pet Adoption Web Application. Users can view available pets for adoption, add new pets for adoption, and adopt pets.

## Features

- User authentication: Users can sign up, log in, and log out.
- CRUD operations: Users can perform CRUD (Create, Read, Update, Delete) operations on pet listings.
- Image upload: Users can upload images of pets they want to put up for adoption.
- Search functionality: Users can search for pets based on various parameters such as breed, age, etc.
- Responsive design: The application is responsive and works seamlessly on various devices.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/sahanrashmikaslk/MERN-PetAdoptationWebApplication.git
   ```

2. Navigate to the project directory:

   ```
   cd MERN-PetAdoptationWebApplication
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Set up environment variables:

   Create a `.env` file in the root directory and add the following variables:

   ```
   MONGODB_URI=<your_mongodb_uri>
   JWT_SECRET=<your_jwt_secret>
   ```

5. Run the development server:

   ```
   npm run dev
   ```

6. Open http://localhost:3000 or whatever port in your browser to view the application.

## Technologies Used

- **Frontend**
  - React.js
  - Redux (for state management)
  - Bootstrap (for styling)
- **Backend**
  - Node.js
  - Express.js
  - MongoDB (with Mongoose ODM)
- **Authentication**
  - JSON Web Tokens (JWT)
- **Others**
  - Axios (for making HTTP requests)
  - Cloudinary (for image uploading)

## Acknowledgments

- This project was inspired by the love for animals and the desire to help them find loving homes.
  
