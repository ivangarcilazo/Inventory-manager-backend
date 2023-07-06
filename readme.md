# Backend documentation with Node.js/Express

## Introduction
This is the backend of the Inventory Manager application. It is in charge of handling the requests to the different routes and error handling.

## Instalation
For this section, only need an npm install.

## Proyect structure
The main focus is on app.js, where the main routes are managed. In the routes folder you can find more detailed routes for each type of request, if it is a product, company, etc. In this the requests are managed through controls that are defined in their folders, and these use the mongoose models to be able to be defined.


## Endpoints/API
### Endpoint 1 - login user
 - URL: https://imagineapp-prueba.netlify.app/.netlify/functions/app/users/login
 - Accepted methods: POST
 - An email field and a password field are required in JSON format.

### Endpoint 2 - register user
 - URL: https://imagineapp-prueba.netlify.app/.netlify/functions/app/users/register
 - Accepted methods: POST
 - An email field and a password field are required in JSON format.

### Endpoint 3 - companies
 - URL: https://imagineapp-prueba.netlify.app/.netlify/functions/app/company
 - Accepted methods: GET
 - TOKEN IS REQUIRED

### Endpoint 4 - companies register
 - URL: https://imagineapp-prueba.netlify.app/.netlify/functions/app/company
 - Accepted methods: POST
 - A field is required for company name, address, NIT, telephone number.
 - TOKEN IS REQUIRED
  
### Endpoint 5 - companies delete
 - URL: https://imagineapp-prueba.netlify.app/.netlify/functions/app/company
 - Accepted methods: DELETE
 - The NIT of the company is required, this must be sent by req.body.
 - TOKEN IS REQUIRED

### Endpoint 6 - companies modify
 - URL: https://imagineapp-prueba.netlify.app/.netlify/functions/app/company
 - Accepted methods: PUT
-  A field is required for company name, address, NIT, telephone number.
-  TOKEN IS REQUIRED

### Endpoint 7 - companies products
 - URL: https://imagineapp-prueba.netlify.app/.netlify/functions/app/company/products
 - Accepted methods: GET
 - TOKEN IS REQUIRED

### Endpoint 8 - companies products add
 - URL: https://imagineapp-prueba.netlify.app/.netlify/functions/app/company/products
 - Accepted methods: POST
 - The following fields are required: name, quantity, price,
description
 - TOKEN IS REQUIRED

### Endpoint 9 - companies products delete
 - URL: https://imagineapp-prueba.netlify.app/.netlify/functions/app/company/products
 - Accepted methods: DELETE
 - The NIT of the company, and the id of the product is required, this must be sent by req.body.
 - TOKEN IS REQUIRED

### Endpoint 10 - companies products modify
 - URL: https://imagineapp-prueba.netlify.app/.netlify/functions/app/company/products
 - Accepted methods: PUT
 - The following fields are required: name, quantity, price,
description
 - TOKEN IS REQUIRED


## Security
Bcrypt is used for the encryption of the user's password, and a JsonWebToken is used for each corresponding endpoint.
