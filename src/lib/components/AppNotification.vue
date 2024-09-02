<template>
  <div ref="notif" class="alert">
    <v-slide-x-reverse-transition group>
      <v-alert
        v-for="notification of notifications"
        class="mb-2"
        v-bind:="notification.opts"
        :text="notification.msg"
        :key="notification.id"
        closable
        @click:close="close(notification.id)"
      />
    </v-slide-x-reverse-transition>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    // data
    const notifications = ref([]);

    // methods
    function pushNotif(msg, options) {
      const id = new Date().valueOf() + Math.random();
      const opts = {
        timeout: 5000,
        ...options,
      };
      notifications.value.push({
        id,
        msg,
        opts,
      });
      if (opts.timeout) {
        setTimeout(() => {
          close(id);
        }, opts.timeout);
      }
    }
    function close(id) {
      notifications.value = notifications.value.filter(
        (item) => item.id !== id
      );
    }

    return {
      // data
      notifications,

      // methods
      pushNotif,
      close,
    };
  },
};
</script>

<style scoped>
.alert {
  overflow: hidden;
  position: fixed;
  bottom: 100px;
  top: 0;
  right: 0;
  margin-right: 5px;
  z-index: 100000;
}
</style>
