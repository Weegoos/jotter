import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { QEditor, Quasar } from "quasar";
import MoleculeQEditor from "src/components/molecules/MoleculeQEditor.vue";
import { beforeAll, describe, it, vi } from "vitest";

installQuasarPlugin();

describe("MoleculeQEditor.vue", () => {
  beforeAll(() => {
    document.execCommand = vi.fn();
  });
  it("should render QEditor without crashing", () => {
    const wrapper = mount(MoleculeQEditor, {
      props: {
        modelValue: "Editor",
        placeholder: "Введите текст...",
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.html()).toContain("Editor");

    const editor = wrapper.findComponent(QEditor);
    expect(editor.exists()).toBe(true);
  });

  it("should set initial value from modelValue", async () => {
    const wrapper = mount(MoleculeQEditor, {
      props: {
        modelValue: "Editor",
        placeholder: "Введите текст...",
      },
    });

    await wrapper.setProps({ modelValue: "Новое значение" });

    expect(wrapper.vm.qeditor).toBe("Новое значение");
  });

  it("should emit update:modelValue when content changes", async () => {
    const wrapper = mount(MoleculeQEditor, {
      props: {
        modelValue: "Editor",
        placeholder: "Введите текст...",
      },
    });

    wrapper.vm.qeditor = "<h1>Hello</h1>";
    await wrapper.vm.$nextTick();

    const emits = wrapper.emitted("update:modelValue");
    expect(emits).toBeTruthy();
    expect(emits[0]).toEqual(["<h1>Hello</h1>"]);
  });

  it("should emit saveWork when save handler is called", async () => {
    const wrapper = mount(MoleculeQEditor, {
      props: {
        modelValue: "Тест контент",
        placeholder: "Введите текст...",
      },
    });

    await wrapper.vm.saveWork();

    const emits = wrapper.emitted("saveWork");
    expect(emits).toBeTruthy();
    expect(emits[0]).toEqual(["Тест контент"]);
  });

  it("should emit sendWork when send handler is called", async () => {
    const wrapper = mount(MoleculeQEditor, {
      props: {
        modelValue: "Отправить это",
        placeholder: "Введите текст...",
      },
    });
    await wrapper.vm.sendWork();

    const emits = wrapper.emitted("sendWork");
    expect(emits).toBeTruthy();
    expect(emits[0]).toEqual(["Отправить это"]);
  });
});
