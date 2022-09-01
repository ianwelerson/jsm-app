import { render } from '@testing-library/vue'
import PageFooter from '@/components/PageFooter/PageFooter.vue'

describe('PageFooter', () => {
  it('should render component with JSM company name', async () => {
    const { getByText } = render(PageFooter)

    getByText('Juntos Somos Mais Fidelização S.A.')
  })

  it('should match the snapshot', async () => {
    const { html } = render(PageFooter)

    expect(html()).toMatchSnapshot()
  })
})
