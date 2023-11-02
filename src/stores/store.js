import { defineStore } from "pinia";
import http from "../http-common";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
const { user } = storeToRefs(useUserStore());

const initialsStore = {
  name: "",
  city: "",
  street: "",
};
export const useStoreStore = defineStore("store", {
  state: () => {
    return {
      storeInForm: { ...initialsStore },
      updateSuccess: false,
    };
  },
  actions: {
    clearForm() {
      this.storeInForm = { ...initialsStore };
    },
    async updateStore(store) {
      try {
        const { name, city, street } = store;
        const res = await http.put(`stores/${store.store_id}`, {
          name,
          city,
          street,
        });
        if (res.data.success) {
          user.value.data.store_id.name = name;
          user.value.data.store_id.city = city;
          user.value.data.store_id.street = street;
          this.updateSuccess = true;
        }
      } catch (err) {
        return err;
      }
    },
  },
});
