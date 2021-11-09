import React from 'react'
import { UserContext } from "services/user";
import PageLayout from './'

export default {
  component: PageLayout,
  title: 'Layouts/Page'
}

const Template = args => (
  <UserContext.Provider value={{}}>
    <PageLayout {...args}/>
  </UserContext.Provider>
)

export const Default = Template.bind({})
Default.args = {}