export class CategoryController {
  constructor(categoryUseCase) {
    this.categoryUseCase = categoryUseCase;
  }

  async createCategory(req, res) {
    try {
      const userId = req.user.id;
      const { name, type, icon } = req.body;

      const newCategory = await this.categoryUseCase.execute(userId, name, type, icon);

      return res.status(201).json({ message: 'Категория успешно создана', newCategory });
    } catch (error) {
      console.error('Ошибка при создании задач:', error);
      if (error.message === 'USER_NOT_FOUND') {
        return res.status(401).json({ message: 'Пользователь не найден' });
      }
      if (error.message === 'All fields are required') {
        return res.status(400).json({ message: 'Все поля обязательны' });
      }
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async findAllCategories(req, res) {
    try {
      const userId = req.user.id;
      console.log(userId);

      const categories = await this.categoryUseCase.getCategories(userId);

      return res.status(201).json({ message: 'Категории успешно получены', categories });
    } catch (error) {
      console.error('Ошибка при создании задач:', error);
      if (error.message === 'USER_NOT_FOUND') {
        return res.status(401).json({ message: 'Пользователь не найден' });
      }

      if (error.message === 'CATEGORY_NOT_FOUND') {
        return res.status(401).json({ message: 'Категория не найдена' });
      }
    }
  }

  async deleteCategory(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      const deletedCategory = await this.categoryUseCase.delete(id, userId);
      return res.status(201).json({ message: 'Категории успешно удалена', deletedCategory });
    } catch (error) {
      console.error('Ошибка при создании задач:', error);
      if (error.message === 'USER_NOT_FOUND') {
        return res.status(401).json({ message: 'Пользователь не найден' });
      }

      if (error.message === 'CATEGORY_NOT_FOUND') {
        return res.status(401).json({ message: 'Категория не найдена' });
      }
    }
  }
}
