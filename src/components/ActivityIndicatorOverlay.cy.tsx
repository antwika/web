import ActivityIndicatorOverlay from './ActivityIndicatorOverlay';

describe('ActivityIndicatorOverlay', () => {
  it('is has an ActivityIndicator child', () => {
    cy.mount(
      <ActivityIndicatorOverlay />
    );
    cy.get('[data-cy="activity-indicator-overlay"]').should('be.visible');
    cy.get('[data-cy="activity-indicator"]').should('be.visible');
  });
});
