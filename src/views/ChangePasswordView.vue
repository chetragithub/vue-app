<template>
  <div class="h-screen bg-grey-lighten-1 d-flex flex-column align-center">
    <div class="w-100 bg-grey-lighten-1">
      <v-icon
        @click="comeback"
        class="text-h4 text-black ml-5 mt-3"
        icon="mdi-keyboard-backspace"
      ></v-icon>
    </div>
    <v-form
      @submit.prevent="change"
      class="form d-flex flex-column align-center rounded-lg m-auto w-40 px-8 py-10"
    >
      <div class="d-flex text-center flex-column align-center justify-center">
        <v-icon
          icon="mdi-shield-lock"
          class="logo mb-2 text-red-accent-2"
        ></v-icon>
        <h2>Change new password</h2>
      </div>
      <div class="w-100">
        <v-text-field
          class="text-black"
          v-model="passwords.currentPassword"
          :append-inner-icon="showCurrentPassword ? 'mdi-eye-off' : 'mdi-eye'"
          :type="showCurrentPassword ? 'text' : 'password'"
          density="compact"
          placeholder="Current password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="showCurrentPassword = !showCurrentPassword"
          :error-messages="v$.currentPassword.$errors.map((e) => e.$message)"
          @input="v$.currentPassword.$touch"
          @blur="v$.currentPassword.$touch"
        ></v-text-field>
        <v-text-field
          class="text-black mt-2"
          v-model="passwords.newPassword"
          :append-inner-icon="showNewPassword ? 'mdi-eye-off' : 'mdi-eye'"
          :type="showNewPassword ? 'text' : 'password'"
          density="compact"
          placeholder="New password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="showNewPassword = !showNewPassword"
          :error-messages="v$.newPassword.$errors.map((e) => e.$message)"
          @input="v$.newPassword.$touch"
          @blur="v$.newPassword.$touch"
        ></v-text-field>
        <v-text-field
          class="text-black mt-2"
          v-model="passwords.confirmPassword"
          :append-inner-icon="showConfirm ? 'mdi-eye-off' : 'mdi-eye'"
          :type="showConfirm ? 'text' : 'password'"
          density="compact"
          placeholder="Confirm password"
          prepend-inner-icon="mdi-lock-check-outline"
          variant="outlined"
          @click:append-inner="showConfirm = !showConfirm"
          :rules="[passwordConfirmationRule]"
          :error-messages="v$.confirmPassword.$errors.map((e) => e.$message)"
          @input="v$.confirmPassword.$touch"
          @blur="v$.confirmPassword.$touch"
        ></v-text-field>
      </div>
      <primary-button
        @click="v$.$touch()"
        :disabled="success"
        class="mt-2"
        block
        size="large"
        type="medium"
      >
        <v-icon icon="mdi-lock-reset" class="mr-2"></v-icon>
        CHANGE
      </primary-button>
    </v-form>
  </div>

  <!-- Alert success -->
  <base-alert v-model="success" @hide-snackbar="success = false">
    <v-icon class="mr-2 text-h4 mdi mdi-check-circle"></v-icon>
    <h5 class="mt-2">Changed password successfully.</h5>
  </base-alert>

  <base-alert v-model="incorrectPwd" @hide-snackbar="incorrectPwd = false">
    <v-icon class="mr-2 text-h4 mdi mdi-close-circle"></v-icon>
    <h5 class="mt-2">Current password is incorrect.</h5>
  </base-alert>
</template>

<script setup>
import http from "../http-common";
import { reactive, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import router from "@/router";

// Variables
const { userData } = storeToRefs(useUserStore());
const success = ref(false);
const incorrectPwd = ref(false);
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirm = ref(false);
const initialsPassword = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};
const passwords = reactive({
  ...initialsPassword,
});
const rules = {
  currentPassword: { required },
  newPassword: { required, minLength: minLength(8) },
  confirmPassword: { required },
};
const v$ = useVuelidate(rules, passwords);
// Validation confirm password
const passwordConfirmationRule = () => {
  if (passwords.newPassword !== passwords.confirmPassword) {
    return "Confirm password must be match.";
  } else {
    return true;
  }
};

// Method
const change = async () => {
  if (v$.value.$errors.length === 0 && passwordConfirmationRule() === true) {
    let changePassword = {
      old_pwd: passwords.currentPassword,
      new_pwd: passwords.newPassword,
    };
    try {
      const res = await http.post("auth/change-pwd", changePassword);
      if (res.data.success) {
        success.value = true;
        setTimeout(() => {
          router.push(
            router.options.routes.find(
              (r) =>
                r.meta &&
                r.meta.role === userData.value.role.name &&
                r.meta.defaultPage
            ).path
          );
        }, 4000);
      }
    } catch (err) {
      if (err.response.status === 400) {
        incorrectPwd.value = true;
      }
    }
  }
};
const comeback = () => {
  router.go(-1);
};
</script>

<style scoped>
.w-40 {
  width: 40%;
}

.logo {
  font-size: 10rem;
}

.cursor {
  cursor: pointer;
}

@media screen and (max-width: 900px) {
  .form {
    width: 60%;
  }
}

@media screen and (max-width: 430px) {
  .form {
    width: 100%;
  }
}
</style>
