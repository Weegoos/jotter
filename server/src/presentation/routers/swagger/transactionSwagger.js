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
