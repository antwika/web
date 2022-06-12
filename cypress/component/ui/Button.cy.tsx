import Button from '../../../src/components/ui/Button';

describe('Button.cy.ts', () => {
  it('calls the onClick callback when clicked', () => {
    const onClick = cy.stub().as('onClick');
    cy.mount(
      <Button
        type='button'
        onClick={onClick}
      >
        Hello
      </Button>
    );
    cy.get('[data-cy="ui-button"]').click().should('contain.text', 'Hello');
    cy.get('@onClick').should('have.been.called');
  });
});
