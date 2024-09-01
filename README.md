
# **Dashboard Application**

This project is a Dashboard Application built using Angular 16+. It demonstrates a well-structured modular architecture, adhering to best practices in component design, routing, services, state management with NgRx, and API integration.

## **Table of Contents**

- [Project Overview](#project-overview)
- [Features](#features)
- [Technical Requirements](#technical-requirements)
- [Setup and Installation](#setup-and-installation)
- [Folder Structure](#folder-structure)
- [Usage](#usage)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Additional Features](#additional-features)
- [Contributing](#contributing)
- [License](#license)

## **Project Overview**

The Dashboard Application is designed to manage user authentication and user data. It consists of two main modules:

1. **Auth Module**: Handles user authentication (login).
2. **Users Module**: Manages user data, including listing, creating, updating, deleting, and viewing user profiles.

## **Features**

- **Auth Module**:
  - Login form with username and password fields.
  - Authentication against a real endpoint.
  - Error messages for invalid login attempts.
  - Redirection to the Users module upon successful login.

- **Users Module**:
  - List users with functionalities to sort, filter, create, update, delete, and toggle activation status.
  - User profile view and edit capabilities.
  - Form validation and error handling for user creation and updates.
  
- **State Management**:
  - State management using NgRx for handling authentication and user data.

- **API Integration**:
  - Integrated with provided API endpoints using Angular services.

## **Technical Requirements**

- Angular 16+
- Angular CLI for project setup and management
- Lazy loading for modules
- Angular Reactive Forms for handling forms
- Angular Material for UI components and layout
- SOLID principles for clean code
- NgRx for state management

## **Setup and Installation**

To set up and run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd dashboard-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   ng serve
   ```

   The application will be available at `http://localhost:4200/`.

4. **Environment Configuration:**

   Make sure to configure your environment files (`src/environments`) with the correct API URLs provided in the Postman environment.

## **Folder Structure**

The folder structure of the application is as follows:

```
/src
  /app
    /core                   // Core services, interceptors, and guards
    /shared                 // Shared modules, components, and utilities
    /auth                   // Authentication module
    /users                  // Users module
    /state                  // Root state management
    /environments           // Environment configuration
  /assets                   // Images, styles, etc.
  /environments             // Environment configuration files
```

## **Usage**

- **Login**: Use the login page to authenticate users.
- **User Management**: After logging in, you can view the list of users, create new users, edit existing users, and delete or deactivate users.
- **User Profile**: View detailed information for individual users and navigate to the edit form.

## **State Management**

The application uses NgRx for state management:

- **Auth State**: Manages authentication status and user details.
- **User State**: Manages user list, sorting, filtering, and individual user details.

NgRx is configured to handle asynchronous operations and manage application state in a reactive way.

## **API Integration**

The application integrates with provided API endpoints for:

- User authentication (login).
- Fetching, creating, updating, and deleting user data.

Ensure to use the Postman collection and environment to test the APIs and endpoints.

## **Additional Features**

- **Responsive Design**: The application uses Angular Material components for a modern and responsive UI.
- **Error Handling**: Comprehensive error handling and validation throughout the application.
- **Loading Indicators**: Displays loading indicators for API calls and data fetching.

## **Contributing**

If you wish to contribute to the project, please fork the repository and submit a pull request.

## **License**

This project is licensed under the MIT License.
