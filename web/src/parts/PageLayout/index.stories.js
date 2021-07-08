import React from 'react'

import { PageLayout } from './'

export default {
  component: PageLayout,
  title: 'Default Page Layout'
}

const Template = args => <PageLayout {...args}/>

// TODO: add arguments

export const Default = Template.bind({})
Default.args = {}