import { uid } from './../support/uid.js';

describe('POST/characters', function () {
  const character = {
    name: uid(),
    alias: uid(),
    team: [uid()],
    active: true
  };

  before(function () {
    cy.setToken();
    cy.back2ThePast();
  });

  it('Deve cadastrar um personagem', function () {
    cy.postCharacter(character).then(function (response) {
      expect(response.status).to.equal(201);
      // expect(response.body.character_id.lenght).to.equal(24);
    });
  });

  it('não deve cadastrar duplicado', function () {
    cy.postCharacter(character).then(function (response) {
      expect(response.status).to.equal(400);
      expect(response.body.error).to.equal('Duplicate character');
    });
  });
});
