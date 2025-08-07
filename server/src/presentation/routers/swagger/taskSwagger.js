/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API для управления задачами
 */

// -------------------- POST tasks -----------------------
/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Создать новую задачу
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - status
 *               - priority
 *               - target_date
 *               - time_period
 *             properties:
 *               title:
 *                 type: string
 *                 example: Завершить отчёт
 *               description:
 *                 type: string
 *                 example: Нужно завершить годовой финансовый отчёт до пятницы
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, done]
 *                 example: pending
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 example: high
 *               target_date:
 *                 type: string
 *                 format: date
 *                 example: 2025-08-10
 *               time_period:
 *                 type: string
 *                 enum: [daily, weekly, monthly, yearly]
 *                 example: weekly
 *     responses:
 *       201:
 *         description: Задача успешно создана
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Задача успешно создана
 *       400:
 *         description: Все поля обязательны
 *       401:
 *         description: Пользователь не найден
 *       500:
 *         description: Ошибка сервера
 */
