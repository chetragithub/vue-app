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
        const res = await http.put(`auth/user/${staff.user_id}`, staff);
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
        const { first_name, last_name, gender, image, email } = userUpdate;
        const res = await http.put(
          `auth/user/${userUpdate.user_id}`,
          userUpdate
        );
        if (res.data.success) {
          this.updateSuccess = true;
          this.errMessage = "";
          this.user.data.first_name = first_name;
          this.user.data.last_name = last_name;
          this.user.data.gender = gender;
          this.user.data.image = image;
          this.user.data.email = email;
        }
      } catch (err) {
        if (err.response.status === 409) {
          this.errMessage = "The email has already been taken.";
        }
        console.log(this.errMessage);
      }
    },

    // Delete staff
    async deleteStaff(id) {
      try {
        const res = await http.delete(`auth/staff/${id}`);
        if (res.data.success) {
          this.staff = this.staff.filter((r) => r._id !== id);
          this.deleteSuccess = true;
        }
      } catch (err) {
        return err;
      }
    },
  },
  getters: {
    userData() {
      if (this.user.data) {
        const {
          _id,
          first_name,
          last_name,
          email,
          image,
          gender,
          store_id,
          role_id,
        } = this.user.data;
        return {
          user_id: _id,
          first_name: first_name,
          last_name: last_name,
          email: email,
          image: image,
          gender,
          store: {
            _id: store_id ? store_id._id : "",
            name: store_id ? store_id.name : "",
            city: store_id ? store_id.city : "",
            street: store_id ? store_id.street : "",
          },
          role: {
            _id: role_id ? role_id._id : "",
            name: role_id ? role_id.name : "",
          },
        };
      }
      return {
        user_id: null,
        first_name: "",
        last_name: "",
        email: "",
        image: "",
        gender: "",
        store: { id: null, name: "" },
        role: { id: null, name: "", city: "", street: "" },
      };
    },
  },
});
