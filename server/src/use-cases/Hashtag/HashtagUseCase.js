export class HashtagUseCase {
    constructor(hashtagRepository) {
        this.hashtagRepository = hashtagRepository;
    }

    async getAllHashtags() {
        const hashtags = await this.hashtagRepository.findAll();
        if (!hashtags || hashtags.length === 0) {
            throw new Error('No hashtags found');
        }
        return hashtags;
    }
}