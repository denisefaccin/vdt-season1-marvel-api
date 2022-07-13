function uid() {
  return `${Date.now()}${Math.random()}`;
}

const unexistentId = 'fooBar';

describe('GET/characters', function () {
  const characters = [
    {
      name: uid(),
      alias: uid(),
      team: [uid()],
      active: true
    },
    {
      name: uid(),
      alias: uid(),
      team: [uid()],
      active: true
    },
    {
      name: uid(),
      alias: uid(),
      team: [uid()],
      active: true
    }
  ];

  before(function () {
    cy.setToken();
    cy.populateCharacters(characters);
  });

  it('Deve retornar uma lista de personagens', function () {
    cy.getCharacters().then(function (response) {
      expect(response.status).to.eql(200);
      expect(response.body).to.be.a('array');
      expect(response.body.length).greaterThan(0);
    });
  });

  it('Deve buscar personagem por nome', function () {
    cy.searchCharacters(characters[0].name).then(function (response) {
      expect(response.status).to.eql(200);
      expect(response.body.length).to.greaterThan(0);
      expect(response.body[0].alias).to.eql(characters[0].alias);
      expect(response.body[0].active).to.eql(characters[0].active);
      expect(response.body[0].team).to.eql(characters[0].team);
    });
  });
});

describe('GET/characters/id', function () {
  const characterMock = {
    name: uid(),
    alias: uid(),
    team: [uid()],
    active: true
  };

  before(function () {
    cy.setToken();
  });

  context('Quando tenho um personagem cadastrado', function () {
    before(function () {
      cy.postCharacter(characterMock).then(function (response) {
        Cypress.env('characterId', response.body.character_id);
      });
    });

    it('Deve buscar o personagem pelo ID', function () {
      const characterId = Cypress.env('characterId');
      cy.getCharacterById(characterId).then(function (response) {
        expect(response.status).to.eql(200);
        expect(response.body.name).to.eql(characterMock.name);
        expect(response.body.alias).to.eql(characterMock.alias);
        expect(response.body.active).to.eql(characterMock.active);
        expect(response.body.time).to.eql(characterMock.time);
      });
    });
  });

  it('Deve retornar 400 ao buscar por ID não cadastrado', function () {
    cy.getCharacterById(unexistentId).then(function (response) {
      expect(response.status).to.eql(400);
    });
  });
});
