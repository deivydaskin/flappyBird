# FlappyBird location based weather edition

## Check this app
https://flappybirdweather.herokuapp.com/
## OR

## Starting Instructions

git clone or download zip
open in IDE

- npm install
- npm start
- Open up http://localhost:3001/ in your browser

## Description

- This web system is flappy bird clone with additional function which can change web backgroud based on weather in your current location. Additionally it will present signup/login forms to track scores and display best of them

## Entity definition

- User as an object
- Name: user
- attributes:
  - ID - depending on specific service this could be a number or string
  - Creation date - ISO 8601 format date string
  - Modification date - ISO 8601 format date string
  - Best score - number(range 0, 1000)
  - Score date - ISO 8601 format date string

## API definition

- OpenWeatherMap: get request
- BestSCrore: get, post, (maybe) update requests

GET /api/scores/
404 scores not found
POST /api/scores/
400 Bad request
GET http://api.openweathermap.org/data/2.5/weather?
401 Unauthorized
403 Forbidden

| Status Code | Description        |
| ----------- | ------------------ |
| 200         | All good           |
| 400         | Bad request        |
| 401         | Unauthorized       |
| 403         | Forbidden          |
| 404         | Resource not found |
| 500         | Server error       |

## UI definition

- Main page: enter username popup form, then canvas shows up and you can play the game
- https://wireframe.cc/nuJhFF
