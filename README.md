<p align="center">
  <img src="src/assets/images/logo.svg" width="200" alt="Juntos Somos +">
</p>

# <frontend-developer />

The main objective of this challenge is to test your skills in Front-end Development 🥳

- Your coding style;
- Knowledge on frameworks and other technologies;
- Good practices;
- Tests;
- Your skills about UI/UX.

You can check some our Front-end Development patterns in our [frontend-guideline](https://github.com/juntossomosmais/frontend-guideline) repository 😁

## Rules

- Your code should be made available in a **private** repository on your personal Github;
- You can feel free to choose your favorite architectures, frameworks, libs and technologies;
- Ideally, you can deliver the challenge within 10 days. But if you need more time, let us know 😊

## The Challenge

### About the layout

The [following Figma layout needs to be developed](https://www.figma.com/file/RG2Ro8NwAt1HsMASwbZcUx/Teste-Front-end-2?node-id=2%3A7938).

The logo is the same as the one in the repository.

It's important to say that it is just a prototype! We would also like to see your ability to propose improvements, features and new contributions to the product's UI 😄!

**Feel completely free** to make improvements such as:

- Adding new functionalities;
- Creating animations;
- Developing visual optimizations;
- etc

You also can add new filters if you want 😋

### About the API

The JSON that you need to develop for this application is available at:

- `https://jsm-challenges.s3.amazonaws.com/frontend-challenge.json`

Feel free to use BFF (Back-end for Front-end) before using it on the client-side, if you think that if it makes sense 👀!

### About the project

You **should** develop:

- Filter by state;
- Search by name and/or last name;
- Pagination to navigate between cards;
- Navigation when clicking on customer cards;
- An **internal page** with more details of customers (use your creativity);
- We'll be happy (😍) **if you write tests** for it.

## Project Setup and info

This project was made using Vue 3 + TypeScript + Vite + Vitest + Pinia.

### Env

You will need to configure the env for API URL, you can use the production version jsm-bff.herokuapp.com/v1/ or run locally the the [BFF project](https://github.com/ianwelerson/jsm-bff). For any of these options, you will need to create a `.env` file with env key `VITE_API_URL`. You can see an example in the file `.env.example`

### Install dependecies

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run build
npm run test:e2e # or `npm run test:e2e:ci` for headless testing
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
