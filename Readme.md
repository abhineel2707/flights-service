This Node.js project template serves as a robust foundation, thoughtfully designed with key coding principles and project management best practices in mind. Feel empowered to modify and customize it to suit your own requirements.

`src` -> Within the 'src' directory, you'll find all the source code specific to the project. Please note that this does not encompass any testing-related files. For organizing your tests, consider creating a separate 'tests' directory.

Let's explore the contents of the `src` directory

- `config` -> In this directory, all configurations and setup routines related to any library or module will be carried out. For instance, the setup for the `dotenv` library, which facilitates cleaner utilization of environment variables, is handled in `server-config.js`. Another example would be the configuration of a logging library, helping generate insightful logs. Therefore, any related settings for such a library should also be defined within this directory.
- `routes` -> This directory is dedicated to establishing routes, along with their respective middleware and controllers.
- `middlewares` -> This directory provides components that serve as interceptors for incoming requests, where we can implement elements such as validators and authenticators.
- `controllers` -> Consider controllers as the final middleware before invoking the business layer to execute business logic. Controllers primarily receive incoming requests and data, passing it along to the business layer. Once the business layer generates an output, controllers are then responsible for structuring the API response and transmitting the output.
- `services` -> This directory encompasses the business logic, and it interfaces with repositories to retrieve data from the database.
- `repositories` -> This directory houses all logic related to database interaction. Any raw queries or ORM queries intended for the database should be placed here.
- `utils` -> This directory is home to utility elements like helper methods and error classes, among others.

### Setup the project

- Clone this template from GitHub and load it up in your preferred text editor.
- Navigate into the repository's directory and execute the following command:

```
npm install
```

- In the root directory create a `.env` file and add the following env variables
  ```
      PORT=<port number of your choice>
  ```
  ex:
  ```
      PORT=3000
  ```
- Navigate into the `src` folder and execute the following command:
  ```
    npx sequelize init
  ```
- After running the aforementioned command, you will notice new `models`, `migrations` and `seeders` directories, as well as a `config.json` file within the `config` directory.
- When configuring your development environment, enter your database username, password, and specify the type of database you are using (e.g., MySQL, MariaDB, etc.) under the 'dialect' field.
- When configuring the test or production environment, ensure that you replace the 'host' value with the URL of your hosted database.

- To run the server execute

```
npm run dev
```
