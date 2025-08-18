/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API про категории
 */

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
