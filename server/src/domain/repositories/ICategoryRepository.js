export class ICategoryRepository {
  /**
   * Создать категорию 
   * @param {*} categoryData
   */
  async create(categoryData) {
    console.log(categoryData);
    throw new Error('Create function should be used');
  }
}
