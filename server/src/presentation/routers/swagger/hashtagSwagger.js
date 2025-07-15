/**
 * @swagger
 * tags:
 *   name: Hashtag
 *   description: API для управления хэштегами
 */

/**
 * @swagger
 * /hashtag/all:
 *   get:
 *     summary: Получить все хэштеги
 *     description: Возвращает список всех доступных хэштегов. Требуется авторизация.
 *     tags:
 *       - Hashtag
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Хэштеги успешно получены
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hastags:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Саморазвитие"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                 message:
 *                   type: string
 *                   example: "Хэштеги успешно получены"
 *       400:
 *         description: Пользователь не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Пользователь не найден"
 *       500:
 *         description: Ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка сервера"
 */
