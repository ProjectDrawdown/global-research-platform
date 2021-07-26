# Project Drawdown Model Engine
[Project Drawdown](https://www.drawdown.org/) is the most comprehensive plan yet published for how to solve Global Warming. Project Drawdown entered the climate conversation with the [publication of the 2017 book](https://www.drawdown.org/the-book). With [The Drawdown Review in 2020](https://drawdown.org/drawdown-framework/drawdown-review-2020), the project continues its mission to inspire and communicate solutions.

<img align="right" src="data/images/DrawdownReview2020.gif" />

## Background

+ The Drawdown solution models [Project Drawdown Solutions Repo](https://github.com/ProjectDrawdown/solutions) are, at their core, economic models which estimate the total global and regional demand for each solution and the percentage of that demand each year which might adopt the Drawdown solution. The monetary and emissions impacts of that adoption are then calculated.

+ The framework and methodology for the model was developed by a core research team at Project Drawdown with a Head of Research and a set of Senior researchers who have worked with the project for several years.

+ The solutions have been developed by [annual cohorts of researchers](https://www.drawdown.org/research-fellows), mostly graduate and postdoctoral students working six month stints to vet new data inputs and implement targeted model improvements.

+ Project Drawdown's solution models were originally constructed in Excel, with a large number of Excel files now existing. There are two releases of the Excel models which are relevant to this effort:
    + 2019: released to the public in January 2019
    + 2020: extended from the 2019 models by a new cohort of researchers, released as The Drawdown Review in March 2020.

+ The Excel files have mostly been converted into Python model code, in the "solutions" git repo mentioned above.

---

## Overview of the Project
Planned efforts include:

+ **Combined Model Implementation**
See [Project Drawdown Solutions Repo](https://github.com/ProjectDrawdown/solutions) for the core model implementation.

+ **UI aimed at researchers and broader audiences**
This repo you are in right now is a web-based user interface for working with "workbooks" of solutions, primarily for use by researchers looking to work with the model but additionally potentially of use to decisionmakers and policymakers in specific topics. This git repo is the current implementation, which requires & imports the model repo listed above as the core calculation engine. There is currently rudimentary features for sharing and collaborating on user workbooks. The UI provides controls for manipulating the values in the model, displaying graphs and output data for the resulting calculations.

---

![status](https://github.com/ProjectDrawdown/solutions/workflows/Drawdown%20Solutions%20Python%20application/badge.svg)
[![codecov](https://codecov.io/gh/ProjectDrawdown/solutions/branch/master/graph/badge.svg)](https://codecov.io/gh/ProjectDrawdown/solutions)

## Getting the source code

1. Get a copy of this source code:
```sh
$ git clone https://github.com/ProjectDrawdown/global-research-platform
$ cd global-research-platform
$ git checkout develop
```

## Environment Variables

### API Environment

1. Copy the example
```
$ cp service/api/env-example service/api/.env
```

2. A valid Google OAuth key will be necessary; GitHub key is optional. See [Github](https://docs.github.com/en/free-pro-team@latest/developers/apps/authorizing-oauth-apps) and [Google](https://developers.google.com/identity/protocols/oauth2/openid-connect) instructions for how to obtain these client ID and client secret keys. Update the .env file.
```
GITHUB_CLIENT_ID=somegithubclientid
GITHUB_CLIENT_SECRET=somegithubclientsecret
GOOGLE_CLIENT_ID=somegoogleclientid
GOOGLE_CLIENT_SECRET=somegoogleclientsecret
```

3. For running in production, you'll probably want a secure JWT secret key in the .env file as well:
```
JWT_SECRET_KEY=somejwtsecretkey
```

### Web Environment
No Environment configuration is needed for web

## Getting started with Docker (recommended)

If you have docker and docker-compose installed, you should be able to get started fairly quickly, following these steps:

```sh
$ cp docker-compose.yml.local.example docker-compose.yml
# When using Docker, the environment variable that was previously configured will need to be copied over to the `docker-compose.yaml` file.

$ docker-compose up
# our project is mounted to the container, so changes will automatically be reflected after saving. We would only need to restart the container when introducing a new external dependency. 
```
to build the docker containers. 

_NOTE: For windows machine using WSL (Windows Subsystem for Linux), we will need to enable 'WSL Integration' for required distro in Windows Docker Desktop (Settings -> Resources-> WSL Integration -> Enable integration with required distros)._


Once docker has finished building, 2 applications will be built and run under

```
web:  localhost:3000
API:  localhost:8000
```

The `web` application may take some time to load as it is being built post Docker. Check your container logs for status.

### Initializing the data

To create the default workbooks, enter `localhost:8000/initialize` in your browser. This will generate a variety of data, including the 3 Drawdown canonical workbooks. This will also load some CSVs into the database for easy retrieval, and provide the data for the `localhost:8000/resource/{path}` endpoints.

To improve performance for the app, it is recommended you run `localhost:8000/calculate` for the 3 canonical workbooks as a first step, as this will cache results for all the technologies for the workbooks. Any variation updates, when calculated, will take advantage of this initial cache as much as possible.

_DEVELOPER NOTE:_ If you choose to run via Docker, any changes to the library dependencies (`pip install` or `npm install`) will mean you will have to rebuild your container by restarting docker and running:

```sh
$ docker-compose build --no-cache

$ docker-compose up
```

## Getting started without Docker

### Building the API Service

You will need [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), [Python 3](https://docs.python.org/3/using/index.html) (>= 3.8) installed. You will need [Postgres](https://www.postgresql.org/) and [Redis](https://redis.io/) running.

Python 3.8
```sh
$ cd service

$ pipenv shell
# Or assuming you have multiple versions installed use the following 
$ pipenv --python /Users/sam/.pyenv/versions/3.8.6/bin/python shell
# Now inside the virtual env install tools
$ pip install -r requirements.txt
# install dev dependencies
$ pip install -r requirements-dev.txt
```
### Building the Web Service
You will need [Node >= v.14](https://nodejs.org/en/) installed
```sh
$ cd web

$ npm install
```

## Database Creation
You will need to have postgres running and you will need the psql program.
```sh
$ psql -h 0.0.0.0 -p 5432 -U postgres
postgres=# CREATE DATABASE drawdown;
```

## Running the project without Docker

### Without docker, you will need to do a database setup

You will need to have postgres running. You will want a valid connection string contained in `service/api/.env` for `DATABASE_URL`. Using `pipenv shell` run the following to apply existing migrations:
```sh
$ alembic upgrade head
```

to run the API:
```sh
$ cd service

$ uvicorn api.service:app --reload
```
And finally, to run the web:
```sh
$ cd web

$ npm run start
```

## Schema Updates
When changing models in `service/api/db/models.py` run the following to create migrations:
```sh
$ alembic revision -m "add provider column" --autogenerate
```

Note: if you are not using docker-compose, you will need to manually run:

```sh
$ alembic upgrade head
```

### Some gotchas

When updating variation values, you may find you need to update like this:

```
"some_solution_variable": 1234.56
```

And other times, you may find you need to update the value like this:

```
"some_different_variable": {
  "value": 1234.56,
  "statistic": "mean"
}
```

This matches the existing .json files extracted from the original excel files. At some point, we may want to normalize all values to the second option, but for now just keep in mind you will need to know when to use which. You can access the `resource/scenario/{id}` endpoint to determine which format to send.

---

## License
The python code for the model engine is licensed under the GNU Affero General Public license and subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at [https://github.com/ProjectDrawdown/solutions](https://github.com/ProjectDrawdown/solutions). No part of this Project, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.

Data supplied from Project Drawdown (mostly in the form of CSV files) is licensed under the [CC-BY-NC-2.0](https://creativecommons.org/licenses/by-nc/2.0/) license for non-commercial use. The code for the model can be used (under the terms of the AGPL) to process whatever data the user wishes under whatever license the data carries. The data supplied for the Project Drawdown solutions is CC-BY-NC-2.0.

---

## Acknowledgements

Many thanks to the contributors of the &lt;code&gt;earth hackathon held at the Internet Archive on Sept. 5, 6, and 7 of 2018 which began this project. They are: Owen Barton, Robert L. Read, Denton Gentry, Henry Poole, Greg Elin, Marc Jones, and Stephanie Liu, in addition to Project Drawdown scientists and volunteers, Ryan Allard, Catherine Foster, Chad Frischmann, Kevin Bayuk, and Nick Peters.

Huge thanks to Beni Bienz of The Climate Foundation for his work in implementing a substantial portion of the system.

---

## Contact

David Brooks (david@colab.coop) is currently the technical point of contact for this project.

