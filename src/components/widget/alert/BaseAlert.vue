<template>
  <v-snackbar
    rounded="xg"
    :timeout="5000"
    location="top right"
    :color="`${getColor(props.type)} alert`"
    min-width="auto"
  >
    <div class="d-flex align-center cus-text w-100">
      <slot></slot>
    </div>
    <template v-slot:actions>
      <v-btn variant="text" @click="$emit('hide-snackbar')">
        <v-icon class="text-h4 mdi mdi-close-circle"></v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "success",
  },
});

const getColor = (type) => {
  const types = {
    success: 'success',
    warning: 'deep-orange',
    error: 'red'
  };
  return types[type] || 'success';
}
</script>
<style>
.alert {
  margin-top: 65px;
}

@media screen and (max-width: 430px) {
  .cus-text > h5 {
    font-size: 16px !important;
  }
}
</style>
