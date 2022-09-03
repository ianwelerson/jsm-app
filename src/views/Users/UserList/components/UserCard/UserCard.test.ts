import { render } from '@testing-library/vue'
import UserCard from '@/views/Users/UserList/components/UserCard/UserCard.vue'

const userDataMock = {
  id: 'alejandra.rodrigues',
  picture: 'https://randomuser.me/api/portraits/med/women/18.jpg',
  name: 'alejandra rodrigues',
  street: '3833 rua santa catarina',
  city: 'umuarama',
  state: 'santa catarina',
  postcode: 43646,
}

describe('UserCard', () => {
  it('should render all user information', async () => {
    const { getByText, getByRole } = render(UserCard, {
      props: {
        ...userDataMock,
      },
    })

    expect((getByRole('img') as HTMLImageElement).src).toBe(
      userDataMock.picture
    )
    getByText(userDataMock.name)
    getByText(userDataMock.street)
    getByText(userDataMock.city)
    getByText(`${userDataMock.state} - CEP: ${userDataMock.postcode}`)
  })

  it('should match the snapshot', async () => {
    const { html } = render(UserCard)

    expect(html()).toMatchSnapshot()
  })
})
