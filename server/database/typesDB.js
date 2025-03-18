import Types from "../schemas/typeSchemas.js";


const initializeTypes = async () => {
  await Types.sync();
  await Types.bulkCreate(
    [
      { name: "private" },
      { name: "public" },
      { name: "shared" },
    ],
    { ignoreDuplicates: true } 
  );
  console.log("Типы заметок загружены!");
};

export default initializeTypes