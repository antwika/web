import ActivityIndicator from './ActivityIndicator';

describe('ActivityIndicator', () => {
  it('is rendered and visible', () => {
    cy.mount(
      <ActivityIndicator />
    );
    cy.get('[data-cy="activity-indicator"]').should('be.visible');
  });
});
