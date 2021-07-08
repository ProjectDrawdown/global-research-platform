import React from 'react'

import DashboardLayout from './'

export default {
  component: DashboardLayout,
  title: 'Layouts/Dashboard'
}

const Template = args => (
  <DashboardLayout {...args}>
    Hello World
  </DashboardLayout>
)


export const Default = Template.bind({})
Default.args = {}