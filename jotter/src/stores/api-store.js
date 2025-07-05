import { defineStore } from "pinia";
import { Cookies } from "quasar";
import axios from "axios";
import { getMethod } from "src/composables/api-method/get";

export const useApiStore = defineStore("api", {
  state: () => ({
    userData: null,
    fileNames: [],
    noteTypes: [],
    hashtags: [],
  }),
  actions: {
    async getUserInfo(serverURL, $q) {
      try {
        const response = await axios.get(`http://localhost:3000/user/me`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        });
        this.userData = response.data;
      } catch (error) {
        // console.error(error);
      }
    },
    async getFileName(serverURL, $q) {
      try {
        this.fileNames = await getMethod(
          serverURL,
          "file/filesName",
          $q,
          "Файлы успешно получены"
        );
      } catch (error) {
        console.error(error);
      }
    },
    async getNoteTypes(serverURL, $q) {
      try {
        this.noteTypes = await getMethod(
          serverURL,
          "types",
          $q,
          "Типы заметок успешно получены"
        );
      } catch (error) {
        console.error(error);
      }
    },
    async getHashtags(serverURL, $q) {
      try {
        this.hashtags = await getMethod(
          serverURL,
          "hashtag/all",
          $q,
          "Хэштеги успешно получены"
        );
      } catch (error) {
        console.error(error);
      }
    },
  },
});
