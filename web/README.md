This would be the first of the README.md

## Coding guide

Brief introduction to the project.


### Files

```
|____components  - all the components of the app
|____stories - storybook stories for components of the app
|____theme - theme variables for spacing, colors, breakpoints (taken from carbon design system)
|____images - the images of the app
|____redux - reducers, actions, ...
|____util - utilities
```


### Prerequisites

- Node. We recommend installing via [Node Version Manager](https://github.com/nvm-sh/nvm#installing-and-updating). Run `nvm use` to install the working node version. 

### Installation

1. Copy `.env.example` to `.env` and modify as needed: `cp .env.example .env` (for details, see the **Environment Variables** section below)
2. Install dependencies: `npm install\`
3. Make sure your `HOST` environment variable is unset, or set to `localhost`.
4. Start the server: `npm start`
5. You should now be able to visit your local front-end at http://localhost:3000/

Optionally,

1. If you want to explore the app in [Storybook](https://storybook.js.org/): `npm run storybook`

### Styling

In terms of styling, we use [styled-components](https://github.com/styled-components/styled-components) and [chakra](https://chakra-ui.com/).

### App Router

```
/
/auth/:provider
/login
/logout

/workbook
/workbook/:id
/workbook/:id/clone
/workbook/:id/postclone

/workbook/:id/portfolio/edit
/workbook/:id/technologies/:technologyId

```

### CI/CD

- Merge into `develop` branch to view on staging server
- Merge into `main` branch to view on production server

### Troubleshooting

### Environment Variables
	
* `REACT_APP_API_URL=127.0.0.1` = API URL
