# RSS Feed Article Parser

[https://rss-feed-node.onrender.com/](https://rss-feed-node.onrender.com/)

This is a Node.js application that parses articles from an RSS feed on a schedule. It provides two main routes: a public route and an admin route. The public route allows users to access and sort articles by categories, search queries, and creation date. The admin route is used to update and delete articles. The admin route is secured using JWT token authentication with refresh and access tokens.

## Features

- Parses articles from an RSS feed on a schedule
- Public route to access and sort articles by categories, search queries, and creation date
- Admin route for updating and deleting articles
- JWT token authentication for the admin route

## Main Stack

- TypeScript
- Node.js
- Express
- Class Validator
- MongoDB
- React
- Redux
- JWT
- axios
- Material UI
- Styled Components


## API Usage

To understand how to use the API, refer to the 
[Swagger Ui Docs](https://rss-feed-node.onrender.com/api-use) 

This documentation provides details about the available routes, request/response formats, and required parameters.

## Routes

- Public route: [https://rss-feed-node.onrender.com/](https://rss-feed-node.onrender.com/)
- Admin route: [https://rss-feed-node.onrender.com/admin-panel](https://rss-feed-node.onrender.com/admin-panel)

## Available Scripts

You can run this project on your localhost, but you should fix cookies for localhost usage in authorizaton workflow, making secure options false in refresh and access tokens. 

In the project directory, you can run:

`npm start`

Or to run with ts-mode and nodemon

`npm run dev`

To fix all lint errors

`npm run lint:fix`

