import React from 'react'

import { PortfolioLayout } from './'

export default {
  component: PortfolioLayout,
  title: 'Default Layout for Portfolio'
}

const Template = args => <PortfolioLayout {...args}/>

// TODO: add arguments

export const Default = Template.bind({})
Default.args = {}