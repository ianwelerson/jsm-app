import { render } from '@testing-library/vue'
import PageFooter from '@/components/PageFooter/PageFooter.vue'

describe('PageFooter', () => {
  it('should match the snapshot', async () => {
    const { html } = render(PageFooter)

    expect(html()).toMatchSnapshot()
  })
})
