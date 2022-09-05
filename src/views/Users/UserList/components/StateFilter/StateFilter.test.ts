import { render, fireEvent, waitFor } from '@testing-library/vue'
import StateFilter from '@/views/Users/UserList/components/StateFilter/StateFilter.vue'

vi.mock('@/composable/useFetch', () => ({
  useFetch: vi.fn().mockReturnValue({
    execute: vi.fn().mockResolvedValue({
      data: {
        value: [
          'acre',
          'alagoas',
          'amapá',
          'amazonas',
          'bahia',
          'ceará',
          'distrito federal',
          'espírito santo',
          'goiás',
        ],
      },
    }),
  }),
}))

describe('StateFilter', () => {
  it('should emit an update with the list of selected elements', async () => {
    const { getAllByTestId, emitted } = render(StateFilter)

    await waitFor(() => {
      const stateFilter = getAllByTestId('state-filter-input')

      fireEvent.click(stateFilter[0])
    })

    await waitFor(() => {
      expect(emitted('update')[0]).toEqual([['acre']])
    })
  })

  it('should show more items when user clicks on show more button', async () => {
    const { getByTestId, getByText } = render(StateFilter)

    await waitFor(() => {
      getByText('Ver todos')
    })

    const stateFilter = getByTestId('state-filter-show-more')
    fireEvent.click(stateFilter)

    await waitFor(() => {
      getByText('acre')
      getByText('Ver menos')
    })
  })

  it('should match the snapshot', async () => {
    const { html } = render(StateFilter)

    expect(html()).toMatchSnapshot()
  })
})
