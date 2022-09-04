## FamPay - Backend Assignment

### Project Goal
To make an API to fetch latest videos sorted in reverse chronological order of the publishing date-time from YouTube for a given search query in paginated response

### Basic Functionalities
- Constantly fetch data in the background every 10 second using node-schedule.
- GET API for fetching videos using fuzzy match searching:
    1. `/videos` for fetching videos sorted by published datetime.
    2. `/videos/pagination` for fetching videos sorted by published datetime and paginated.
- Optimised Search API using fuzzy matching for phrases like `How to make a tea?` matched with `tea how`.
