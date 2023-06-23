# Express.js eCommerce Backend API with Sequelize

This repository contains a functional Express.js API that connects to a MySQL database using Sequelize. It provides routes to perform CRUD operations on categories, products, and tags.

## Project Link

https://github.com/mlukicdesign/eCommerce-Backend


## Setup

1. Clone the repository and navigate to the project directory.
2. Create an environment variable file (.env) in the root directory and add the following information:
   ```
   DB_NAME=your_database_name
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   ```
   Replace `your_database_name`, `your_mysql_username`, and `your_mysql_password` with your own database credentials.
3. Install the dependencies by running `npm install`.
4. Use the provided schema and seed files to set up a development database. Run the following commands:
   ```
   npm run schema
   npm run seed
   ```
   This will create the necessary tables in the database and populate them with test data.
5. Start the application by running `npm start`. The Sequelize models will be synced with the MySQL database, and the server will be started.

## Usage

Once the application is running, you can use a tool like Insomnia to interact with the API.

### GET Routes

- **Categories**: Use the GET route `/api/categories` to retrieve all categories and their associated products. The data will be returned in a formatted JSON.

- **Products**: Use the GET route `/api/products` to retrieve all products and their associated categories and tags. The data will be returned in a formatted JSON.

- **Tags**: Use the GET route `/api/tags` to retrieve all tags and their associated products. The data will be returned in a formatted JSON.

### POST, PUT, and DELETE Routes

You can test the POST, PUT, and DELETE routes using Insomnia Core.

- **POST**: Use the appropriate route (e.g., `/api/categories`) with the relevant request payload to create new data in the database.

- **PUT**: Use the appropriate route with the relevant resource ID (e.g., `/api/categories/:id`) and the updated data in the request payload to update existing data in the database.

- **DELETE**: Use the appropriate route with the relevant resource ID to delete data from the database.

Make sure to replace `:id` in the route with the actual ID of the resource you want to modify or delete.

## Conclusion

This eCommerce Backend with Sequelize provides a simple and functional backend for managing categories, products, and tags in a MySQL database. It allows for easy creation, retrieval, update, and deletion of data using HTTP requests. Feel free to explore and modify the code according to your specific requirements.


## CONTACT ME

mlukicdesign@gmail.com
https://github.com/mlukicdesign

thanks for viewing :)