import React from 'react'

import WorkbookCardGrid from './'

export default {
  component: WorkbookCardGrid,
  title: 'Workbook/CardGrid'
}

const children = () => (
  <div>Hello World</div>
)

const Template = args => (
  <WorkbookCardGrid {...args} />
)

export const Default = Template.bind({})
Default.args = {
  children: children
}