# Dealer Inventory Tracker

Note: 
The Backend github repository is at:
https://github.com/BusyBiee1/2025-02-20-FinalCapstoneDealerINV-BackEnd.git
The Fronend github repository is at:
https://github.com/BusyBiee1/2025-02-20-FinalCapstoneDealerINV-FrontEnd.git

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Key Features](#key-features)
5. [Setup and Installation](#setup-and-installation)
6. [Usage](#usage)
7. [API Endpoints](#api-endpoints)
8. [State Management](#state-management)
9. [Routing](#routing)
10. [Styling](#styling)
11. [Error Handling](#error-handling)
12. [Future Enhancements](#future-enhancements)
13. [Details of React state and hooks in this application](#Details-UseOfStateHooks)

## Project Overview
Dealer Inventory Tracker is a full-stack web application designed to help vehicle dealerships manage their inventory efficiently. It provides features for user authentication, adding new vehicles, searching the inventory, and managing vehicle details.

## Technology Stack
- **Frontend:**
  - React (v19.0.0)
  - React Router (v7.2.0)
  - Axios for API calls
  - Vite as the build tool
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (assumed based on project structure)
- **Development Tools:**
  - ESLint for code linting
  - Git for version control

## Project Structure
The project is divided into two main parts: frontend and backend.

### Frontend Structure
frontend/
├── public/
│ ├── DealerInvTracker.png
│ ├── favicon.png
│ └── vite.svg
├── src/
│ ├── assets/
│ ├── components/
│ ├── pages/
│ ├── styles/
│ ├── utils/
│ ├── App.jsx
│ ├── index.css
│ └── main.jsx
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
└── vite.config.js

### Backend Structure
backend/
├── config/
├── controllers/
├── models/
├── routes/
├── .env
├── .gitignore
├── package.json
└── server.mjs

### Comprehensive Project Structure
Fullstack-A-DealerInventory (project-root)/
├── backend/
│   ├── config/
│   │   └── db.mjs
│   ├── controllers/
│   │   ├── userController.mjs
│   │   └── VehicleController.mjs
│   ├── models/
│   │   ├── User.mjs
│   │   └── Vehicle.mjs
│   ├── routes/
│   │   ├── users.mjs
│   │   └── vehicles.mjs
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── server.mjs
│
└── frontend/
    ├── public/
    │   ├── DealerInvTracker.png
    │   ├── favicon.png
    │   └── vite.svg
    ├── src/
    │   ├── assets/
    │   │   ├── images/
    │   │   │   ├── banner-old.jpg
    │   │   │   ├── banner.jpg
    │   │   │   └── banner.png
    │   │   └── react.svg
    │   ├── components/
    │   │   ├── Add.jsx
    │   │   ├── Banner.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Login.jsx
    │   │   ├── Navigation.jsx
    │   │   ├── Register.jsx
    │   │   ├── Search.jsx
    │   │   └── VehicleTable.jsx
    │   ├── pages/
    │   │   ├── AddPage.jsx
    │   │   ├── DashboardPage.jsx
    │   │   ├── HomePage.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   └── SearchPage.jsx
    │   ├── styles/
    │   │   ├── Add.css
    │   │   ├── App.css
    │   │   ├── Banner.css
    │   │   ├── Login.css
    │   │   ├── Navigation.css
    │   │   ├── Register.css
    │   │   ├── Search.css
    │   │   └── VehicleTable.css
    │   ├── utils/
    │   │   └── errorHandler.jsx
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── .env
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── vite.config.js

## Key Features
1. User Authentication (Login/Register)
2. Dashboard for overview
3. Add new vehicles to inventory
4. Search functionality for vehicles
5. Edit and delete vehicle information
6. Responsive design

## Setup and Installation
1. Clone the repository
2. Navigate to the frontend directory:
cd frontend
npm install
3. Navigate to the backend directory:
cd ../backend
npm install
4. Set up environment variables in both frontend and backend `.env` files
5. Start the backend server:
npm start
6. Start the frontend development server:
cd ../frontend
npm run dev


## Usage
After starting both servers, navigate to `http://localhost:3000` in your browser to use the application.

## API Endpoints

- `VEHICLE`
- `/api/vehicles`: ALL 4 CRUD operations for vehicles
   1. Get / Read
        eg http://localhost:3000/api/vehicles
        and
        Search vehicles by make, model, color, year
        eg http://localhost:3000/api/vehicles/search?make=Tesla
   2. Post / Create
        eg http://localhost:3000/api/vehicles
        eg post request with body:{"make": "Honda","model": "Camry","year": "2020","color": "White")
   3. Put  / Patch / Update
        eg http://localhost:3000/api/vehicles/search/12
        eg put request with body:{"make": "Honda", "model": "Camry", "year": "2005", "color": "White"}
   4. Delete
        eg http://localhost:3000/api/vehicles/search?12

- `USER`
- `/api/users/login`: User login
   1. Post / Register a new user
    eg: http://localhost:3000/api/users/register
    eg: post request with body: {"username":"user1","password":"password1","firstname":"User","lastname":"One"}
- `/api/users/register`: User registration
   2. Post / Login a new user
    eg: http://localhost:3000/api/users/login
    eg: post request with body: {"username":"user1","password":"password1"}

   
## State Management
- React's useState hook is used for local component state
- useEffect hook is used for side effects like fetching data and checking login status
- Context API could be implemented for global state management (if needed in future iterations)

## Routing
React Router is used for client-side routing. The main routes are:
- `/`: Home page
- `/login`: Login page
- `/register`: Registration page
- `/search`: Search inventory (protected route)

## Styling
CSS modules are used for component-specific styling. Each component has its own CSS file in the `styles/` directory.

## Error Handling
- A custom `errorHandler.jsx` utility is used for consistent error handling across the application
- Axios interceptors could be implemented for global API error handling

## Future Enhancements
1. Implement pagination for large inventories
2. Add more detailed analytics on the dashboard
3. Implement a more robust state management solution like Redux if the application grows in complexity
4. Add unit and integration tests
5. Implement a CI/CD pipeline for automated testing and deployment

## Use of state and hooks - details
Detailed Explaination of React state management and Hooks useage in the application
To explain the use of states and hooks in your README.md, you can include a section like this:

State Management and Hooks
This application utilizes React's useState hook for managing local component state. useState allows functional components to have stateful logic without using class components.

Key uses of state and hooks in this project:
User authentication state: Tracks whether a user is logged in
Form inputs: Manages form field values for login, registration, and vehicle entry
Vehicle data: Stores and updates the list of vehicles displayed
For more complex state management needs, next time useReducer hook or a state management library like Redux could be used in future iterations.

## 1. Use of React hook useMemo
In the Dealer Inventory Tracker application, useMemo is employed in the VehicleTable.jsx file, to optimize the sorting of vehicles. Here's a detailed explanation of its purpose in this specific application:

Performance Optimization:
The useMemo hook is used to memoize (cache) the sorted version of the vehicles array. This is beneficial because sorting can be an expensive operation, especially for large datasets13.

Preventing Unnecessary Re-renders:
By memoizing the sorted array, we ensure that the sorting operation only occurs when the vehicles data actually changes. This prevents unnecessary re-computations on every render, which could happen if the sorting was done directly in the component body5.

Dependency-based Recalculation:
The useMemo hook takes two arguments: a function to compute the value and an array of dependencies. In this case, the dependencies likely include the vehicles array. This means the sorting will only be recalculated when the vehicles data changes35.

Optimizing Child Component Rendering:
If the VehicleTable component passes the sorted vehicles to child components (like individual rows), using useMemo can help optimize their rendering. Child components will only re-render when the sorted array actually changes, not on every parent re-render7.

Maintaining Consistent Reference:
useMemo ensures that the sorted array maintains the same reference between renders if the vehicles data hasn't changed. This is particularly useful if the sorted array is passed as a prop to memoized child components27.

In the context of this vehicle inventory application, using useMemo for sorting is crucial because:

The inventory may contain a large number of vehicles, making sorting potentially expensive.

Users might frequently interact with the table (e.g., adding, editing, or deleting vehicles), which could trigger re-renders.

The sorted order of vehicles needs to remain consistent and efficient, especially when users are browsing or searching the inventory.

By implementing useMemo for sorting, the application ensures a smooth user experience with optimal performance, even as the inventory grows or changes frequently135.

## 2. Use of React hook useEffect
In the Dealer Inventory Tracker application, useEffect is utilized in several components for various purposes. Here's a detailed explanation of its usage:

App.jsx:
useEffect(() => {
  const checkLoginStatus = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setIsLoggedIn(!!storedUser);
    setUser(storedUser);
  };

  checkLoginStatus();
  window.addEventListener('storage', checkLoginStatus);

  return () => {
    window.removeEventListener('storage', checkLoginStatus);
  };
}, []);
This useEffect serves two purposes:

It checks the user's login status on initial render and updates the isLoggedIn and user states accordingly.

It sets up an event listener for storage changes, allowing the app to react to login/logout events that might occur in other tabs.

The empty dependency array ensures this effect runs only once on component mount.

Search.jsx:
useEffect(() => {
  handleSearch({ preventDefault: () => {} });
}, []);
This useEffect triggers an initial search when the Search component mounts, populating the vehicle list without user interaction. It runs only once due to the empty dependency array.

Login.jsx and Register.jsx (assumed based on common patterns):
useEffect(() => {
  if (isLoggedIn) {
    navigate('/dashboard');
  }
}, [isLoggedIn, navigate]);
This useEffect likely redirects logged-in users to the dashboard if they try to access the login or register pages. It depends on the isLoggedIn state and the navigate function from react-router-dom.

Dashboard.jsx (assumed based on common patterns):
useEffect(() => {
  fetchUserData();
}, []);
This useEffect might fetch user-specific data when the dashboard component mounts, ensuring the user sees their personalized information immediately upon login.

In each case, useEffect is crucial for managing side effects that shouldn't occur during rendering, such as API calls, localStorage interactions, and navigation. It helps keep the component logic organized and ensures that certain operations only happen at specific times in the component lifecycle.

## 3. Use of React hook useState
In the Dealer Inventory Tracker application, the useState hook is used extensively to manage local component state. Here's a detailed explanation of its usage in different components:

App.jsx:
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [user, setUser] = useState(null);
These state variables manage the user's authentication status and user information. They are crucial for:

Controlling access to protected routes

Displaying user-specific information in the Navigation component

Triggering re-renders when login status changes

Search.jsx:
const [searchField, setSearchField] = useState('all');
const [searchValue, setSearchValue] = useState('');
const [vehicles, setVehicles] = useState([]);
const [error, setError] = useState(null);
These states manage the search functionality:

searchField and searchValue control the search input fields

vehicles stores the search results

error handles any API errors during search

Add.jsx:
const [vehicle, setVehicle] = useState({ make: '', model: '', color: '', year: '' });
const [error, setError] = useState(null);
const [success, setSuccess] = useState(false);
These states manage the form for adding new vehicles:

vehicle stores the form input values

error and success handle feedback messages after form submission

Login.jsx and Register.jsx:
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState(null);
These states manage the authentication forms:

username and password store form input values

error handles authentication errors

VehicleTable.jsx:
const [editingId, setEditingId] = useState(null);
const [editedVehicle, setEditedVehicle] = useState({});
These states manage the inline editing functionality:

editingId tracks which vehicle is being edited

editedVehicle stores the temporary edited values before submission

The useState hook is essential in this application for creating reactive user interfaces, managing form inputs, and controlling component behavior based on user actions and API responses135.


/// end ///

