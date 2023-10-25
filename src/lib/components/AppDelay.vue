<template>
  <v-row v-if="isLoading" class="overlay" no-gutters>
    <!-- <v-col> -->
      <!-- <div
        v-if="message"
        class="subtitle-2 font-weight-medium text-uppercase"
      >
        {{ message }}
      </div> -->
      <v-progress-linear
        indeterminate
        height="8"
        color="red-accent-2"
      ></v-progress-linear>
      <!-- <v-progress-circular
        :indeterminate="true"
        color="red-accent-2"
        size="90"
        width="6"
        class="my-4"
      /> -->
    <!-- </v-col> -->
  </v-row>
</template>

<script setup>
// import { onMounted, ref } from "vue";
import { useLoadingStore } from "../state/loading/loading";
import { storeToRefs } from "pinia";
const { isLoading } = storeToRefs(useLoadingStore());
</script>

<style scoped>
.overlay {
  position: fixed;
  z-index: 5000;
  width: 100%;
  height: 100%;
  background: rgba(69, 69, 69, 0.5);
  top: 0;
  left: 0;
}
</style>
