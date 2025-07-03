import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils'
import {Quasar} from 'quasar';
import BaseInput from 'src/components/atoms/BaseInput.vue'
import { describe, it } from 'vitest'

installQuasarPlugin();

describe('BaseInput', () => {
  const wrapper = mount(BaseInput, {
    props: {
      modelValue: '',
      type: 'text',
      placeholder: 'Enter text',
      label: 'Input Label',
    },
    emits: ['update:modelValue'],
    global: {
      plugins: [Quasar]
    }
  })

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)

    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
  })

  it ('should check the value', async () => {
    const input = wrapper.find('input')
    await input.setValue('Test input')
    expect(wrapper.emitted('update:modelValue')).toBeDefined()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Test input'])
  })

  it ('should check the placeholder', async () => {
    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('Enter text')
  })

  it('should check the label and disabled', () => {
    expect(wrapper.text()).toContain('Input Label')
  })

})
