describe('RootLayout', () => {
  it('should render the html element with className bg-teal-400', () => {
    cy.visit('http://localhost:3000/')
    cy.get('html').should('have.class', 'bg-teal-400');

    // Take a snapshot for visual diffing
    cy.percySnapshot();

  })
})