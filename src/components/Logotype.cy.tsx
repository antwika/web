import Logotype from './Logotype';

describe('Logotype', () => {
  it('is rendered and visible', () => {
    cy.mount(
      <Logotype />
    );
    cy.get('[data-cy="logotype"]').should('be.visible');
  });
});
