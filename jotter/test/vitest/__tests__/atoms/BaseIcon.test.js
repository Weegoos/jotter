import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import BaseIcon from "src/components/atoms/BaseIcon.vue";
import { describe, it, expect } from "vitest";

installQuasarPlugin();

describe("BaseIcon", () => {
  const wrapper = mount(BaseIcon, {});
  it("renders correctly", async () => {
    expect(wrapper.exists()).toBe(true);

    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);

    await img.trigger("click");
    expect(wrapper.emitted("click")).toBeDefined();
  });
});
