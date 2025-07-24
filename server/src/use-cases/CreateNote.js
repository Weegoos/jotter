import { Note } from "../entities/Note.js";

export class CreateNote {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }

    execute (fileName, title, content, type, password, hashtags, fileId) {
        const post = new Note(fileName, title, content, type, password, hashtags, fileId);
        return this.postRepository.create(post);
     }
}


