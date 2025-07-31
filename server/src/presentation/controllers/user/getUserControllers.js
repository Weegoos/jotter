export class GetUserController {
  constructor(userUseCase) {
    this.userUseCase = userUseCase;
  }

  async getUserInfo(req, res) {
    try {
      const user = await this.userUseCase.getUserInfo(req.user.id);

      res.json(user);
    } catch (error) {
      if (error.message === 'USER NOT FOUND') {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
      console.error('Ошибка при получении данных:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async getAllUsers(req, res) {
    try {
      const currentUserId = req.user?.id;

      const users = await this.userUseCase.getAllUsers(currentUserId);

      res.status(200).json(users);
    } catch (error) {
      if (error.message === 'Current user ID is required') {
        return res.status(401).json({ message: 'Неавторизованный запрос' });
      }

      if (error.message === 'No users found') {
        return res.status(404).json({ message: 'Пользователи не найдены' });
      }
      console.error('Ошибка при получении данных:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async getAllUsersByInput(req, res) {
    try {
      const { fullname } = req.query;
      const currentUserId = req.user?.id;

      const users = await this.userUseCase.findAllUsersByInput(fullname, currentUserId);

      res.status(200).json(users);
    } catch (error) {
      if (
        error.message === 'Fullname is required' ||
        error.message === 'Current user ID is required'
      ) {
        return res.status(400).json({ message: error.message });
      }

      if (error.message === 'No users found with the given input') {
        return res.status(404).json({ message: 'Пользователи не найдены с данным вводом' });
      }
      console.error('Ошибка при получении данных:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}
