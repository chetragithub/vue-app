<template>
  <div class="h-screen bg-grey-lighten-1 d-flex justify-center align-center">
    <v-form
      @submit.prevent="send"
      class="form d-flex flex-column align-center rounded-lg w-40 px-8 py-10"
    >
      <div class="d-flex flex-column align-center justify-center text-center">
        <v-icon
          icon="mdi-lock-question"
          class="logo mb-4 text-red-accent-2"
        ></v-icon>
        <h2>{{ $t("app.auth.forgot.title") }}</h2>
        <!-- <span
          >Enter your <span class="text-red-accent-2">email address</span> to
          send link to reset your password.</span
        > -->
        <span>{{ $t("app.auth.forgot.subTitle", { email: $t("app.auth.email") }) }}</span>
      </div>
      <div class="w-100 mt-4">
        <v-text-field
          class="text-black placeholer-capitalize"
          v-model="credential.email"
          density="compact"
          :placeholder="$t('app.auth.email')"
          type="email"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          :error-messages="`${v$.email.$errors.map(
            (e) => e.$message
          )}${errMessage}`"
          @input="
            v$.email.$touch();
            errMessage = '';
          "
          @blur="v$.email.$touch"
        ></v-text-field>
      </div>
      <primary-button
        @click="v$.$touch()"
        :disabled="success"
        class="mt-2 text-uppercase"
        block
        size="large"
        type="medium"
      >
        <v-icon icon="mdi-login-variant" class="mr-2"></v-icon>
        {{ $t("app.auth.forgot.send") }}
      </primary-button>
      <span
        @click="$router.push('/login')"
        class="mt-3 cursor hover-text-red"
        >{{ $t("app.auth.forgot.back") }}</span
      >
    </v-form>
  </div>

  <!-- Alert success -->
  <base-alert v-model="success" @hide-snackbar="success = false">
    <v-icon class="mr-2 text-h4 mdi mdi-check-circle"></v-icon>
    <h6 class="mt-2">{{ $t("app.auth.forgot.success") }}</h6>
  </base-alert>
</template>

<script setup>
import http from "../http-common";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import { ref } from "vue";
import { t } from "../plugins/i18n";

// Variables
const router = useRouter();
const success = ref(false);
const errMessage = ref("");
const initialsUser = {
  email: "",
};
const credential = reactive({
  ...initialsUser,
});
const rules = {
  email: {
    required: helpers.withMessage(t("app.rules.required"), required),
    email: helpers.withMessage(t("app.rules.email"), email),
  },
};
const v$ = useVuelidate(rules, credential);

// Method
const send = async () => {
  if (v$.value.$errors.length === 0) {
    try {
      const res = await http.post("auth/send-pwd", credential);
      if (res.data.success) {
        success.value = true;
        setTimeout(() => {
          router.push("/login");
        }, 6000);
      }
    } catch (err) {
      if (err.response.status === 404) {
        errMessage.value = t('app.rules.email');
      } else {
        errMessage.value = t("app.auth.forgot.success");
      }
    }
  }
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
