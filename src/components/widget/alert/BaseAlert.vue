<template>
  <v-snackbar
    rounded="xg"
    :timeout="5000"
    location="top right"
    color="red-accent-2 alert"
  >
    <div class="d-flex align-center cus-text w-100">
      <slot></slot>
    </div>
    <template v-slot:actions>
      <v-btn color="dark" class="font-weight-bold" variant="text" @click="$emit('hide-snackbar')">
        {{ $t("app.btn.close") }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

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
