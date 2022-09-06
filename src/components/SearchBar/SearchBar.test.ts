import { render, fireEvent, waitFor } from '@testing-library/vue'
import SearchBar from '@/components/SearchBar/SearchBar.vue'

describe('SearchBar', () => {
  it('should emit an update with the field value when user type', async () => {
    const { getByTestId, emitted } = render(SearchBar)

    const searchInput = getByTestId('search-bar-input')

    await fireEvent.update(searchInput as HTMLInputElement, 'My term')

    expect((searchInput as HTMLInputElement).value).toEqual('My term')

    await waitFor(() => {
      expect(emitted('update')[0]).toEqual(['My term'])
    })
  })

  it('should match the snapshot', async () => {
    const { html } = render(SearchBar)

    expect(html()).toMatchSnapshot()
  })
})
