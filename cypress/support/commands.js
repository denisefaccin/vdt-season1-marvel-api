// To configure the authorization token
Cypress.Commands.add('setToken', function () {
  cy.request({
    method: 'POST',
    url: '/sessions',
    failOnStatusCode: false,
    body: {
      email: Cypress.env('EMAIL'),
      password: Cypress.env('PASSWORD')
    }
  }).then(function (response) {
    expect(response.status).to.equal(200);
    Cypress.env('token', response.body.token);
  });
});

// To delete existing data
Cypress.Commands.add('back2ThePast', function () {
  cy.request({
    method: 'DELETE',
    url: `/back2thepast/${Cypress.env('COLLECTION')}`,
    failOnStatusCode: false,
    headers: {
      Authorization: Cypress.env('token')
    }
  }).then(function (response) {
    expect(response.status).to.equal(200);
  });
});

// POST Request that test character registration
Cypress.Commands.add('postCharacter', function (character) {
  cy.request({
    method: 'POST',
    url: '/characters',
    failOnStatusCode: false,
    body: character,
    headers: {
      Authorization: Cypress.env('token')
    }
  }).then(function (response) {
    return response;
  });
});

// GET Request that tests getting characters
Cypress.Commands.add('getCharacters', function (characterId) {
  cy.request({
    method: 'GET',
    url: '/characters',
    failOnStatusCode: false,
    headers: {
      Authorization: Cypress.env('token')
    }
  }).then(function (response) {
    return response;
  });
});

// Automation to populate with characters
Cypress.Commands.add('populateCharacters', function (characters) {
  characters.forEach(function (c) {
    cy.postCharacter(c);
  });
});

// GET Requalification that fetches character by name
Cypress.Commands.add('searchCharacters', function (characterName) {
  cy.request({
    method: 'GET',
    url: '/characters',
    failOnStatusCode: false,
    qs: { name: characterName },
    headers: {
      Authorization: Cypress.env('token')
    }
  }).then(function (response) {
    return response;
  });
});

// GET Request that tests getting characters
Cypress.Commands.add('getCharacterById', function (characterId) {
  cy.request({
    method: 'GET',
    url: `/characters/${characterId}`,
    failOnStatusCode: false,
    headers: {
      Authorization: Cypress.env('token')
    }
  }).then(function (response) {
    return response;
  });
});

// DELETE Request that tests character deletion
Cypress.Commands.add('deleteCharacterById', function (characterId) {
  cy.request({
    method: 'DELETE',
    url: `/characters/${characterId}`,
    failOnStatusCode: false,
    headers: {
      Authorization: Cypress.env('token')
    }
  }).then(function (response) {
    return response;
  });
});