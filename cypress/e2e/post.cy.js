const cypress = require("cypress");

describe("POST /characters", function () {
  before(function () {
    cy.bac2ThePast();
    cy.setToken();
  });

  it("Deve cadastrar um personagem", function () {
    const character = {
      name: "Wanda Maximoff",
      alias: "Feiticeira Escarlate",
      team: ["vingadores"],
      active: true,
    };
    cy.postCharacter(character).then(function (response) {
      expect(response.status).to.equal(201);
      //para aparecer no cypress run a resposta do body - id do character criado - requisito
      cy.log(response.body.character_id);
      expect(response.body.character_id.lenght).to.equal(24);
    });
  });

  before(function () {
    cy.api({
      method: "POST",
      url: "/characters",
      body: character,
      headers: {
        Authorization: cypress.env("token"),
      },
      failOnStatusCode: false,
    }).then(function (response) {
      expect(response.status).to.equal(201);
      //para aparecer no cypress run a resposta do body - id do character criado - requisito
      cy.log(response.body.character_id);
      expect(response.body.character_id.lenght).to.equal(24);
    });
  });

  context("quando o personagem já existe", function () {
    const character = {
      name: "Pietro Maximoff",
      alias: "Mercurio",
      team: ["vingadores da costa oeste", "irmandade de mutantes"],
      active: true,
    };

    before(function () {
      cy.api({
        method: "POST",
        url: "/characters",
        body: character,
        headers: {
          Authorization: Cypress.env("token"),
        },
        failOnStatusCode: false,
      }).then(function (response) {
        expect(response.status).to.equal(201);
      });
    });

    it("não deve cadastrar duplicado", function () {
      cy.api({
        method: "POST",
        url: "/characters",
        body: character,
        headers: {
          Authorization: Cypress.env("token"),
        },
        failOnStatusCode: false,
      }).then(function (response) {
        expect(response.status).to.equal(400);
      });
      expect(response.body.error).to.equal("Duplicate character");
    });
  });
});
