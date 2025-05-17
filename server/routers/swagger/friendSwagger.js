/**
 * @swagger
 * tags:
 *   name: Friends
 *   description: API для управления файлами
 */

// -------------------- /friend/add -----------------------
/**
 * @swagger
 * /friend/add:
 *   post:
 *     summary: Отправить запрос на добавление в друзья по fullname
 *     tags: [Friends]
 *     description: Отправляет заявку на добавление пользователя в друзья, используя fullname. Заявка будет в статусе "pending" и должна быть подтверждена пользователем. Требуется авторизация.
 *     parameters:
 *       - name: fullname
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Полное имя пользователя, которому отправляется заявка в друзья
 *     responses:
 *       201:
 *         description: Запрос на добавление в друзья успешно отправлен.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Запрос отправлен пользователю"
 *                 friend:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     userId:
 *                       type: integer
 *                     friendId:
 *                       type: integer
 *                     fullname:
 *                       type: string
 *                     status:
 *                       type: string
 *                       example: "pending"
 *       400:
 *         description: Некорректный запрос (например, fullname отсутствует или попытка добавить себя).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Нельзя добавить себя в друзья"
 *       401:
 *         description: Неавторизованный пользователь.
 *       404:
 *         description: Пользователь с таким fullname не найден.
 *       409:
 *         description: Пользователь уже в друзьях или заявка уже отправлена.
 *       500:
 *         description: Внутренняя ошибка сервера.
 */

// -------------------- /friend/getAll ----------------------------

/**
 * @swagger
 * /friend/getAll:
 *   get:
 *     summary: Получить всех друзей текущего пользователя
 *     tags:
 *       - Friends
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список друзей пользователя
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 friends:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 3
 *                       userId:
 *                         type: integer
 *                         example: 1
 *                       friendId:
 *                         type: integer
 *                         example: 2
 *                       status:
 *                         type: string
 *                         example: "pending"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-05-17T19:19:08.997Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-05-17T19:19:08.997Z"
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


// -------------------- /friend/getByStatus -----------------------

/**
 * @swagger
 * /friend/getByStatus:
 *   get:
 *     summary: Получить друзей текущего пользователя по статусу
 *     tags:
 *       - Friends
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, accepted, rejected]
 *         required: true
 *         description: Статус друзей, например 'pending', 'accepted', 'rejected'
 *     responses:
 *       200:
 *         description: Список друзей с указанным статусом
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 friends:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       userId:
 *                         type: integer
 *                         example: 10
 *                       friendId:
 *                         type: integer
 *                         example: 20
 *                       fullname:
 *                         type: string
 *                         example: "Иван Иванов"
 *                       status:
 *                         type: string
 *                         example: "pending"
 *       400:
 *         description: Ошибка - не указан статус
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Параметр status обязателен"
 *       401:
 *         description: Ошибка - неавторизованный пользователь
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Неавторизованный пользователь"
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

// -------------------- /friend/changeStatus -----------------------

/**
 * @swagger
 * /friend/changeStatus:
 *   put:
 *     summary: Изменить статус дружбы по friendId
 *     tags:
 *       - Friends
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: friendId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Идентификатор друга
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, accepted, rejected]
 *         required: true
 *         description: Новый статус дружбы
 *     responses:
 *       200:
 *         description: Статус успешно обновлён
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Статус обновлён"
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
 *                     status:
 *                       type: string
 *                       example: "accepted"
 *       400:
 *         description: Ошибка - отсутствует статус
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Параметр status обязателен"
 *       401:
 *         description: Ошибка - отсутствует friendId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Друг не найден"
 *       404:
 *         description: Запись друга не найдена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Дружба не найдена"
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

// -------------------- deleteById -----------------------
/**
 * @swagger
 * /friend/deleteById:
 *   delete:
 *     summary: Удалить друга по friendId
 *     tags:
 *       - Friends
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: friendId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Идентификатор друга для удаления
 *     responses:
 *       200:
 *         description: Друг успешно удалён
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Друг успешно удален."
 *       400:
 *         description: Параметр friendId не указан
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Параметр friendId обязателен"
 *       404:
 *         description: Друг не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Друг не найден."
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

