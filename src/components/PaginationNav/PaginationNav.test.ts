import { render, fireEvent } from '@testing-library/vue'
import PaginationNav from '@/components/PaginationNav/PaginationNav.vue'

describe('PaginationNav', () => {
  it('should render pagination only with the defaul items to show', () => {
    const { getByText } = render(PaginationNav, {
      props: {
        max: 20,
        current: 1,
      },
    })

    getByText('1')
    getByText('2')
    getByText('3')
    getByText('4')
  })

  it('should render pagination item with custom visible items (itemToShow)', async () => {
    const { getByText } = render(PaginationNav, {
      props: {
        max: 6,
        itemToShow: 10,
        current: 1,
      },
    })

    getByText('1')
    getByText('2')
    getByText('3')
    getByText('4')
    getByText('5')
    getByText('6')
  })

  it('should emit event with selected number', async () => {
    const { getByText, emitted } = render(PaginationNav, {
      props: {
        max: 4,
        current: 1,
      },
    })

    await fireEvent.click(getByText('1'))

    expect(emitted('goTo')[0]).toStrictEqual([1])
  })

  it('should emit event with next item when arrow navigation is used', async () => {
    const current = 4
    const { getByTestId, emitted } = render(PaginationNav, {
      props: {
        max: 20,
        current,
      },
    })

    await fireEvent.click(getByTestId('pagination-nav-next'))

    expect(emitted('goTo')[0]).toStrictEqual([current + 1])
  })

  it('should emit event with prev item when arrow navigation is used', async () => {
    const current = 20

    const { getByTestId, emitted } = render(PaginationNav, {
      props: {
        max: 20,
        current,
      },
    })

    await fireEvent.click(getByTestId('pagination-nav-prev'))

    expect(emitted('goTo')[0]).toStrictEqual([current - 1])
  })

  it('should match the snapshot', () => {
    const { html } = render(PaginationNav, {
      props: {
        max: 22,
        current: 10,
      },
    })

    expect(html()).toMatchSnapshot()
  })
})
