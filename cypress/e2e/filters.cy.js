describe('Filtrer funktion', () => {
  it('ska kunna filtrera utmaningar hitta resultat', () => {
    cy.visit('/'); // Besöker hemsidan

    cy.get('.challenge__btn').first().click(); // Modal kontroll
    cy.wait(2000);
    cy.get('.booking__search-btn').click(); // Boka knappen

    // Fel meddelande
    cy.window().then((win) => { 
      cy.stub(win, 'alert').callsFake((message) => {
        expect(message).to.equal('Please select a valid date.');
      });
    });
    cy.wait(1000);
    cy.visit('/challenges.html?type=onsite'); // Besöker Challenge filter sida

    cy.get('.filter__button__title').click(); // Trycker på filter knappen

    cy.get('#searchField-input').type('Challenge in the machin'); // Vi söker efter utmaning

    //Vi kolar att den finns kvar men inte de andra
    cy.get('.challenge__description').should('have.text', 'This room is a lot of fun');
    cy.get('.challenge__description').contains('Challenge in the night').should('not.exist');
    cy.wait(2000);
    cy.get('#searchField-input').type('Mer text'); // Mer text
    cy.get('.challenges__list').should('have.text', 'No matching challenges'); // Fel meddelande

  });
});