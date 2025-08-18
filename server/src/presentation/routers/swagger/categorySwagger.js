/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API про категории
 */

// ---------------------- POST /categories -------------------
/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Создать новую категорию
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - icon
 *             properties:
 *               name:
 *                 type: string
 *                 example: Продукты
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *                 example: expense
 *               icon:
 *                 type: string
 *                 example: shopping-cart
 *     responses:
 *       201:
 *         description: Категория успешно создана
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Категория успешно создана
 *                 newCategory:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Продукты
 *                     type:
 *                       type: string
 *                       example: expense
 *                     icon:
 *                       type: string
 *                       example: shopping-cart
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Все поля обязательны
 *       401:
 *         description: Пользователь не найден
 *       500:
 *         description: Ошибка сервера
 */

// ------------------ GET /categories ---------------------
/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Получить все категории пользователя
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Категории успешно получены
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Категории успешно получены
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Продукты
 *                       type:
 *                         type: string
 *                         enum: [income, expense]
 *                         example: expense
 *                       icon:
 *                         type: string
 *                         example: shopping-cart
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-08-18T12:00:00.000Z
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-08-18T12:00:00.000Z
 *       401:
 *         description: Пользователь не найден или категория не найдена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Пользователь не найден
 *       500:
 *         description: Ошибка сервера
 */
