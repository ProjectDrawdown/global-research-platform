import React from 'react'
import { UserContext } from "services/user"
import { Provider } from "react-redux";
import store from "../../redux/store";
import PortfolioLayout from './'

export default {
  component: PortfolioLayout,
  title: 'Layouts/PortfolioLayout'
}

const Template = args => (
  <Provider store={store}>
    <UserContext.Provider value={{}}>
      <PortfolioLayout {...args}>
        <div style={{ height: '100vh' }}>Hello World</div>
      </PortfolioLayout>
    </UserContext.Provider>
  </Provider>
)

export const Default = Template.bind({})
Default.args = {}