//Para configurar o token de autorização
Cypress.Commands.add("setToken", function () {
  cy.api({
    method: "POST",
    url: "/sessions",
    body: {
      email: "denise@qacademy.io",
      password: "qa-cademy",
    },
  }).then(function (response) {
    expect(response.status).to.equal(200);
    Cypress.env("token", response.body.token);
  });
});

//Para deletar os dados existentes
Cypress.Commands.add("back2ThePast", function () {
  cy.api({
    method: "DELETE",
    url: "/back2thepast/629e0c3762354f001624edc6",
  }).then(function (response) {
    expect(response.status).to.equal(200);
  });
});

// POST Requisição que testar cadastro de personagens
Cypress.Commands.add("postCharacter", function (payload) {
  cy.api({
    method: "POST",
    url: "/characters",
    body: character,
    headers: {
      Authorization: Cypress.env("token"),
    },
    failOnStatusCode: false,
  }).then(function (response) {
    return response;
  });
});

// GET Requisição que testa obtenção de personagens
Cypress.Commands.add("getCharacters", function (payload) {
  cy.api({
    method: "GET",
    url: "/characters",
    body: character,
    headers: {
      Authorization: Cypress.env("token"),
    },
    failOnStatusCode: false,
  }).then(function (response) {
    return response;
  });
});

// Automação para populacionar com personagens
Cypress.Commands.add("populateCharacters", function (characters) {
  characters.forEach(function (c) {
    cy.postCharacter(c);
  });
});

//GET Requaisição que busca personagem por nome
Cypress.Commands.add("searchCharacters", function (characterName) {
  cy.api({
    method: "GET",
    url: "/characters",
    qs: { name: characterName },
    headers: {
      Authorization: Cypress.env("token"),
    },
    failOnStatusCode: false,
  }).then(function (response) {
    return response;
  });
});

// GET Requisição que testa obtenção de personagens
Cypress.Commands.add("getCharacterById", function (characterId) {
  cy.api({
    method: "GET",
    url: "/characters/" + characterId,
    headers: {
      Authorization: Cypress.env("token"),
    },
    failOnStatusCode: false,
  }).then(function (response) {
    return response;
  });
});

// DELETE Requisição que testa deleção de personagens
Cypress.Commands.add("deleteCharacterById", function (characterId) {
  cy.api({
    method: "DELETE",
    url: "/characters/" + characterId,
    headers: {
      Authorization: Cypress.env("token"),
    },
    failOnStatusCode: false,
  }).then(function (response) {
    return response;
  });
});
