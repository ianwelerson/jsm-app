import { render } from '@testing-library/vue'
import ContentBlock from '@/views/Users/UserDetails/components/ContentBlock/ContentBlock.vue'

const mockProp = {
  title: 'My field',
  value: 'My value',
}

describe('ContentBlock', () => {
  it('should render content props', async () => {
    const { getByText } = render(ContentBlock, {
      props: {
        ...mockProp,
      },
    })

    getByText(mockProp.title)
    getByText(mockProp.value)
  })

  it('should match the snapshot', async () => {
    const { html } = render(ContentBlock, {
      props: {
        ...mockProp,
      },
    })

    expect(html()).toMatchSnapshot()
  })
})
