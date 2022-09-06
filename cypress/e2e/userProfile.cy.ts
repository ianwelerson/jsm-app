// https://docs.cypress.io/api/introduction/api.html

describe('Acessing user profile', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit('/users')

    cy.intercept(
      {
        method: 'GET',
        url: '/v1/users/abraim.dacosta',
      },
      { fixture: '/users/data.json' }
    ).as('getUserData')

    cy.intercept(
      {
        method: 'GET',
        url: '/v1/users?sort=name',
      },
      { fixture: '/users/listSortedByName.json' }
    ).as('getUsersSortedByName')

    cy.get('[data-testid=user-card]').first().click()
  })

  it('can view user data', () => {
    cy.wait('@getUserData')

    cy.contains('p', 'abraim da costa')
    cy.contains('p', '7/26/1993')
    cy.contains('p', 'abraim.dacosta@example.com')
  })
})
