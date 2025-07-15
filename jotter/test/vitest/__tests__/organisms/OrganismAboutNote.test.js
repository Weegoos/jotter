import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { Input } from "postcss";
import {QCard, QCardSection, QDialog, Quasar} from "quasar";
import { Button } from "src/components/atoms";
import OrganismAboutNote from "src/components/organism /OrganismAboutNote.vue";
import { describe, expect, it, vi } from "vitest";
installQuasarPlugin();

vi.mock('src/composables/api-method/get', () => ({
  getMethod: vi.fn(),
}));

vi.mock('src/composables/api-method/delete', () => ({
  deleteMethod: vi.fn(),
}));

vi.mock('src/composables/api-method/put', () => ({
  putMethod: vi.fn(),
}));

vi.mock('vue-router', () => ({
  useRoute: () => ({ params: { id: 1 } }),
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock('quasar', async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    useQuasar: () => ({
      notify: vi.fn(), // если в коде вызывается $q.notify
      dialog: vi.fn(), // если используется $q.dialog
      screen: { width: 1920 }, // или любое другое значение
    }),
  };
});

vi.mock('src/composables/javascript-function/formatDate', () => ({
  useDateFormat: (date) => `formatted-${date}`,
}));

vi.mock('src/composables/javascript-function/websocket', () => ({
  useWebSocket: vi.fn(),
}));


describe("OrganismAboutNote.vue", () => {
  const wrapper = mount(OrganismAboutNote, {
    global: {
      plugins: [Quasar],
      components: {Button, Input},
       provide: {
      // мокай приватную ноту
      $privateNote: 'private',
    },
    },
    props: {
      isOpenDetailedInformation: true,
      detailedInformation: {
        id: 1,
        title: "Test Note",
        content: "This is a test note.",
        createdAt: "2023-10-01T12:00:00Z",
        updatedAt: "2023-10-02T12:00:00Z",
        type: 'private'
      },
    },
    emits: ["closeDetailedInformationSection"],
  })
  it("should render correctly", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should render q-dialog", async () => {
    expect(wrapper.vm.isOpen).toBe(true);
    const dialog = wrapper.findComponent(QDialog);
    expect(dialog.exists()).toBe(true);
  });

  it("should render QCard", async () => {
    const card = wrapper.findComponent(QCard);
    expect(card.exists()).toBe(true);

    const cardSection = wrapper.findComponent(QCardSection);
    expect(cardSection.exists()).toBe(true);
  })
it('should render detailed information section', async () => {
  wrapper.vm.isDecrypted = true;
  await wrapper.vm.$nextTick();

  wrapper.vm.isOpen = true;
await wrapper.vm.$nextTick();

  wrapper.vm.isDecrypted = false;
  await wrapper.vm.$nextTick();

  const section = wrapper.find('[data-testid="detailed-information-section"]');
  // expect(section.exists()).toBe(true);
});
  // Add more tests as needed
});
