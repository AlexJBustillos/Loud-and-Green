

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
| GET | /strain | strain.js | strains access |


| Model | Schema | Association |
| ----- | ------ | ----------- |
| User  | id, email, pw, age |  Has many reviews |
| Profile Page | id, content, user_id, title | belongs to user |
| Review/comment | id, content, user_id, name, strain_id | belongs to user and strain |
| Strain | strainId, name, race, desc | has many comments |
| Effect | strain_id, effects | belongs to many strains | 
| Flavor | strain_id, flavors | belongs to many strains | 
| User_strain | strain_id, user_id | join table | 