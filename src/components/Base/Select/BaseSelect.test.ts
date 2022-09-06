import { render } from '@testing-library/vue'
import BaseSelect from '@/components/Base/Select/BaseSelect.vue'

describe('BaseSelect', () => {
  it('should render the received options', async () => {
    const { getByText } = render(BaseSelect, {
      props: {
        name: 'base-select-test',
        options: [
          {
            name: 'Nome',
            value: 'name',
          },
          {
            name: 'Cidade',
            value: 'city',
          },
        ],
      },
    })

    getByText('Nome')
    getByText('Cidade')
  })

  it('should match the snapshot', async () => {
    const { html } = render(BaseSelect)

    expect(html()).toMatchSnapshot()
  })
})
