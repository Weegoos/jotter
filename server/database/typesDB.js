import Types from "../schemas/typeSchemas.js";


const initializeTypes = async () => {
  await Types.sync({ alter: true });
  await Types.bulkCreate(
    [
      { name: "private", description: "general" },
      { name: "public", description: "general" },
      { name: "draft", description: "general" },
      { name: "idea", description: "content" },
      { name: "goal", description: "content" },
      { name: "code", description: "content" },
      { name: "protected", description: "accessLevel" },
    ],
    { ignoreDuplicates: true } 
  );
  console.log("Типы заметок загружены!");
};

export default initializeTypes