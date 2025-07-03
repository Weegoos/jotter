import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import {Quasar} from "quasar";
import BaseButton from "src/components/atoms/BaseButton.vue";
import { describe, expect, it } from "vitest";

installQuasarPlugin()

describe('BaseButton', () => {
  const wrapper = mount(BaseButton, {
    global: {
      plugins: [Quasar]
    },
    props: {
      color: 'primary',
      label: 'Base Button',
      icon: 'check'
    },
    emits: ['emitClick']
  })

  it('should find button', () => {
    expect(wrapper.exists()).toBe(true)

    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
  })

  it('should check the value of props', async () => {
    expect(wrapper.props('color')).toBe('primary')
    expect(wrapper.props('label')).toBe('Base Button')
    expect(wrapper.props('icon')).toBe('check')
  })

  it('should set value to the props', async () => {
    await wrapper.setProps({
      label: 'Click',
      icon: '',
      color: 'secondary'
    })

    expect(wrapper.props('label')).toBe('Click')
    expect(wrapper.props('icon')).toBe('')
    expect(wrapper.props('color')).toBe('secondary')
  })

  it('should check the emits', async () => {
    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.emitted('emitClick')).toBeDefined()
    expect(wrapper.emitted('emitClick').length).toBe(1);
  })
})
