<template>
    <v-snackbar rounded="xg" :timeout="5000" location="top right" color="red-accent-2 alert">
        <div class="d-flex text-center justify-center align-center">
            <slot></slot>
        </div>
        <template v-slot:actions>
          <v-btn
            color="dark"
            variant="text"
            @click="$emit('hide-snackbar')"
          >
            Close
          </v-btn>
      </template>
    </v-snackbar>
</template>

<style>
.alert {
  margin-top: 65px;
}
</style>