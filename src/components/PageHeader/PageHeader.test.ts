import { render, waitFor } from '@testing-library/vue'
import PageHeader from './PageHeader.vue'

describe('PageHeader', () => {
  it('should render page header', async () => {
    const { getByTestId } = render(PageHeader)

    getByTestId('page-header')
  })

  it('should open and close mobile menu', async () => {
    const { getByTestId } = render(PageHeader)

    getByTestId('page-header-menu-open').click()

    await waitFor(() => {
      expect(
        getByTestId('page-header').classList.contains(
          'page-header--menu-opened'
        )
      ).toBeTruthy()
    })

    getByTestId('page-header-menu-close').click()

    await waitFor(() => {
      expect(
        getByTestId('page-header').classList.contains(
          'page-header--menu-opened'
        )
      ).toBeFalsy()
    })
  })

  it('should match the snapshot', async () => {
    const { html } = render(PageHeader)

    expect(html()).toMatchSnapshot()
  })
})
