import React from 'react'

import { QuestionBox } from './QuestionBox'

export default {
  component: QuestionBox,
  title: 'Question Box with Tooltip popup'
}

const Template = args => <QuestionBox {...args}/>

const SampleComponent = () => (
  <div>
    Hello World
  </div>
)

export const Default = Template.bind({})
Default.args = {
  TooltipWidget: SampleComponent
}