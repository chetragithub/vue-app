<template>
  <v-row v-if="isLoading" class="overlay" no-gutters>
      <v-progress-circular
        class="loading"
        indeterminate
        :rotate="180"
        :width="12"
        color="red-accent-2"
      ></v-progress-circular>
  </v-row>
</template>

<script setup>
import { useLoadingStore } from "../state/loading/loading";
import { storeToRefs } from "pinia";
const { isLoading } = storeToRefs(useLoadingStore());
</script>

<style scoped>
::v-deep .loading {
  width: 100px;
  height: 100px;
}

.overlay {
  position: fixed;
  z-index: 5000;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 900px) {
  ::v-deep .loading {
    width: 60px;
    height: 60px;
  }
}
</style>
