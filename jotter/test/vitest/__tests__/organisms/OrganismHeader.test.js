import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { Quasar } from 'quasar';
import { Button, Icon, PopoverItem } from 'src/components/atoms';
import OrganismHeader from 'src/components/organisims/OrganismHeader.vue';
import { describe, expect, it, vi } from 'vitest';

installQuasarPlugin();

describe('OrganismHeader.vue', () => {
  const wrapper = mount(OrganismHeader, {
    global: {
      plugins: [Quasar],
      components: { Button, Icon, PopoverItem },
    },
    props: {
      header: true,
      userFullname: 'Batyr Ashim',
      isMobile: true,
      toggleDrawer: () => vi.fn(),
      file: {
        name: 'Create file',
        description: 'Create a new file in the system',
        href: '/create-file',
        icon: 'mdi-file-plus',
      },
      document: {
        name: 'Create document',
        description: 'Create a new document in the system',
        href: '/create-document',
        icon: 'mdi-file-document-plus',
      },
      profile: {
        name: 'Personal data',
        description: 'View your personal information',
        href: '/personal-data',
        icon: 'mdi-account-edit',
      },
    },
    emits: ['toggleDrawer'],
  });
  it('should correctly render', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render userFullname', async () => {;
    expect(wrapper.props('userFullname')).toBe('Batyr Ashim');

    await wrapper.setProps({ userFullname: 'John Doe' });
    expect(wrapper.props('userFullname')).toBe('John Doe');
  });
});
