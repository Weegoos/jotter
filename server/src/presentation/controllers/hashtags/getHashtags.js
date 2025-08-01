export class GetHashtagConroller {
  constructor(hashtagUseCase) {
    this.hashtagUseCase = hashtagUseCase;
  }

  async getAllHashtags (req, res) {
  try {
    const hashtags = await this.hashtagUseCase.getAllHashtags();

    return res.status(200).json({ hashtags, message: 'Хэштеги успешно получены' });
  } catch (error) {
    if (error.message === 'No hashtags found') {
      return res.status(404).json({ message: 'Хэштеги не найдены' });
    }
    console.error('Ошибка при получении хэштегов:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
}