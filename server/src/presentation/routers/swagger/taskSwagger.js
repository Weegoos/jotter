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

// --------------------- GET /tasks/calendar-view -------------------
// --------------------- GET /tasks/calendar-view -------------------
/**
 * @swagger
 * /tasks/calendar-view:
 *   get:
 *     summary: Получить задачи пользователя за день, неделю, месяц, год или всё время
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: target_date
 *         schema:
 *           type: string
 *           format: date
 *           example: 2025-08-21
 *         description: Дата, за которую нужно получить задачи (приоритетнее года/месяца/недели)
 *       - in: query
 *         name: week_start
 *         schema:
 *           type: string
 *           format: date
 *           example: 2025-08-04
 *         description: Дата начала недели. Если указана, вернёт задачи за неделю.
 *       - in: query
 *         name: week_end
 *         schema:
 *           type: string
 *           format: date
 *           example: 2025-08-10
 *         description: Дата конца недели. Если не указана, берётся +6 дней от week_start.
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *           example: 2025
 *         description: Год, за который нужно получить задачи. Работает совместно с month или отдельно.
 *       - in: query
 *         name: month
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *           example: 8
 *         description: Месяц (1-12). Работает только вместе с year.
 *     responses:
 *       200:
 *         description: Список задач за указанный период
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Задачи успешно получены
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Пользователь не найден
 *       404:
 *         description: Задачи не найдены
 *       500:
 *         description: Ошибка сервера
 */

// --------------------- GET /tasks/summary ----------------------
/**
 * @swagger
 * /tasks/summary:
 *   get:
 *     summary: Получить задачи за указанный период
 *     description: Возвращает список задач пользователя в пределах заданного диапазона дат.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from_date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Начальная дата периода (включительно)
 *         example: 2025-08-01
 *       - in: query
 *         name: to_date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Конечная дата периода (включительно)
 *         example: 2025-08-31
 *     responses:
 *       200:
 *         description: Список задач за указанный период
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Задачи успешно получены
 *                 tasks:
 *                   type: array
 *       401:
 *         description: Пользователь не найден или задачи не найдены
 *       500:
 *         description: Ошибка сервера
 */

// -------------------- PATCH /tasks/{taskId} ---------------------
/**
 * @swagger
 * /tasks/{taskId}:
 *   patch:
 *     summary: Частично обновить задачу
 *     description: Обновляет все поля задачи по её идентификатору
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID задачи
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
 *             properties:
 *               title:
 *                 type: string
 *                 example: Обновлённая задача
 *               description:
 *                 type: string
 *                 example: Полное обновление описания задачи
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, done]
 *                 example: in_progress
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 example: high
 *               target_date:
 *                 type: string
 *                 format: date
 *                 example: 2025-08-31
 *               time_period:
 *                 type: string
 *                 enum: [daily, weekly, monthly, yearly]
 *                 example: weekly
 *     responses:
 *       200:
 *         description: Задача успешно обновлена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Задача успешно обновлена
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
 *         description: Внутренняя ошибка сервера
 */

// -------------------- PATCH /tasks/{taskId}/status -----------------------
/**
 * @swagger
 * /tasks/{taskId}/status:
 *   patch:
 *     summary: Обновить статус задачи
 *     description: Частично обновляет задачу, изменяя только её статус. Требуется авторизация.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID задачи, статус которой нужно обновить
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: "in_progress"
 *     responses:
 *       200:
 *         description: Статус задачи успешно обновлён
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Статус задачи успешно обновлён"
 *       400:
 *         description: Статус не найден в теле запроса
 *       401:
 *         description: Пользователь не найден или не авторизован
 *       404:
 *         description: Задача не найдена или доступ запрещён
 *       500:
 *         description: Ошибка сервера
 */

// -------------------- PATCH /tasks/{taskId}/priority -----------------------
/**
 * @swagger
 * /tasks/{taskId}/priority:
 *   patch:
 *     summary: Обновить приоритет задачи
 *     description: Частично обновляет задачу, изменяя только её приоритет. Требуется авторизация.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID задачи, приоритет которой нужно обновить
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - priority
 *             properties:
 *               priority:
 *                 type: string
 *                 enum:
 *                   - low
 *                   - medium
 *                   - high
 *                 example: "high"
 *     responses:
 *       200:
 *         description: Приоритет задачи успешно обновлён
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Приоритет задачи успешно обновлён"
 *       400:
 *         description: Приоритет не найден в теле запроса
 *       401:
 *         description: Пользователь не найден или не авторизован
 *       404:
 *         description: Задача не найдена или доступ запрещён
 *       500:
 *         description: Ошибка сервера
 */

// --------------- PUT tasks/${taskId} ----------------------

/**
 * @swagger
 * /tasks/{taskId}:
 *   put:
 *     summary: Полностью обновить задачу
 *     description: Обновляет все поля существующей задачи по её ID. Требуется авторизация.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID задачи, которую нужно обновить
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
 *                 example: "Новая задача"
 *               description:
 *                 type: string
 *                 example: "Подробное описание задачи"
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, done]
 *                 example: "in_progress"
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 example: "high"
 *               target_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-08-15"
 *               time_period:
 *                 type: string
 *                 enum: [daily, weekly, monthly, yearly]
 *                 example: "daily"
 *     responses:
 *       201:
 *         description: Задача успешно обновлена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Заметка успешно обновлена"
 *       401:
 *         description: Пользователь не найден или задача не найдена
 *       500:
 *         description: Ошибка сервера
 */

// ----------------- DELETE /tasks/{taskId} --------------------
/**
 * @swagger
 * /tasks/{taskId}:
 *   delete:
 *     summary: Удалить задачу по ID
 *     description: Удаляет задачу по её ID для авторизованного пользователя. Требуется авторизация.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID задачи, которую нужно удалить
 *     responses:
 *       201:
 *         description: Задача успешно удалена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Заметка успешно удалена"
 *       401:
 *         description: Пользователь не найден или задача не найдена/нет доступа
 *       500:
 *         description: Ошибка сервера
 */
