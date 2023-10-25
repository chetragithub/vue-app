import { defineStore } from "pinia";

export const useLoadingStore = defineStore("loading", {
  state: () => {
    return {
      isLoading: false,
    };
  },
  // actions: {
  //   async getRoles() {
  //     try {
  //       const res = await http.get('roles');
  //       if (res.data.success) {
  //         this.roles = res.data.data;
  //       }
  //     } catch (err) {
  //       return err;
  //     }
  //   }
  // },
  
});