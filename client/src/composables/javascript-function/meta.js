import { useMeta } from "quasar";

export const meta = (title) => {
  const metaData = {
    title: title,
  };

  useMeta(metaData);
};
