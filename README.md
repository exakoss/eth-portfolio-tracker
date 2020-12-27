ETH-Scanner

A customized dashboard for tracking price of ERC-20 tokens

Functionality:

User can post a contract address, and the corresponding token will be added to the dashboard.
Each token has its own tile that contains:
    
    Image, Ticker, Description, Current Price, Price Change, Official Website Link

Tokens are sorted by two parameters: Market Cap and Gain/Loss. User can also choose which timeframe the price diff will be shown at: 1 day, 7 days or 30 days

Chosen Tokens are being stored in a postgreSQL database. Their quotes are being updated on the app restart

Frontend:

    React, Redux, SCSS

Backend:

    Express, Node, Axios

Database:

    PostgreSQL

DevOps:
    
    Docker

Installation and Start:
    0. Make sure that you got *docker* and *docker-compose* installed
    1. Download the project
    2. Run *docker-compose up --build* in the root directory of the project
       This command will create images for each microservice (frontend. backend and PostgreSQL db) and run containers
    3. Go to *localhost:3000* in your browser
    4. Enjoy!
