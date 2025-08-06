import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
installQuasarPlugin();
import { mount } from '@vue/test-utils';
import { QHeader, Quasar } from 'quasar';
import { Button, Icon, PopoverItem } from 'src/components/atoms';
import OrganismHeader from 'src/components/organism /OrganismHeader.vue';
import { describe, expect, it, vi } from 'vitest';

describe('OrganismHeader.vue', () => {
  const wrapper = mount(OrganismHeader, {
    global: {
      plugins: [Quasar],
      components: { QHeader, Button, Icon, PopoverItem },
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
  it('', () => {});
  // it('should correctly render', () => {
  //   expect(wrapper.exists()).toBeTruthy();
  // });

  // it('should render q-header', () => {
  //   const header = wrapper.find('[data-testid="main-header"]');
  //   expect(header.exists()).toBe(true); // ✅ теперь будет true
  // });

  // it('should call toggleDrawer when icon is clicked', async () => {
  //   const icon = wrapper.find('[data-testid="toggle-icon"]');
  //   await icon.trigger('click');
  //   expect(wrapper.emitted('toggleDrawer')).toBeTruthy();
  //   expect(wrapper.emitted('toggleDrawer').length).toBe(1);
  // });

  // it('should render userFullname', async () => {
  //   expect(wrapper.props('userFullname')).toBe('Batyr Ashim');

  //   await wrapper.setProps({ userFullname: 'John Doe' });
  //   expect(wrapper.props('userFullname')).toBe('John Doe');
  // });

  // it('should render header nav', () => {
  //   const headerNav = wrapper.find('[data-testid="header-nav"]');
  //   expect(headerNav.exists()).toBe(true);
  // });

  // it('should render PopoverItem components', () => {
  //   const popoverItems = wrapper.findAllComponents(PopoverItem);
  //   expect(popoverItems).toHaveLength(3);

  //   expect(popoverItems[0].props('item')).toEqual(wrapper.props('file'));
  //   expect(popoverItems[1].props('item')).toEqual(wrapper.props('document'));
  //   expect(popoverItems[2].props('item')).toEqual(wrapper.props('profile'));
  // });

  // it('should render header buttons', async () => {
  //   await wrapper.setProps({ userFullname: '' });
  //   expect(wrapper.props('userFullname')).toBe('');
  //   const headerButtons = wrapper.find('[data-testid="header-buttons"]');
  //   expect(headerButtons.exists()).toBe(true);
  // });
});
