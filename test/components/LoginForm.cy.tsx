import { IntlProvider } from 'react-intl';
import LoginForm from '../../src/components/LoginForm';
import { MESSAGES } from '../../src/misc/locales';

describe('LoginForm', () => {
  it('renders', () => {
    cy.mount(
      <IntlProvider
        messages={MESSAGES['sv-SE']}
        locale={'sv-SE'}
        defaultLocale={'en-US'}
        defaultRichTextElements={{
          strong: (chunks) => (<strong>{chunks}</strong>)
        }}
      >
        <LoginForm />
      </IntlProvider>
    );
    cy.get('[data-cy="login-form"]')
      .should('be.visible')
      .and('contain.text', 'Logga in');
  });
});
