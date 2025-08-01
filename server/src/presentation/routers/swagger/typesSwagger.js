/**
 * @swagger
 * tags:
 *   name: Types
 *   description: API для управления типами заметок и файлов
 */

// -------------------- types/getAllTypes -----------------------

/**
 * @swagger
 * /types:
 *   get:
 *     summary: Получить все типы заметок
 *     tags: [Types]
 *     description: Возвращает массив всех доступных типов заметок.
 *     responses:
 *       200:
 *         description: Успешный ответ. Возвращает список типов.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "private"
 *       500:
 *         description: Ошибка сервера.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка сервера."
 */

// -------------------- types/getUsedByUser -----------------------
/**
 * @swagger
 * /types/{fileId}/note-types/used:

 *   get:
 *     summary: Получить все используемые типы заметок для указанного файла
 *     description: Возвращает список всех уникальных типов заметок, относящихся к конкретному файлу.
 *     tags:
 *       - Types
 *     parameters:
 *       - name: fileId
 *         in: path
 *         required: true
 *         description: ID файла, для которого нужно получить типы заметок.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Успешный ответ с массивом уникальных типов заметок.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: "private"
 *       400:
 *         description: Ошибка в запросе (например, отсутствует fileId).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка: fileId отсутствует."
 *       500:
 *         description: Ошибка сервера.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка сервера"
 */

// -------------------- types/description -----------------------

/**
 * @swagger
 * /types/description:
 *   get:
 *     summary: Получить типы по описанию
 *     description: Возвращает список типов, фильтрованных по значению поля `description`.
 *     tags:
 *       - Types
 *     parameters:
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *           enum: [general, content, accessLevel]
 *         required: true
 *         description: Описание типа (description), по которому будет фильтрация.
 *     responses:
 *       200:
 *         description: Успешный ответ. Возвращает массив объектов с типами.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "public"
 *                   description:
 *                     type: string
 *                     example: "general"
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
