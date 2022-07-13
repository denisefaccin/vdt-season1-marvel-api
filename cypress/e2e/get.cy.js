describe('GET/characters', function () {
  const characters = [
    {
      name: 'Charles Xavier',
      alias: 'Professor X',
      team: ['x-men'],
      active: true
    },
    {
      name: 'Logan',
      alias: 'Wolverine',
      team: ['vingadores'],
      active: true
    },
    {
      name: 'Peter Parker',
      alias: 'Homem Aranha',
      team: ['novos vingadores'],
      active: true
    }
  ];

  before(function () {
    cy.bac2ThePast();
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
    cy.getCharacters('Logan').then(function (response) {
      expect(response.status).to.eql(200);
      expect(response.body.length).to.eql(1);
      expect(response.body[0].alias).to.eql('Wolverine');
      expect(response.body[0].active).to.eql(true);
      expect(response.body[0].time).to.eql('[x-men]');
    });
  });
});

describe('GET/characters/id', function () {
  before(function () {
    cy.bac2ThePast();
    cy.setToken();
  });

  const tonyStark = {
    name: 'Tony Stark',
    alias: 'Homem de Ferro',
    team: ['Vingadores'],
    active: true
  };

  context('Quando tenho um personagem cadastrado', function () {
    before(function () {
      // TODO
      cy.postCharacter(tonyStark).then(function (response) {
        Cypress.env('characterId', response.body.character_id);
      });
    });
    it('Deve buscar o personagem pelo ID', function () {
      cy.getCharacterById(id).then(function (response) {
        expect(response.status).to.eql(200);
        expect(response.body.alias).to.eql('Homem de Ferro');
        expect(response.body.active).to.eql(true);
        expect(response.body.time).to.eql('Vingadores');
      });
    });
  });

  it('Deve retornar 404 ao buscar por ID não cadastrado', function () {
    const id = '8r8t8686a68s868f868f';
    cy.getCharacterById(id).then(function (response) {
      expect(response.status).to.eql(404);
    });
  });
});
