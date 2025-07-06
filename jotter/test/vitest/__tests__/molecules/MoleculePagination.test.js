import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { QPagination, Quasar } from 'quasar';
import MoleculePagination from 'src/components/molecules/MoleculePagination.vue';
import { describe, it } from 'vitest';

installQuasarPlugin();

describe('MoleculePagination', () => {
  let wrapper = mount(MoleculePagination, {
    global: {
      plugins: [Quasar],
      config: {
        globalProperties: {
          $maxNumberOfRequestPerPage: 10,
          totalCount: 30,
        },
      },
    },
    props: {
      variableName: {
        files: [
          {
            id: 2,
            name: 'Привет мир',
            description: 'Привет мир',
            status: 'active',
            pinned: false,
            createdAt: '2025-06-27T06:52:03.718Z',
            updatedAt: '2025-06-27T06:56:01.446Z',
            userId: 1,
          },
        ],
        totalCount: 1,
        totalPages: 1,
        currentPage: 1,
      },
    },
  });
  it('should render correctly', () => {
    const pagination = wrapper.findComponent(QPagination);
    expect(pagination.exists()).toBe(true);
  });

  it('emits pagination event when current page changes', async () => {
    const pagination = wrapper.findComponent(QPagination);
    expect(pagination.exists()).toBe(true);

    await pagination.vm.$emit('update:modelValue', 2);

    expect(wrapper.emitted('pagination')).toBeTruthy();
    expect(wrapper.emitted('pagination')[0]).toEqual([2]);
  });
});
