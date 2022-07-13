describe('DELETE/characters/id', function () {
  const tochaHumana = {
    name: 'Jhonny Storm',
    alias: 'Tocha Humana',
    team: ['Quarteto Fantástico'],
    active: true
  };

  const unexistentId = 'fooBar';

  before(function () {
    cy.setToken();
  });

  context('Quando tenho um personagem cadastrado', function () {
    before(function () {
      cy.postCharacter(tochaHumana).then(function (response) {
        Cypress.env('characterId', response.body.character_id);
      });
    });

    it('Deve remover o personagem pelo ID', function () {
      const characterId = Cypress.env('characterId');
      cy.deleteCharacterById(characterId).then(function (response) {
        expect(response.status).to.eql(204);
      });
    });
  });

  context('Quando não tenho um personagem cadastrado', function () {
    it('Deve retornar 404 ao remover por ID não cadastrado', function () {
      cy.getCharacterById(unexistentId).then(function (response) {
        expect(response.status).to.eql(400);
      });
    });
  });

  // dupla checagem se foi removido
  after(function () {
    const characterId = Cypress.env('characterId');
    cy.getCharacterById(characterId).then(function (response) {
      expect(response.status).to.eql(404);
    });
  });
});
