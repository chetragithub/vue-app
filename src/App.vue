<template>
  <router-view></router-view>
  <app-delay />
  <!-- create alet -->
  <base-alert v-model="isNotification" @hide-snackbar="isNotification = false">
    <v-icon class="mr-2 text-h4 mdi mdi-check-circle"></v-icon>
    <h5 class="mt-2">{{ msg }}</h5>
  </base-alert>
</template>

<script setup>
import socket from "@/common/websocket/index";
import { onMounted } from "vue";

import { useOrderStore } from "@/stores/order";
const { getOrder, getOrdersNotCompleted } = useOrderStore();
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
const { userData } = storeToRefs(useUserStore());
import { ref } from "vue";

// Variables
const isNotification = ref(false);
const msg = ref("");

// Chang site title and icon
document.title = "Restaurant Management System";
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
});

</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400&display=swap");

* {
  padding: 0;
  margin: 0;
  font-family: "Inter", sans-serif !important;
}

body {
  background: #2c2c2c !important;
}

.font-inter {
  font-family: "Inter", sans-serif !important;
}

.active {
  background: #f25657;
}

#onesignal-bell-launcher {
  display: none;
}
</style>
