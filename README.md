# Food Delivery Backend

This project is a simple RESTful API for managing a food delivery service. It allows users to manage menu items, place orders, and track order statuses with periodic updates. The application is built using Node.js and Express.

## Features

- **Add Menu Items**: Create or update menu items with details such as name, price, and category.
- **Retrieve Menu Items**: Get a list of all available menu items.
- **Place Orders**: Users can place orders by selecting multiple items from the menu.
- **Track Order Statuses**: Automatically updates order statuses from "Preparing" to "Out for Delivery" and finally "Delivered".
- **Logging**: Logs changes in order statuses for auditing purposes.

## Technologies Used

- Node.js
- Express.js
- body-parser
- node-cron

