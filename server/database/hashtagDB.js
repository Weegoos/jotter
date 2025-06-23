import Hashtags from "../schemas/hashtagSchemas.js";

const initializeHashTag = async () => {
  await Hashtags.sync({ alter: true }),
    await Hashtags.bulkCreate([
      { name: "Здоровье" },
      { name: "Образование" },
      { name: "Работа" },
      { name: "Цели" },
      { name: "Идеи" },
      { name: "Саморазвитие" },
      { name: "Финансы" },
      { name: "Путешествия" },
      { name: "Технологии" },
      { name: "Вдохновение" },
    ]);
  console.log("Хэштеги загружены");
};

export default initializeHashTag;
