export class PutUserController {
  constructor(userUseCase) {
    this.userUseCase = userUseCase;
  }

  async editUserInfo(req, res) {
    try {
      const { fullname, email, password } = req.query;
      const user = await this.userUseCase.editUserInformation(
        req.user.id,
        fullname,
        email,
        password
      );
      res.json({ message: 'Данные пользователя успешно обновлены', user });
    } catch (error) {
      if (error.message === 'User ID is required') {
        return res.status(400).json({ message: 'ID пользователя обязателен' });
      }
      if (error.message === 'USER NOT FOUND') {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
      if (error.message === 'This email is already registered!') {
        return res.status(400).json({ message: 'Этот email уже зарегистрирован!' });
      }
      if (error.message === 'Password is too short') {
        return res.status(400).json({ message: 'Пароль слишком короткий' });
      }
      console.error('Ошибка при редактировании данных:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}
