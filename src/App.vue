<template>
  <router-view></router-view>
  <app-delay />
  <!-- create alet -->
  <base-alert v-model="isNotification" @hide-snackbar="isNotification = false">
    <v-icon class="mr-2 text-h4 mdi mdi-check-circle"></v-icon>
    <h5 class="mt-2">{{ msg }}</h5>
  </base-alert>
  <Notif ref="notif" />
</template>

<script setup>
import socket from "@/common/websocket/index";
import { onMounted, getCurrentInstance } from "vue";
import { useOrderStore } from "@/stores/order";
import { ref } from "vue";
import i18n from "./plugins/i18n";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import Notif from "./lib/components/AppNotification.vue";

const { getOrder, getOrdersNotCompleted } = useOrderStore();
const { userData } = storeToRefs(useUserStore());

// Variables
const isNotification = ref(false);
const msg = ref("");
const notif = ref("");
const rootInstance = getCurrentInstance();

// Chang site title and icon
document.title = "Booking Now";
let favicon = document.querySelector('link[rel="icon"]');
favicon.setAttribute("href", require("@/assets/logo.png"));

onMounted(() => {
  socket.on("msg_to_client", (data) => {
    if (userData.value.store._id === data.store._id) {
      msg.value = data.msg;
      if (userData.value.role.name === "chef") {
        isNotification.value = true;
        getOrdersNotCompleted();
      } else if (userData.value.role.name === "cashier") {
        isNotification.value = true;
        getOrder();
      }
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.shiftKey && e.ctrlKey && e.key === "L") {
      i18n.global.locale = i18n.global.locale === "en" ? "kh" : "en";
    }
  });
  rootInstance.root.$notif = notif.value.pushNotif;
});
</script>

<style lang="scss" src="./sass/app.scss"></style>
