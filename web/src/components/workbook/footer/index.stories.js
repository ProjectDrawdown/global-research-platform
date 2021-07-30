import React from 'react'

import WorkbookFooter from './'

export default {
  component: WorkbookFooter,
  title: 'Workbook/Footer'
}

const Template = args => (
  <WorkbookFooter {...args} />
)

export const Default = Template.bind({})
Default.args = {}