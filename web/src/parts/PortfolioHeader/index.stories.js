import React from 'react'
import { UserContext } from "services/user"
import { Provider } from "react-redux";
import store from "../../redux/store";
import PortfolioHeader from './'

export default {
  component: PortfolioHeader,
  title: 'Layouts/PortfolioHeader'
}

const Template = args => (
  <Provider store={store}>
    <UserContext.Provider value={{}}>
      <PortfolioHeader {...args}/>
    </UserContext.Provider>
  </Provider>
)

export const Default = Template.bind({})
Default.args = {}