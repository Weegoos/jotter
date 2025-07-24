export class Note {
    constructor(fileName, title, content, type, password, hashtags, fileId) {
        this.title = title;
        this.content = content;
        this.fileName = fileName;
        this.type = type;
        this.password = password;
        this.hashtags = hashtags;
        this.fileId = fileId
    }
}