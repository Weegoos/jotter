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

// -------------------- GET Tasks -----------
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Получить все задачи пользователя
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Все задачи успешно получены
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Все задачи успешно получены
 *                 allTasks:
 *                   type: array
 *       401:
 *         description: Пользователь не найден или не авторизован
 *       500:
 *         description: Внутренняя ошибка сервера
 */

// --------------------- GET Task By Id ----------------------
/**
 * @swagger
 * /tasks/{taskId}:
 *   get:
 *     summary: Получить задачу по ID
 *     description: Возвращает задачу, принадлежащую текущему авторизованному пользователю.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID задачи
 *     responses:
 *       200:
 *         description: Успешное получение задачи
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Заметка получена
 *                 task:
 *                   $ref: '#/components/schemas/Task'
 *       401:
 *         description: Пользователь не найден или задача не найдена
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ошибка сервера
 */
