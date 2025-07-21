export class PostRepository {
    constructor(database) {
        this.database = database;
    }

    async create(note) {
        try {
            const createdNote = await this.database.create(note);
            return createdNote;
        } catch (error) {
            throw new Error('Error creating note: ' + error.message);
        }
    }

    // Other repository methods can be added here
}