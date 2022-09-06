import { render } from '@testing-library/vue'
import IconBase from '@/components/IconBase/IconBase.vue'

const propsExample = {
  color: '#000000',
  height: 14,
  name: 'IconMenu',
}

describe('IconBase', () => {
  it('should render icon with all props', async () => {
    const { getByTestId } = render(IconBase, {
      props: {
        ...propsExample,
        width: 14,
      },
    })

    await vi.dynamicImportSettled()

    getByTestId('icon-base')
  })

  it('should match the snapshot', async () => {
    const { html } = render(IconBase, {
      props: {
        ...propsExample,
      },
    })

    await vi.dynamicImportSettled()

    expect(html()).toMatchSnapshot()
  })
})
