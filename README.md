

### User Model

| Column Name | Data Type | Notes |
| --------------- | ------------- | ------------------------------ |
| id | Integer | Serial Primary Key, Auto-generated |
| name | String | Must be provided |
| email | String | Must be unique / used for login |
| password | String | Stored as a hash |
| createdAt | Date | Auto-generated |
| updatedAt | Date | Auto-generated |

### Default Routes

| Method | Path | Location | Purpose |
| ------ | ---------------- | -------------- | ------------------- |
| GET | / | server.js | Home page |
| GET | /auth/login | auth.js | Login form |
| GET | /auth/signup | auth.js | Signup form |
| POST | /auth/login | auth.js | Login user |
| POST | /auth/signup | auth.js | Creates User |
| GET | /auth/logout | auth.js | Removes session info |
| GET | /profile | server.js | Regular User Profile |

| Model | Schema | Association |
| ----- | ------ | ----------- |
| User  | id, email, pw |  Has many reviews |
| Profile Page | id, content, user_id, title | belongs to user |
| Reviews/comments | id, content, user_id, name, strain_id, profile_id | belongs to user and strain |
| Strains | id, name, flavor, race, effect | has many comments |
| Description | strain_id, content | belongs to many strains | 