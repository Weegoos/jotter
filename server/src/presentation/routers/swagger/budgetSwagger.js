/**
 * @swagger
 * tags:
 *   name: Budget
 *   description: API про пользователей
 */

// ------ POST /budget ---------
/**
 * @swagger
 * /budget:
 *   post:
 *     summary: Создать новый бюджет
 *     description: Создаёт бюджет для конкретного пользователя по категории, месяцу и году.
 *     tags:
 *       - Budget
 *     security:
 *       - bearerAuth: []   # если у тебя JWT авторизация
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - limit_amount
 *               - month
 *               - year
 *               - category_id
 *             properties:
 *               limit_amount:
 *                 type: number
 *                 example: 50000
 *                 description: Лимит бюджета
 *               month:
 *                 type: integer
 *                 example: 8
 *                 description: Месяц (1–12)
 *               year:
 *                 type: integer
 *                 example: 2025
 *                 description: Год
 *               category_id:
 *                 type: integer
 *                 example: 3
 *                 description: ID категории расходов
 *     responses:
 *       201:
 *         description: Бюджет успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Бюджет успешно создан"
 *       400:
 *         description: Все поля обязательны
 *         content:
 *           application/json:
 *             example:
 *               message: "Все поля обязательны"
 *       401:
 *         description: Пользователь не найден
 *         content:
 *           application/json:
 *             example:
 *               message: "Пользователь не найден"
 *       404:
 *         description: Категория не найдена
 *         content:
 *           application/json:
 *             example:
 *               message: "Категория не найдена"
 */
