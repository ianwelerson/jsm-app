// https://docs.cypress.io/api/introduction/api.html

describe('Acessing user list', () => {
  it('can view a user list', () => {
    cy.visit('/users')
    cy.contains('h1', 'Lista de membros')
    cy.get('[data-testid=user-card]').should('have.length', 5)
  })

  it('can access a user profile and get back by clicking on header logo', () => {
    cy.visit('/users')
    cy.get('[data-testid=user-card]').first().click()

    cy.contains('p', 'alejandra rodrigues')

    cy.get('[data-testid=page-header]').find('a').first().click()
    cy.contains('h1', 'Lista de membros')
  })

  it('can access a user profile and get back by clicking on breadcrumb', () => {
    cy.visit('/users')
    cy.get('[data-testid=user-card]').first().click()

    cy.contains('p', 'alejandra rodrigues')

    cy.get('[data-testid=breadcrumb-item]').eq(1).click()

    cy.contains('h1', 'Lista de membros')
  })
})
