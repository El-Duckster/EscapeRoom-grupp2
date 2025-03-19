//This test visits the startpage '/' and searches for the H1 text. The test should verify the visibility.
describe('Hacker Escape Rooms - Startsidans tester', () => {
    it('Laddar startsidan och visar rätt rubrik', () => {
      cy.visit('/');
      cy.contains('h1', 'Hacker Escape Rooms').should('be.visible');
    });
  });

  // This test verifies that challenges can be filtered based on difficulty level.
  describe('filterfunktion i challenges', () => {
    it('Ska kunna filtrera challenges baserat på svårighetsgrad', () => {
        cy.visit('/');
        cy.get('.sorting-selection').select('Advanced');
        cy.contains('.challenge-card', 'Advanced').should('be.visible');
    }) 
  })

 // This test checks the navigation menu functionality by navigating from the home page to the "The Story" page.
  describe('Navigeringstester', () => {
    it('Ska kunna gå från startsidan till the story', () => {
      cy.visit('/');
      cy.get('nav').contains('a', 'The Story').click();
      cy.url().should('include', '/about.html');
      cy.contains('h1', 'Our Story').should('be.visible');
    });
  });
  
   // This test verifies that an error message is displayed when an invalid date is provided.
  describe('Felhantering vid sökning', () => {
    it('Ska visa felmeddelande vid angivet ogiltigt datum', () => {
      cy.visit('/challenges.html');
      cy.get('.booking__search-btn').click();
      cy.contains('.error-message', 'Vänligen välj ett giltigt datum').should("be.visible");
    });
  });

   // This test checks that an HTML validation error message is displayed when attempting to submit a booking with an empty name.
  it('Ska visa html-felmeddelandet vid bokningsförsök med tomt namn', () => {
    cy.visit('/challenges.html');
    cy.get('#booking-date').type('2025-04-10');
    cy.get('.booking__search-btn').click();

    cy.get('#booking-name').clear();
    cy.get('.submit_booking_btn').click();
    
    cy.get('#booking-name').then(($input) => {
    expect($input[0].validationMessage).to.not.be.empty;
    });

  });
  
