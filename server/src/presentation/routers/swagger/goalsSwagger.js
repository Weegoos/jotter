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
 *               - current_amount
 *               - deadline
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Купить ноутбук"
 *               target_amount:
 *                 type: number
 *                 example: 150000
 *               current_amount:
 *                 type: number
 *                 example: 50000
 *               deadline:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-12-31T23:59:59Z"
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
