const USER_NOT_FOUND = 'USER_NOT_FOUND';
const CATEGORY_NOT_FOUND = 'CATEGORY_NOT_FOUND';

export class CategoryUseCase {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(userId, name, type, icon) {
    if (!userId) {
      throw new Error(USER_NOT_FOUND);
    }

    if (!name || !type || !icon) {
      throw new Error('All fields are required');
    }

    const categoryData = {
      userId,
      name,
      type,
      icon,
    };

    return await this.categoryRepository.create(categoryData);
  }

  async getCategories(userId) {
    if (!userId) {
      throw new Error(USER_NOT_FOUND);
    }

    const categories = await this.categoryRepository.findAll(userId);
    if (!categories) {
      throw new Error(CATEGORY_NOT_FOUND);
    }
    return categories;
  }

  async delete(categoryId, userId) {
    if (!userId) {
      throw new Error(USER_NOT_FOUND);
    }
    if (!categoryId) {
      throw new Error(CATEGORY_NOT_FOUND);
    }

    const deletedCategory = await this.categoryRepository.destroy(categoryId, userId);

    if (!deletedCategory) {
      throw new Error(CATEGORY_NOT_FOUND);
    }
    return deletedCategory;
  }

  async updateCategory(userId, categoryID, categoryData) {
    if (!userId) {
      throw new Error(USER_NOT_FOUND);
    }

    const updatedCategoryData = { ...categoryData };

    if (!categoryID || Object.keys(updatedCategoryData).length === 0) {
      throw new Error(CATEGORY_NOT_FOUND);
    }

    const updatedCategory = await this.categoryRepository.update(
      updatedCategoryData,
      categoryID,
      userId
    );
    return updatedCategory;
  }
}
