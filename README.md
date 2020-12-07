# Loud And Green

[Loud And Green](https://loud-and-green.herokuapp.com)

Resource for over 2000 strains of marijuana. For educational purposes only

## Requirements

- Include sign up/log In functionality
- Have at least 2 models not including join tables or the user model
- Incorporate at least one third-party API
- Have complete RESTful routes
- Utilize an ORM to create a database table structure
- Include a readme file
- Semantically clean HTML, CSS, and back-end code
- Be deployed online 

## Technologies Used

- Node/Express
- PostgreSQL
- Sequelize

## User Stories

- As a user I want to be able to view and save information on various strains I like.
- I would like to see detailed information on the strains
- I would like to be able to add strains to my profile as well as delete them
- I would also like to be able to edit my name on my profile

## Wireframes

- Home Page
![Home Page](https://raw.githubusercontent.com/AlexJBustillos/project2-ideas/main/img/strainHomePage.png)
- Profile Page
![Profile Page](https://raw.githubusercontent.com/AlexJBustillos/project2-ideas/main/img/profilePage.png)
- Strain Page
![Strain Page](https://raw.githubusercontent.com/AlexJBustillos/project2-ideas/main/img/strainPage.png)
- Description Page
![Desc Page](https://raw.githubusercontent.com/AlexJBustillos/project2-ideas/main/img/descriptionPage.png)

## User Model

| Column Name | Data Type | Notes |
| --------------- | ------------- | ------------------------------ |
| id | Integer | Serial Primary Key, Auto-generated |
| name | String | Must be provided |
| email | String | Must be unique / used for login |
| age | Integer | Must be provided |
| password | String | Stored as a hash |
| createdAt | Date | Auto-generated |
| updatedAt | Date | Auto-generated |

## Default Routes

| Method | Path | Location | Purpose |
| ------ | ---------------- | -------------- | ------------------- |
| GET | / | server.js | Home page |
| GET | /auth/login | auth.js | Login form |
| GET | /auth/signup | auth.js | Signup form |
| POST | /auth/login | auth.js | Login user |
| POST | /auth/signup | auth.js | Creates User |
| GET | /auth/logout | auth.js | Removes session info |
| GET | /profile | profile.js | Regular User Profile |
| GET | /strains | strains.js | strains access |
| GET | /strains/details/:strainId | strains.js | strains details |
| GET | /strains/search | strains.js | strains search |
| GET | /profile/edit/:id | profile.js | name edit |
| PUT | /profile/edit/:id | profile.js | name update |
| POST | /profile | profile.js | post favorite strain to profile |
| GET | /profile/details/strainId | profile.js | get favorite strain details |
| DELETE | /profile/details/strainId | profile.js | delete strain from favorites |


| Model | Schema | Association |
| ----- | ------ | ----------- |
| User  | id, email, pw, age |  Has many reviews |
| Strain | strainId, name, race, desc | has many comments |
| Effect | strain_id, effects | belongs to many strains | 
| Flavor | strain_id, flavors | belongs to many strains | 
| User_strain | strain_id, user_id | join table | 

## Set Up app

- Fork and clone this repository
- Run npm install
- Setup database
- Run sequelize db:migrate
- Create .env file and store SESSION_SECRET and API_KEY
- Run nodemon to start app