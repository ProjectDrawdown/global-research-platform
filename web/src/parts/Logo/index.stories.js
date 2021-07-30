import React from 'react'

import Logo from './'

export default {
  component: Logo,
  title: 'Layouts/Logo'
}

const Template = args => (
  <Logo {...args} />
)

export const Default = Template.bind({})
Default.args = {}