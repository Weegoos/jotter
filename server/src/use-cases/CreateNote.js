import { Note } from "../entities/Note.js";

export class CreateNote {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }

    execute (title, content, fileName, type, password, hashtags) {
        const post = new Note(fileName, title, content, type, password, hashtags);
        return this.postRepository.create(post);
     }
}


