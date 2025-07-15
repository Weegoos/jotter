import Hashtags from '../../schemas/hashtagSchemas.js';

export const getAllHashtags = async (req, res) => {
  try {
    const { id } = req.user;

    if (!id) {
      return res.status(400).json({ message: 'Пользователь не найден' });
    }

    const hastags = await Hashtags.findAll();

    return res.status(200).json({ hastags, message: 'Хэштеги успешно получены' });
  } catch (error) {
    console.error('Ошибка при получении хэштегов:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
