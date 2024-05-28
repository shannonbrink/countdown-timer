import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TimerCountdown from '../TimerCountdown.vue'

describe('TimerCountdown', () => {
  it('renders properly', () => {
    const wrapper = mount(TimerCountdown)
    expect(wrapper.text()).toContain('Welcome to the Countdown Timer!')
  })
})
