import { uid } from './../support/uid.js';

describe('DELETE/characters/id', function () {


  const characterMock = {
    name: uid(),
    alias: uid(),
    team: [uid()],
    active: true
  };

  const unexistentId = 'fooBar';

  before(function () {
    cy.log('aquiiiiiiiiiiiiiiiiiiiiiiiiiii');
    cy.setToken();
    cy.back2ThePast();
  });

  context('Quando tenho um personagem cadastrado', function () {
    before(function () {
      cy.postCharacter(characterMock).then(function (response) {
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
});
