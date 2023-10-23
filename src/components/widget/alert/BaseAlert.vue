<template>
    <v-snackbar rounded="xg" :timeout="5000" location="bottom right" color="red-accent-2">
        <div class="d-flex text-center justify-center align-center">
            <slot></slot>
        </div>
    </v-snackbar>
</template>