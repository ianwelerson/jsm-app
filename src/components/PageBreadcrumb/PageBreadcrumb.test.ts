import { render } from '@testing-library/vue'
import PageBreadcrumb from '@/components/PageBreadcrumb/PageBreadcrumb.vue'

vi.mock('vue-router', () => ({
  useRoute: vi
    .fn()
    .mockReturnValueOnce({
      matched: [],
    })
    .mockReturnValueOnce({
      matched: [
        {
          name: 'myPage',
          meta: {
            title: 'My Page',
          },
        },
        {
          name: 'mySecondPage',
          meta: {},
        },
      ],
    })
    .mockReturnValue({
      matched: [
        {
          name: 'myPage',
          meta: {
            title: 'My Page',
          },
        },
        {
          name: 'mySecondPage',
          meta: {
            title: 'My Second Page',
          },
        },
      ],
    }),
}))

describe('PageBreadcrumb', () => {
  it('should not render when has only one item', async () => {
    const { queryAllByTestId } = render(PageBreadcrumb)

    expect(queryAllByTestId('breadcrumb-item').length).toBe(0)
  })

  it('should ignore any item without title in meta', async () => {
    const { getByText, queryAllByTestId } = render(PageBreadcrumb)

    getByText('Home')
    getByText('My Page')
    expect(queryAllByTestId('breadcrumb-item').length).toBe(2)
  })

  it('should render all received items', async () => {
    const { getByText, queryAllByTestId } = render(PageBreadcrumb)

    getByText('Home')
    getByText('My Second Page')
    expect(queryAllByTestId('breadcrumb-item').length).toBe(3)
  })

  it('should match the snapshot', async () => {
    const { html } = render(PageBreadcrumb)

    expect(html()).toMatchSnapshot()
  })
})
