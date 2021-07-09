import React from 'react'
import { PageHeader } from './'
import { UserContext } from "services/user";

export default {
  component: PageHeader,
  title: 'Layouts/Header',
}

const Template = args => (
  <UserContext.Provider value={{}}>
    <PageHeader {...args}/>
  </UserContext.Provider>
)

const user = {
  id: "some_id"
}
const TemplateLoggedIn = args => (
  <UserContext.Provider value={{ user }}>
    <PageHeader {...args}/>
  </UserContext.Provider>
)

export const NonLoggedIn = Template.bind({})
NonLoggedIn.args = {}

export const LoggedIn = TemplateLoggedIn.bind({})
LoggedIn.args = {}