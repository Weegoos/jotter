/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: API про категории
 */

// -------------------- POST /transactions ----------------
/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Создание новой транзакции
 *     description: Создаёт финансовую транзакцию (доход или расход) для авторизованного пользователя.
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []   # JWT токен
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - type
 *               - description
 *               - date
 *               - source
 *               - category_id
 *             properties:
 *               amount:
 *                 type: number
 *                 format: float
 *                 example: 1500.50
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *                 example: income
 *               description:
 *                 type: string
 *                 example: "Зарплата"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-08-19"
 *               source:
 *                 type: string
 *                 example: "Компания ABC"
 *               category_id:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Операция успешно создана
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Операция успешно создана
 *       400:
 *         description: Ошибка валидации (не все поля заполнены)
 *       401:
 *         description: Пользователь не найден или категория не существует
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   examples:
 *                     userNotFound:
 *                       value: "Пользователь не найден"
 *                     categoryNotFound:
 *                       value: "Категория не найдена"
 *       500:
 *         description: Ошибка сервера
 */

// ------------------ GET /transaction ---------------------
/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Получить все транзакции пользователя
 *     description: Возвращает список всех транзакций, принадлежащих текущему авторизованному пользователю.
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []   # Авторизация через JWT (если у тебя стоит)
 *     responses:
 *       200:
 *         description: Список транзакций успешно получен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Операции успешно получены
 *                 transactions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "123"
 *                       amount:
 *                         type: number
 *                         example: 5000
 *                       type:
 *                         type: string
 *                         example: "income"
 *                       description:
 *                         type: string
 *                         example: "Зарплата"
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: "2025-08-19"
 *                       source:
 *                         type: string
 *                         example: "Банк"
 *                       category_id:
 *                         type: string
 *                         example: "12"
 *       401:
 *         description: Ошибка авторизации или данные не найдены
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Пользователь не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */

// ------------------- GET /transaction/{id} -------
/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     summary: Получить транзакцию по ID
 *     description: Возвращает данные транзакции по её уникальному идентификатору для текущего пользователя.
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []   # если используешь JWT авторизацию
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Уникальный идентификатор транзакции
 *     responses:
 *       200:
 *         description: Транзакция успешно получена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Операции успешно получены
 *                 transactions:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "123"
 *                     amount:
 *                       type: number
 *                       example: 2500
 *                     type:
 *                       type: string
 *                       example: "expense"
 *                     description:
 *                       type: string
 *                       example: "Покупка продуктов"
 *                     date:
 *                       type: string
 *                       format: date
 *                       example: "2025-08-19"
 *                     source:
 *                       type: string
 *                       example: "Наличные"
 *                     category_id:
 *                       type: string
 *                       example: "5"
 *       401:
 *         description: Ошибка авторизации или данные не найдены
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Пользователь не найден
 *       404:
 *         description: Транзакция не найдена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Операция не найдена
 *       500:
 *         description: Внутренняя ошибка сервера
 */

// ---------------- DELETE /transactions/{id} ----------
/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     summary: Удаление транзакции
 *     description: Удаляет транзакцию по ID для текущего пользователя.
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID транзакции для удаления
 *     responses:
 *       201:
 *         description: Транзакция успешно удалена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Категории успешно удалена
 *                 deletedTransaction:
 *                   type: object
 *                   description: Объект удалённой транзакции
 *       401:
 *         description: Пользователь не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Пользователь не найден
 *       404:
 *         description: Транзакция не найдена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Операция не найдена
 */
