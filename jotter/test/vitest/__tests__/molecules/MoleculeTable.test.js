import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { Quasar } from "quasar";
import { Button } from "src/components/atoms";
import MoleculeTable from "src/components/molecules/MoleculeTable.vue";
import { beforeEach, describe, expect, it } from "vitest";

installQuasarPlugin();

describe("MoleculeTable", () => {
  const wrapper = mount(MoleculeTable, {
    global: {
      plugins: [Quasar],
      components: { Button },
    },
    props: {
      notes: [
        {
          id: 1,
          fileName: "Программирование",
          content: "Привет мир",
          title: "Привет мир",
          type: "public",
          pinned: false,
          password: null,
          hashtags: [],
          createdAt: "2025-06-26T05:56:27.535Z",
          updatedAt: "2025-06-26T05:56:27.535Z",
          fileId: 1,
        },
      ],
      title: "Test Table",
      columns: [
        {
          name: "name",
          label: "Название",
          field: "name",
          align: "left",
        },
        {
          name: "description",
          label: "Описание",
          field: "description",
          align: "left",
        },
        {
          name: "type",
          label: "Тип",
          field: "type",
          align: "left",
        },
        {
          name: "actions",
          label: "Действия",
          field: "id",
          align: "center",
        },
      ],
    },
    emits: ["update", "delete", "pin"],
  });

  let dropdown;

  beforeEach(async () => {
    dropdown = wrapper.findComponent({ name: "QBtnDropdown" });
    await dropdown.find("button").trigger("click");
    await wrapper.vm.$nextTick();
  });

  it("should render correctly with title", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain("Test Table");
  });

  it("should render correctly with notes", () => {
    expect(wrapper.props("notes")).toHaveLength(1);
    expect(wrapper.props("notes")[0].title).toBe("Привет мир");
    expect(wrapper.props("notes")[0].content).toBe("Привет мир");
  });

  it("should render correctly with columns", () => {
    const columns = wrapper.props("columns");
    expect(columns).toHaveLength(4);

    expect(columns[0].name).toBe("name");
    expect(columns[1].name).toBe("description");
    expect(columns[2].name).toBe("type");
    expect(columns[3].name).toBe("actions");

    const headers = wrapper.findAll("th");
    expect(headers).toHaveLength(4);
    expect(headers[0].text()).toBe("Название");
    expect(headers[1].text()).toBe("Описание");
    expect(headers[2].text()).toBe("Тип");
    expect(headers[3].text()).toBe("Действия");
  });

  it('should emit "pin" event when pin button is clicked', async () => {
    expect(dropdown.exists()).toBe(true);

    await dropdown.find("button").trigger("click");

    await wrapper.vm.$nextTick();

    const buttons = wrapper.findAllComponents(Button);
    expect(buttons.length).toBeGreaterThan(0);

    const pinButton = buttons.find((btn) => btn.props("icon") === "mdi-pin");
    expect(pinButton).toBeTruthy();

    await pinButton.trigger("click");

    expect(wrapper.emitted("pin")).toBeTruthy();
    expect(wrapper.emitted("pin")[0][0].title).toBe("Привет мир");
  });

  it('should emit "update" when update button is clicked', async () => {
    expect(dropdown.exists()).toBe(true);

    await dropdown.find("button").trigger("click");

    await wrapper.vm.$nextTick();

    const buttons = wrapper.findAllComponents(Button);
    expect(buttons.length).toBeGreaterThan(0);

    const updateButton = buttons.find(
      (btn) => btn.props("icon") === "mdi-pencil"
    );
    expect(updateButton).toBeTruthy();

    await updateButton.trigger("click");

    expect(wrapper.emitted("update")).toBeTruthy();

    expect(wrapper.emitted("update")[0][0].title).toBe("Привет мир");
  });

  it('should emit "delete" when update button is clicked', async () => {
    expect(dropdown.exists()).toBe(true);

    await dropdown.find("button").trigger("click");

    await wrapper.vm.$nextTick();

    const buttons = wrapper.findAllComponents(Button);
    expect(buttons.length).toBeGreaterThan(0);

    const deleteButton = buttons.find(
      (btn) => btn.props("icon") === "mdi-delete"
    );
    expect(deleteButton).toBeTruthy();

    await deleteButton.trigger("click");

    expect(wrapper.emitted("delete")).toBeTruthy();
    expect(wrapper.emitted("delete")[0][0].title).toBe("Привет мир");
  });
});
