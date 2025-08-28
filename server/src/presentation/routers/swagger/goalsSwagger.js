/**
 * @swagger
 * tags:
 *   name: Goals
 *   description: API для управления задачами
 */

// ---------- POST /goals --------------
/**
 * @swagger
 * /goals:
 *   post:
 *     summary: Создать новую цель
 *     description: Создает новую цель для авторизованного пользователя.
 *     tags:
 *       - Goals
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
 *               - target_amount
 *               - deadline
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Купить ноутбук"
 *               target_amount:
 *                 type: number
 *                 example: 150000
 *               deadline:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-12-31T23:59:59Z"
 *               status:
 *                 type: string
 *                 enum: [in_progress, completed]
 *                 description: Статус цели (по умолчанию "in_progress")
 *                 example: "in_progress"
 *     responses:
 *       201:
 *         description: Цель успешно создана
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Цель успешно создана"
 *                 newGoal:
 *                   type: object
 *                   description: Данные созданной цели
 *       400:
 *         description: Все поля обязательны
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Все поля обязательны"
 *       404:
 *         description: Пользователь не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Пользователь не найден"
 *       500:
 *         description: Ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка сервера"
 */

// ------------ GET /goals ------------
/**
 * @swagger
 * /goals:
 *   get:
 *     summary: Получить все цели пользователя
 *     description: Возвращает список всех целей авторизованного пользователя.
 *     tags:
 *       - Goals
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Цели успешно получены
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Цели успешно получены"
 *                 goals:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Купить ноутбук"
 *                       target_amount:
 *                         type: number
 *                         example: 150000
 *                       current_amount:
 *                         type: number
 *                         example: 50000
 *                       deadline:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-12-31T23:59:59Z"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-08-20T09:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-08-20T09:00:00Z"
 *       401:
 *         description: Пользователь не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Пользователь не найден"
 *       404:
 *         description: Цель не найдена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Цель не найдена"
 */

// ------------------ PATCH /goals/{id}
/**
 * @swagger
 * /goals/{id}:
 *   patch:
 *     summary: Частичное обновление цели
 *     description: Обновляет отдельные поля цели пользователя по ID.
 *     tags:
 *       - Goals
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID цели для обновления
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Купить новый ноутбук"
 *               target_amount:
 *                 type: number
 *                 example: 200000
 *               deadline:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-12-31T23:59:59Z"
 *               status:
 *                 type: string
 *                 enum: [in_progress, completed]
 *                 example: "completed"
 *     responses:
 *       200:
 *         description: Цель успешно обновлена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Цель успешно обновлена"
 *                 updatedGoal:
 *                   type: object
 *                   description: Обновленная цель
 *       401:
 *         description: Пользователь не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Пользователь не найден"
 *       404:
 *         description: Цель не найдена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Цель не найдена"
 *       500:
 *         description: Ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка"
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

// ----------- DELETE /goals/{id} -----------
/**
 * @swagger
 * /goals/{id}:
 *   delete:
 *     summary: Удалить цель
 *     description: Удаляет цель пользователя по ID.
 *     tags:
 *       - Goals
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID цели для удаления
 *     responses:
 *       201:
 *         description: Цель успешно удалена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Цель успешно удалена"
 *                 deletedGoal:
 *                   type: object
 *                   description: Удалённая цель
 *       401:
 *         description: Пользователь не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Пользователь не найден"
 *       404:
 *         description: Цель не найдена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Цель не найдена"
 *       500:
 *         description: Ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка"
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
