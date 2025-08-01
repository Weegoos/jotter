import { IHashtagRepository } from "../../domain/repositories/IHashtagRepository.js";

export class HashtagRepository  extends IHashtagRepository{
    constructor(hashtagModel) {
        super();
        this.hashtagModel = hashtagModel;
    }

    async findAll() {
        return await this.hashtagModel.findAll();
    }
}