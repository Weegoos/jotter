/**
 * @swagger
 * tags:
 *   name: Friends
 *   description: API для управления файлами
 */

// -------------------- /friends/add -----------------------
/**
 * @swagger
 * /friend/add:
 *   post:
 *     summary: Добавить пользователя в друзья по fullname
 *     tags:
 *       - Friends
 *     description: Добавляет пользователя в список друзей, используя fullname. Требуется авторизация.
 *     parameters:
 *       - name: fullname
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Полное имя пользователя, которого нужно добавить в друзья
 *     responses:
 *       201:
 *         description: Друг успешно добавлен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Друг добавлен"
 *                 friend:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     userId:
 *                       type: integer
 *                       example: 10
 *                     friendId:
 *                       type: integer
 *                       example: 20
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-05-17T12:34:56Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-05-17T12:34:56Z"
 *       400:
 *         description: Некорректный запрос (например, fullname отсутствует или попытка добавить себя)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Нельзя добавить себя в друзья"
 *       401:
 *         description: Неавторизованный пользователь
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Неавторизованный пользователь"
 *       404:
 *         description: Пользователь не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Пользователь с таким именем не найден"
 *       409:
 *         description: Пользователь уже в друзьях
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Пользователь уже в друзьях"
 *       500:
 *         description: Внутренняя ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка сервера"
 */
