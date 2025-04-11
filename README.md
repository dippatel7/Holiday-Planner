# Holiday Planner

A web-based application to help travelers plan and manage personalized holiday itineraries efficiently. Built with React, Node.js, MongoDB, and integrated with Jira for project management, SysML for requirements analysis, and GitHub for version control.


#test Hello world


## Project Overview
The **Holiday Planner** is a full-stack CRUD application designed to simplify holiday planning. Users can sign up, log in, create and manage trip itineraries, update profiles, and explore destination recommendations. This project follows Software Development Life Cycle (SDLC) best practices, leveraging Agile methodologies with Jira, requirements modeling with SysML, and DevOps practices with GitHub.

**GitHub Repository**: https://github.com/dippatel7/Holiday-Planner.git 
**Deployed URL**: [http://[13.236.135.130](https://github.com/dippatel7/Holiday-Planner.git)/](http://[13.236.135.130](https://github.com/dippatel7/Holiday-Planner.git)/)

---

## Features
- **User Authentication**: Secure signup, login, and logout using JWT tokens (R001–R003).
- **Trip Management**: Create, view, update, and delete trip itineraries with details like destination and dates (R004–R007).
- **Profile Management**: Update personal information (R008).
- **Destination Recommendations**: Explore suggested destinations and details (R009–R010).
- **Itinerary Sharing**: Share plans via email or export as PDF (R011–R012, in progress).
- **Responsive Design**: Modern, travel-themed navbar with Tailwind CSS.

---

## Prerequisites
Before running the project, ensure you have:
- **Node.js**: Version 22 ([Download](https://nodejs.org/en))
- **Git**: Version control tool ([Download](https://git-scm.com/))
- **VS Code**: Recommended editor ([Download](https://code.visualstudio.com/))
- **MongoDB Atlas Account**: For database hosting ([Sign Up](https://account.mongodb.com/account/login))
- **GitHub Account**: For version control ([Sign Up](https://github.com/signup))

---

## Installation

### 1. Clone the Repository
```bash
https://github.com/dippatel7/Holiday-Planner.git
```

### 2. Install Dependencies
- For both frontend and backend:
  ```bash
  npm run install-all
  ```

### 3. Set Up Environment Variables
- In the `backend` folder, create a `.env` file:
  ```plaintext
  MONGO_URI=mongodb+srv://Deep123:Deep123@cluster0.uqdsnba.mongodb.net/holidayplanner?retryWrites=true&w=majority&appName=Cluster0
  JWT_SECRET=2J8zqkP7VN6bxzg+Wy7DQZsd3Yx8mF3Bl0kch6HYtFs=
  PORT=5001

  ```


### 4. Run the Application
- Start both frontend and backend:
  ```bash
  npm start
  ```
- Frontend runs at: [http://3.27.64.125:3000](http://3.27.64.125:3000)
- Backend APIs accessible at: [http://3.27.64.125:5001](http://3.27.64.125:5001)

---

## Usage
1. **Register**: Create an account at `/register`.
2. **Login**: Sign in at `/login` to access features.
3. **Manage Trips**: Navigate to `/trips` to create, view, update, or delete itineraries.
4. **Explore Destinations**: Visit `/destinations` for travel suggestions (in progress).
5. **Update Profile**: Edit your info at `/profile`.
6. **Logout**: Sign out from the navbar.

---

## Project Management

### Jira
- **Structure**: Organized into 5 epics:
  1. User Login and Signup
  2. Trip Planning
  3. Profile Settings
  4. Destination Recommendations
  5. Itinerary Sharing
- **Sprints**: Managed via Scrum with a board (To Do, In Progress, Done).
- **Tasks**: Broken into stories (e.g., "Create a New Trip") and subtasks (e.g., "Design trip form UI").

### SysML Requirements Diagram
- **Functional Requirements**:
  - R001–R003: Authentication (Signup, Login, Logout)
  - R004–R007: Trip CRUD operations
  - R008: Profile updates
  - R009–R010: Destination features
  - R011–R012: Sharing options
- **Non-Functional Requirements**: Security, usability, performance, availability, scalability.
- **Relationships**: Includes "depends on" (e.g., R002 → R001), "verifies" (e.g., Test Case → R002).

---

## Contributing
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to GitHub:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request for review.


## Author
- **Name**: Dipkumar Sanjaykumar Patel
- **Student ID**: N12128201
- **Email**: deeppatel3179@gmail.com
- **GitHub**: https://github.com/dippatel7/Holiday-Planner.git

