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

