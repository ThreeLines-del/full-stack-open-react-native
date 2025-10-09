# Rate Repository Application

A full-stack mobile application for rating and reviewing GitHub repositories. This project consists of a GraphQL API backend and a React Native mobile application built with Expo.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

## 🎯 Overview

Rate Repository is a mobile application that allows users to:

- Browse and search GitHub repositories
- Rate and review repositories
- View repository statistics and details
- Authenticate and manage their reviews

The application consists of two main parts:

1. **rate-repository-api**: A GraphQL API that serves as the backend
2. **rate-repository-app**: A React Native mobile application

## ✨ Features

- **User Authentication**: Secure JWT-based authentication
- **Repository Browsing**: Browse repositories with sorting and filtering options
- **Repository Details**: View detailed information about repositories including statistics
- **Review System**: Create, view, and delete reviews for repositories
- **User Management**: User registration and profile management
- **Responsive Design**: Mobile-first design that works across different screen sizes
- **Real-time Updates**: GraphQL subscriptions for real-time data

## 🛠 Technologies

### Backend (API)

- Node.js
- Express.js
- Apollo Server (GraphQL)
- SQLite with Objection.js ORM
- Knex.js for migrations
- JWT for authentication
- GitHub API integration

### Frontend (App)

- React Native
- Expo
- Apollo Client (GraphQL)
- React Router Native
- Formik & Yup (form handling & validation)
- React Native Paper (UI components)
- AsyncStorage for local data persistence
- Jest & React Testing Library (testing)

## ✔️ Prerequisites

- Node.js v20 or higher
- npm or yarn
- Git
- A GitHub account (for OAuth application registration)
- Expo Go app on your mobile device (optional, for testing on physical device)

## 📁 Project Structure

```
full-stack-open-react-native/
├── rate-repository-api/          # GraphQL API backend
│   ├── src/
│   │   ├── graphql/              # GraphQL schema, queries, mutations
│   │   ├── models/               # Database models
│   │   ├── utils/                # Utility functions
│   │   └── api/                  # API integrations
│   ├── migrations/               # Database migrations
│   ├── seeds/                    # Seed data
│   └── package.json
│
└── rate-repository-app/          # React Native mobile app
    ├── src/
    │   ├── components/           # React components
    │   ├── graphql/              # GraphQL queries & mutations
    │   ├── hooks/                # Custom React hooks
    │   ├── utils/                # Utility functions
    │   └── __tests__/            # Test files
    └── package.json
```

## 🚀 Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ThreeLines-del/full-stack-open-react-native.git
cd full-stack-open-react-native
```

### 2. Setup the Backend (API)

#### Install Dependencies

```bash
cd rate-repository-api
npm install
```

#### Register GitHub OAuth Application

1. Go to [GitHub Developer Settings](https://github.com/settings/applications/new)
2. Register a new OAuth application:
   - **Application name**: Rate Repository API
   - **Homepage URL**: https://github.com/Kaltsoon/rate-repository-api
   - **Authorization callback URL**: http://localhost:4000 (or your preferred port)
3. Note your **Client ID** and **Client Secret**

#### Configure Environment Variables

Create a `.env` file in the `rate-repository-api` directory:

```bash
cp .env.template .env
```

Edit the `.env` file and add your GitHub OAuth credentials:

```
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
JWT_SECRET=your_jwt_secret
PORT=4000
```

**Note**: Replace the placeholder values with your actual credentials. Never commit this file to version control.

#### Setup Database

```bash
npm run build
```

This command will:

- Create the SQLite database
- Run all migrations

#### Seed Database (Optional)

To populate the database with sample data:

```bash
npm run seed:run
```

**⚠️ Warning**: This will remove all existing data from the database.

### 3. Setup the Frontend (App)

#### Install Dependencies

```bash
cd ../rate-repository-app
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `rate-repository-app` directory:

```
ENV=development
APOLLO_URI=http://localhost:4000/graphql
```

**Note**: If testing on a physical device, replace `localhost` with your computer's local IP address.

## 🏃 Running the Application

### Start the Backend API

```bash
cd rate-repository-api
npm start
```

The API will be available at http://localhost:4000

You can access the Apollo Sandbox at http://localhost:4000 for testing GraphQL queries.

### Start the Mobile App

```bash
cd rate-repository-app
npm start
```

This will start the Expo development server. You can then:

- Press `w` to open in web browser
- Press `a` to open in Android emulator
- Press `i` to open in iOS simulator
- Scan the QR code with Expo Go app on your mobile device

## 🧪 Testing

### API Tests

```bash
cd rate-repository-api
npm test
```

### App Tests

```bash
cd rate-repository-app
npm test
```

### Linting

**API:**

```bash
cd rate-repository-api
npm run lint
```

**App:**

```bash
cd rate-repository-app
npm run lint
```

## 📖 API Documentation

The GraphQL API provides the following main operations:

### Queries

- `repositories`: List all repositories with pagination and filtering
- `repository`: Get a single repository by ID
- `me`: Get current authenticated user
- `users`: List all users

### Mutations

- `authenticate`: Login and get access token
- `createUser`: Register a new user
- `createReview`: Create a review for a repository
- `deleteReview`: Delete a review

### Authentication

To access protected routes, include the JWT token in the Authorization header:

```
Authorization: Bearer <your_access_token>
```

Access tokens expire after 7 days.

### Default Test Users

If you seeded the database, the following test users are available:

- Username: `kalle`, Password: `password`
- Username: `elina`, Password: `password`
- Username: `matti`, Password: `password`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](rate-repository-api/LICENSE) file for details.

## 🐛 Issues & Support

Found a bug or have a question? Please [open an issue](https://github.com/ThreeLines-del/full-stack-open-react-native/issues).

## 🙏 Acknowledgments

- Part of the [Full Stack Open](https://fullstackopen.com/) course by University of Helsinki
- Original API template by [Kaltsoon](https://github.com/Kaltsoon/rate-repository-api)

## 📚 Additional Resources

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [Apollo GraphQL Documentation](https://www.apollographql.com/docs/)
- [Full Stack Open Course](https://fullstackopen.com/en/part10)
