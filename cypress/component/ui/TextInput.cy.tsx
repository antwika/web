import TextInput from '../../../src/components/ui/TextInput';

describe('TextInput', () => {
  it('calls the onClick callback when clicked', () => {
    cy.mount(
      <TextInput
        type='text'
        label='A label'
        placeholder='Type here...'
      />
    );
    cy.get('[data-cy="ui-text-input-label"]').should('contain.text', 'A label');
    cy.get('[data-cy="ui-text-input"]').should('have.attr', 'placeholder', 'Type here...')
    cy.get('[data-cy="ui-text-input"]').type('Foo bar').should('have.value', 'Foo bar');
  });
});
