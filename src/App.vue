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
// import http from "@/http-common";
import socket from "@/common/websocket/index";
import { onMounted } from "vue";

import { useOrderStore } from "@/stores/order";
const { getOrder, getOrdersNotCompleted } = useOrderStore();
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
const { userData } = storeToRefs(useUserStore());

// import { storeToRefs } from "pinia";
// import { useUserStore } from "@/stores/user";
// import { useOneSignal } from '@onesignal/onesignal-vue3';
import { ref } from "vue";

// Variables
// const { getUser } = useUserStore();
// const { user } = storeToRefs(useUserStore());
// const oneSignal = useOneSignal();
const isNotification = ref(false);
const msg = ref("");

// Chang site title and icon
document.title = "Restaurant Management System";
let favicon = document.querySelector('link[rel="icon"]');
favicon.setAttribute("href", require("@/assets/logo.png"));

// On subscription change on OneSignal icon
// oneSignal.on('subscriptionChange', async (isSubscribed) => {
//   await getUser();
//   // Only chef and cashier can be get notification from OneSignal
//   if (user.value) {
//     if (isSubscribed && (user.value.role.name === 'chef' || user.value.role.name === 'cashier')) {
//       oneSignal.getUserId(async function (playerId) {
//         try {
//           const res = await http.post("onsignal", {
//             player_id: playerId,
//             user_id: user.value.user_id,
//           });
//           if (res.data.success) {
//             console.log("You have subscribe to notification.");
//           }
//         } catch (err) {
//           console.log(err);
//         }
//       });
//     }
//   }
// });

onMounted(() => {
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
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
  };
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
