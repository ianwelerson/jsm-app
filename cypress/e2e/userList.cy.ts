// https://docs.cypress.io/api/introduction/api.html

describe('Acessing user list', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit('/users')

    cy.intercept(
      {
        method: 'GET',
        url: '/v1/users/states',
      },
      { fixture: '/users/states.json' }
    ).as('getStateList')

    cy.intercept(
      {
        method: 'GET',
        url: '/v1/users',
      },
      { fixture: '/users/list.json' }
    ).as('getUsersDefault')

    cy.intercept(
      {
        method: 'GET',
        url: '/v1/users?sort=name',
      },
      { fixture: '/users/listSortedByName.json' }
    ).as('getUsersSortedByName')

    cy.intercept(
      {
        method: 'GET',
        url: '/v1/users?sort=city',
      },
      { fixture: '/users/listSortedByCity.json' }
    ).as('getUsersSortedByCity')

    cy.intercept(
      {
        method: 'GET',
        url: '/v1/users?state=acre&sort=name',
      },
      { fixture: '/users/listFilteredByState.json' }
    ).as('getUsersFilteredByState')

    cy.intercept(
      {
        method: 'GET',
        url: '/v1/users?query=du&sort=name',
      },
      { fixture: '/users/listFilteredByName.json' }
    ).as('getUsersFilteredByName')
  })

  it('can view a user list', () => {
    cy.contains('h1', 'Lista de membros')
    cy.get('[data-testid=user-card]').should('have.length', 9)
  })

  it('can filter users by state', () => {
    cy.get('[data-testid=state-filter-input]').first().click()

    cy.wait('@getUsersFilteredByState')
    cy.contains('p', 'acre')
  })

  it('can filter users by search bar', () => {
    cy.get('[data-testid=search-bar-input]').type('du')

    cy.wait('@getUsersFilteredByName')
    cy.contains('p', 'alexandra duarte')
  })

  it('can filter users by search bar', () => {
    cy.get('.base-select').select('city')

    cy.wait('@getUsersSortedByCity')
    cy.contains('p', 'denice ribeiro')
  })

  it('can access a user profile and get back by clicking on header logo', () => {
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
