import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CatGif from '../CatGif.vue'

describe('CatGif', () => {
  it('renders properly', () => {
    const wrapper = mount(CatGif)
    expect(wrapper.text()).toContain('Thanks for taking a look!')
  })
})
