import { defineStore } from "pinia";
import http from "../http-common";
// import { useCookieStore } from "@/stores/cookie";
const initialsUserProfile = {
  user_id: null,
  first_name: "",
  last_name: "",
  gender: null,
  email: null,
  image: null,
};
const initialsStaff = {
  first_name: "",
  last_name: "",
  gender: null,
  email: null,
  password: null,
  role_id: null,
};
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      staffInForm: { ...initialsStaff },
      userProfileInForm: { ...initialsUserProfile },
      createSuccess: false,
      updateSuccess: false,
      errMessage: "",
      user: { token: null, data: null },
      staff: [],
      deleteSuccess: false,
    };
  },
  actions: {
    clearForm() {
      this.staffInForm = { ...initialsStaff };
    },
    clearProfileForm() {
      this.userProfileInForm = { ...initialsUserProfile };
    },
    async getUser() {
      // const { getCookie } = useCookieStore();
      try {
        // if (getCookie("user_token")) {
        const res = await http.get("auth/user");
        if (res.data.success) {
          this.user.data = res.data.data;
        }
        // }
      } catch (err) {
        this.user.data = null;
      }
    },

    // List staff
    async getStaff() {
      try {
        const res = await http.get("auth/staff");
        if (res.data.success) {
          this.staff = res.data.data;
        }
      } catch (err) {
        return err;
      }
    },

    // Create staff
    async addStaff(staff) {
      try {
        const res = await http.post("auth/register", staff);
        if (res.data.success) {
          this.createSuccess = true;
          this.errMessage = "";
          this.getStaff();
        }
      } catch (err) {
        if (err.response.status === 409) {
          this.errMessage = "The email has already been taken.";
        }
      }
    },
    // Update staff
    async updateStaff(staff) {
      try {
        const res = await http.put(`auth/staff/${staff.user_id}`, staff);
        if (res.data.success) {
          this.updateSuccess = true;
          this.errMessage = "";
          this.getStaff();
        }
      } catch (err) {
        if (err.response.status === 409) {
          this.errMessage = "The email has already been taken.";
        }
      }
    },
    // Update profile
    async updateProfile(userUpdate) {
      // const { setCookie } = useCookieStore();
      try {
        const res = await http.put(
          `update_profile/${userUpdate.user_id}`,
          userUpdate
        );
        if (res.data.success) {
          // let user = {
          //   user_id: res.data.data.user_id,
          //   first_name: res.data.data.first_name,
          //   last_name: res.data.data.last_name,
          //   gender: res.data.data.gender,
          //   email: res.data.data.email,
          //   image: res.data.data.image,
          //   store: res.data.data.store,
          // };
          // setCookie("user", JSON.stringify(user), 30);
          this.updateSuccess = true;
          this.errMessage = "";
        }
      } catch (err) {
        if (err.response.data.message.email) {
          this.errMessage = "The email has already been taken.";
        }
      }
    },

    // Delete staff
    async deleteStaff(id) {
      try {
        const res = await http.delete(`auth/staff/${id}`);
        if (res.data.success) {
          this.deleteSuccess = true;
          this.getStaff();
        }
      } catch (err) {
        return err;
      }
    },
  },
  getters: {
    userData() {
      if (this.user.data) {
        const { first_name, last_name, email, image, store_id, role_id } =
          this.user.data;
        return {
          first_name: first_name,
          last_name: last_name,
          email: email,
          image: image,
          store: {
            _id: store_id ? store_id._id : "",
            name: store_id ? store_id.name : "",
          },
          role: {
            _id: role_id ? role_id._id : "",
            name: role_id ? role_id.name : "",
          },
        };
      }
      return {
        first_name: "",
        last_name: "",
        email: "",
        image: "",
        store: { id: null, name: "" },
        role: { id: null, name: "" },
      };
    },
  },
});
