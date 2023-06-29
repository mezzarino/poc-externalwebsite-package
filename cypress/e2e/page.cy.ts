describe('External partner website with installed shared component', () => {
    it('should render the title', () => {
      cy.visit('http://localhost:3000/');
      cy.get('h1').contains('External partner website with installed shared component');

      // Take a snapshot for visual diffing
      cy.percySnapshot();
    });
  });