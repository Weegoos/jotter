import express from "express";
import Notes from "../models/notesSchemas.js";
const router = express.Router();

export const createNote = async (req, res) => {
    try {
        const {content} = req.body;
        const newNote = await Notes.create({content});

        res.status(201).json({message: "Заметка создана!", note: newNote})
    } catch (error) {
        console.error('Ошибка при создании заметки:', error);
        res.status(500).json({message: 'Ошибка сервера'})
    }
}

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Notes.findAll()
        res.status(200).json(notes)
    }catch (error) {
        console.log('Ошибка при получении заметок:', error)
        res.status(500).json({message: 'Ошибка сервера'})
    }
}

export default router