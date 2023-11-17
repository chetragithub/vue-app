<template>
  <div class="h-screen text-white w-100 d-flex bg-grey-lighten-1">
    <div class="bg-img"></div>
    <div class="login-form d-flex justify-center align-center">
      <v-form @submit.prevent="onSubmit" class="form w-100 px-8 py-10">
        <div class="d-flex justify-center">
          <v-icon
            icon="mdi-shield-account-outline"
            class="logo text-red-accent-2"
          ></v-icon>
        </div>
        <div class="mt-4">
          <v-text-field
            class="text-black placeholer-capitalize"
            v-model="credentials.email"
            density="compact"
            :placeholder="$t('app.auth.email')"
            type="email"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            :error-messages="`${v$.email.$errors.map(
              (e) => e.$message
            )}${errMessage}`"
            @input="v$.email.$touch"
            @blur="v$.email.$touch"
            @keyup="errMessage = ''"
          ></v-text-field>
        </div>

        <div>
          <div class="text-medium-emphasis d-flex align-center justify-end">
            <span
              class="text-subtitle-1 cursor text-blue font-inter"
              @click="$router.push('/recover_password')"
            >
              {{ $t("app.auth.forgot.forgot") }}</span
            >
          </div>
          <v-text-field
            class="text-black"
            v-model="credentials.password"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            :type="showPassword ? 'text' : 'password'"
            density="compact"
            :placeholder="$t('app.auth.password')"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="showPassword = !showPassword"
            :error-messages="v$.password.$errors.map((e) => e.$message)"
            @input="v$.password.$touch"
            @blur="v$.password.$touch"
          ></v-text-field>
        </div>
        <primary-button
          @click="v$.$touch()"
          class="mt-2 text-uppercase"
          block
          size="large"
          type="medium"
        >
          <v-icon icon="mdi-login-variant" class="mr-2"></v-icon>
          {{ $t("app.auth.login") }}
        </primary-button>
      </v-form>
    </div>
    <!-- <div style="position: fixed; right: 0" class="mr-7 d-flex gap-2">
      <flag iso="gb" style="width: 25px"/>
      <flag iso="kh" style="width: 25px"/>
      <v-switch
        v-model="switchLang"
        hide-details
        inset
        class="text-dark"
        true-icon="mdi-alpha-k-circle"
        false-icon="mdi-alpha-e-circle"
      ></v-switch>
      <flag :iso="switchLang? 'gb' : 'kh'" style="width: 26px;"/>
    </div> -->
  </div>
</template>

<script setup>
import http from "../http-common";
import { useCookieStore } from "@/stores/cookie";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { t } from "../plugins/i18n";
// import { changeLang } from "../mixins/method";
// Variable
const { user } = storeToRefs(useUserStore());
const cookieStore = useCookieStore();
const router = useRouter();
// const switchLang = ref(localStorage.getItem("lng") === "kh" ? true : false);
const showPassword = ref(false);
const errMessage = ref("");
const initialsUser = {
  email: "",
  password: "",
};
const credentials = reactive({
  ...initialsUser,
});
const rules = {
  email: {
    required: helpers.withMessage(t("app.rules.required"), required),
    email: helpers.withMessage(t("app.rules.email"), email),
  },
  password: {
    required: helpers.withMessage(t("app.rules.required"), required),
  },
};
const v$ = useVuelidate(rules, credentials);

const onSubmit = async () => {
  if (v$.value.$errors.length === 0) {
    try {
      const res = await http.post("auth/login", credentials);
      cookieStore.setCookie("user_token", res.data.token, 30);
      cookieStore.setCookie("user_role", res.data.user.role_id.name, 30);
      // const { _id, first_name, last_name, gender, email, image, store_id, role_id} = res.data.user;
      // let userObj = {
      //   user_id: _id,
      //   first_name: res.data.user.first_name,
      //   last_name: res.data.user.last_name,
      //   gender: res.data.user.gender,
      //   email: res.data.user.email,
      //   image: res.data.user.image,
      //   store: res.data.user.store_id,
      //   role: {name: res.data.user.role_id.name, },
      // };
      user.value.data = res.data.user;
      user.value.token = res.data.token;
      // cookieStore.setCookie("user", JSON.stringify(userObj), 30);
      if (res.data.user.role_id.name === "restaurant_owner") {
        router.push("/");
      } else {
        router.push(`/${res.data.user.role_id.name}`);
      }
    } catch (err) {
      if (err.response.data.message) {
        errMessage.value = t("app.rules.loginFail");
      }
    }
  }
};
</script>

<style>
#onesignal-bell-launcher {
  display: none !important;
}

.font-inter {
  font-family: "Inter", "Noto Serif Khmer", sans-serif, serif !important;
}

.login-form {
  width: 40%;
}

.bg-img {
  width: 60%;
  background-image: url("../assets/pic-fast-food.png");
  background-size: cover;
  filter: brightness(55%);
  background-position: center;
}

.logo {
  font-size: 10rem;
}

.cursor {
  cursor: pointer;
}

@media screen and (max-width: 900px) {
  .bg-img {
    display: none;
  }

  .login-form {
    width: 100%;
  }

  .form {
    width: 60% !important;
  }
}

@media screen and (max-width: 430px) {
  .form {
    width: 100% !important;
  }
}
</style>
