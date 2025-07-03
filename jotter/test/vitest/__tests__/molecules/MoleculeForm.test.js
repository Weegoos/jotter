import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { Quasar } from "quasar";
import { Button } from "src/components/atoms";
import MoleculeForm from "src/components/molecules/MoleculeForm.vue";
import { beforeEach, describe, expect, it } from "vitest";

installQuasarPlugin();

describe("MoleculeForm", () => {
  let wrapper = mount(MoleculeForm, {
    global: {
      plugins: [Quasar],
      components: { Button },
    },
    props: {
      mainButtonLabel: "Sign in",
      moveButtonLabel: "Register",
      additionalButtonLabel: "Google",
    },
    emits: ["mainButton", "moveButton", "additionalButtonClick"],
  });
  let buttons;

  beforeEach(() => {
    buttons = wrapper.findAllComponents(Button);
  });

  it("renders wrapper", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders default buttons with correct labels and classes", async () => {
    expect(buttons).toHaveLength(3);

    expect(buttons[0].props("label")).toBe("Sign in");
    expect(buttons[1].props("label")).toBe("Register");
    expect(buttons[2].props("label")).toBe("Google");
  });

  it("emits buttons when they are clicked", async () => {
    await buttons[0].trigger("click");
    expect(wrapper.emitted("mainButton")).toBeTruthy();
    expect(wrapper.emitted("mainButton").length).toBe(1);

    await buttons[1].trigger("click");
    expect(wrapper.emitted("moveButton")).toBeTruthy();
    expect(wrapper.emitted("moveButton").length).toBe(1);

    await buttons[2].trigger("click");
    expect(wrapper.emitted("additionalButtonClick")).toBeTruthy();
    expect(wrapper.emitted("additionalButtonClick").length).toBe(1);
  });

  it("checks custom classes", () => {
    expect(buttons[0].classes()).toContain("w-[100%]");
    expect(buttons[1].classes()).toContain("w-[100%]");
    expect(buttons[2].classes()).toContain("w-[100%]");
  });
});

describe("MoleculeForm — with custom slots", () => {
  const wrapper = mount(MoleculeForm, {
    global: {
      plugins: [Quasar],
    },
    slots: {
      default: '<div class="custom-slot-default">Default Slot Content</div>',
      actions: '<div class="custom-slot-actions">Actions Slot Content</div>',
    },
  });

  it("renders custom slot content", () => {
    expect(wrapper.find(".custom-slot-default").exists()).toBe(true);
    expect(wrapper.find(".custom-slot-default").text()).toBe(
      "Default Slot Content"
    );

    expect(wrapper.find(".custom-slot-actions").exists()).toBe(true);
    expect(wrapper.find(".custom-slot-actions").text()).toBe(
      "Actions Slot Content"
    );
  });
});
