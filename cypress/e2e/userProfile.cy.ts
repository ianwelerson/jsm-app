// https://docs.cypress.io/api/introduction/api.html

describe('Acessing user profile', () => {
  beforeEach(() => {
    cy.visit('/users')
    cy.get('[data-testid=user-card]').first().click()
  })

  it('can view user data', () => {
    cy.contains('p', 'alejandra rodrigues')
    cy.contains('p', '5/16/1974')
    cy.contains('p', 'alejandra.rodrigues@example.com')
  })
})
