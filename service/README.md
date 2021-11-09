# Global Research Platform Service

This directory serves as the API service that will run the models for calculations and maintain data. The models are obtained from the [Solutions Repository](https://github.com/ProjectDrawdown/solutions).

API Documentation could be found by running the application and accessing the `GET /docs`.

## Project Structure
```
|___alembic           - postgres migration package
|   |____versions     - migration files
|___api               - core application code
|   |___db            - database helper
|   |___queries       - preset queries functions
|   |___routers       - binding for function paths
|   |   |___providers - social login functions
|   |   |___routes    - path binding
|   |___transforms    - mapper to convert models for API
|___tests             - unit tests
```

## Prerequisite

* Python 3.8
* Postgres

## Code Standard

We rely on `pylint` to maintain code standard. Run it by:
```sh
$ pylint service
```

However to make it easier, we added a pre-commit hook that would only run it againts the changes that you made. To do that, simply go to the `root` directory and run
```sh
$ pre-commit install
```

Now `pylint` will run when you create a commit.