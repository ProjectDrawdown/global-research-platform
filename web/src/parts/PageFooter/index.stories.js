import React from 'react'

import { PageFooter } from './'

export default {
  component: PageFooter,
  title: 'Layouts/Footer'
}

const Template = args => (
  <PageFooter {...args} />
)

export const Default = Template.bind({})
Default.args = {}