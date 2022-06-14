import Button from './Button';

describe('Button', () => {
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
