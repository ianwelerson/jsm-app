import { render, fireEvent, waitFor } from '@testing-library/vue'
import StateFilter from '@/views/Users/UserList/components/StateFilter/StateFilter.vue'

// const mockResponse = [
//   {
//     name: 'Espírito Santo',
//     key: 'es',
//   },
//   {
//     name: 'São Paulo',
//     key: 'sp',
//   },
//   {
//     name: 'Rio de Janeiro',
//     key: 'rj',
//   },
//   {
//     name: 'Rio Grande do Sul',
//     key: 'rs',
//   },
//   {
//     name: 'Mato Grosso do Sul',
//     key: 'ms',
//   },
//   {
//     name: 'Acre',
//     key: 'ac',
//   },
// ]

describe('StateFilter', () => {
  it('should emit an update with the list of selected elements', async () => {
    const { getAllByTestId, emitted } = render(StateFilter)

    await waitFor(() => {
      const stateFilter = getAllByTestId('state-filter-input')

      fireEvent.click(stateFilter[0])
    })

    await waitFor(() => {
      expect(emitted('update')[0]).toEqual([['es']])
    })
  })

  it('should show more items when user clicks on show more button', async () => {
    const { getByTestId, getByText } = render(StateFilter)

    getByText('Ver todos')

    const stateFilter = getByTestId('state-filter-show-more')
    fireEvent.click(stateFilter)

    await waitFor(() => {
      getByText('Acre')
      getByText('Ver menos')
    })
  })

  it('should match the snapshot', async () => {
    const { html } = render(StateFilter)

    expect(html()).toMatchSnapshot()
  })
})
