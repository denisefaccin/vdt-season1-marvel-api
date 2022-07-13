describe("DELETE/characters/id", function () {
  before(function () {
    cy.bac2ThePast();
    cy.setToken();
  });
  const tochaHumana = {
    name: "Jhonny Storm",
    alias: "Tocha Humana",
    team: ["Quarteto Fantástico"],
    active: true,
  };
  context("Quando tenho um personagem cadastrado", function () {
    before(function () {
      cy.postCharacter(tochaHumana).then(function (response) {
        Cypress.env("characterId", response.body.character_id);
      });
    });
    it("Deve remover o personagem pelo ID", function () {
      cy.deleteCharacterById(id).then(function (response) {
        expect(response.status).to.eql(204);
      });
    });
  });
  //dupla checagem se foi removido
  after(function () {
    const id = Cypress.env("characterId");
    cy.getCharacterById(id).then(function (response) {
      expect(response.status).to.eql(404);
    });
  });
  it("Deve retornar 404 ao remover por ID não cadastrado", function () {
    const id = "8r8t8686a68s868f868f";
    cy.getCharacterById(id).then(function (response) {
      expect(response.status).to.eql(404);
    });
  });
});
