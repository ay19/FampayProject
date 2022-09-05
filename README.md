## FamPay - Backend Assignment

### Project Goal
To make an API to fetch latest videos sorted in reverse chronological order of the publishing date-time from YouTube for a given search query in paginated response

### Basic Functionalities
- Constantly fetch data in the background every 10 second using node-schedule.
- GET API for fetching videos using fuzzy match searching:
    1. `/videos` for fetching videos sorted by published datetime.
    2. `/videos/pagination` for fetching videos sorted by published datetime and paginated.
- Optimised Search API using fuzzy matching for phrases like `How to make a tea?` matched with `tea how`.

### Development

1. Clone project :`git clone https://github.com/ay19/FampayProject.git`

2. Change YOUTUBE_API_KEY in config/config.json. You can also change default value of MONGODB_URI and YOUTUBE_SEARCH_QUERY.
YOUTUBE_API_KEY = [ "API_KEY1", "API_KEY2",...]

3. Install dependencies : `npm i`

4. Run project: `node app.js`

Make sure your mongoDB server is connected.

After project is up and running use this postman curl to hit the API:
1. curl --location --request GET 'http://localhost:8080/videos?limit=2&searchPhrase=show football'
2. curl --location --request GET 'http://localhost:8080/videos/pagination?searchPhrase=show football&page=2'
