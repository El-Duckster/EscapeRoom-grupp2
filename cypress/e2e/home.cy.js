describe('template spec', () => {
  it('passes', () => {
    cy.visit('/')

    cy.get('h1').first().should('have.text', 'Hacker Escape Rooms');
  })
})