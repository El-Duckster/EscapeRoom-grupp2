describe('Verify startpage', () => {
    it('Verifies that the site is up and running on localhost and checks for static content', () => {    
    cy.visit('/');
    cy.get('h1').should('contain.text', 'Hacker Escape Room');
    })
})