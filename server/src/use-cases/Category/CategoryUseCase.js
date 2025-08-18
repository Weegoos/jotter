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
}
