import { Note } from '../../entities/Note.js';

export class CreateNote {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  execute(fileName, title, content, type, password, hashtags, fileId) {
    const post = new Note(fileName, title, content, type, password, hashtags, fileId);
    return this.postRepository.create(post);
  }
}

export class GetNote {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async getAllByFileId(fileId, pinned) {
    const filter = { fileId, pinned };
    return await this.postRepository.getAllByFilter(filter);
  }
}
