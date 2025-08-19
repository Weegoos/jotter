export class CategoryEntity {
  constructor(id, type, name, icon) {
    ((this.id = id), (this.type = type), (this.name = name));
    this.icon = icon;
  }
}
