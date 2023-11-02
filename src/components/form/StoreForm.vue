<!-- Referemce: https://play.vuetifyjs.com/
<!- Dialog for update profile -->
<template>
  <!-- Form update profile -->
  <v-form>
    <!-- Dialog -->
    <v-dialog v-model="dialog" persistent width="550" no-padding>
      <v-card class="h-auto rounded-lg d-flex flex-column bg-white">
        <!--Card title-->
        <v-card-title class="text-center mb-1 bg-red-accent-2">
          <span class="font-inter text-h6">Update Store</span>
        </v-card-title>
        <!--Card container-->
        <v-container class="mt-2">
          <v-row class="d-flex px-2 flex-column justify-center gap-2">
            <div class="gap-2 mt-2">
              <v-text-field
                v-model="storeInForm.name"
                class="text-black"
                label="Name"
                density="compact"
                variant="outlined"
                :error-messages="v$.name.$errors.map((e) => e.$message)"
                @blur="v$.name.$touch"
              ></v-text-field>
              <v-text-field
                v-model="storeInForm.city"
                class="text-black mt-1"
                label="City / Town"
                density="compact"
                variant="outlined"
                :error-messages="v$.city.$errors.map((e) => e.$message)"
                @blur="v$.city.$touch"
              ></v-text-field>
              <v-text-field
                v-model="storeInForm.street"
                class="text-black mt-1"
                label="Street / Address"
                density="compact"
                variant="outlined"
                :error-messages="v$.street.$errors.map((e) => e.$message)"
                @blur="v$.street.$touch"
              ></v-text-field>
            </div>
          </v-row>
        </v-container>
        <v-card-actions class="bg-grey-lighten-2">
          <v-spacer></v-spacer>
          <!--Close button-->
          <danger-button @click="$emit('closeForm')">
            <v-icon icon="mdi-close-box-multiple" color="white" size="large">
            </v-icon>
            Close
          </danger-button>
          <!--Save button-->
          <primary-button
            class="mr-1"
            type="submit"
            @click="
              () => {
                v$.$validate();
                save();
              }
            "
          >
            <v-icon icon="mdi-content-save-all" color="white" size="large">
            </v-icon>
            Save
          </primary-button>
        </v-card-actions>
        <!--Action-->
      </v-card>
    </v-dialog>
  </v-form>

  <!-- Alert update success -->
  <base-alert v-model="updateSuccess" @hide-snackbar="updateSuccess = false">
    <v-icon class="mr-2 text-h4 mdi mdi-check-circle"></v-icon>
    <h5 class="mt-2">Updated store successfully.</h5>
  </base-alert>
</template>

<script setup>
// Import
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { defineProps, computed, defineEmits } from "vue";
import { useStoreStore } from "@/stores/store";
import { storeToRefs } from "pinia";

// Variables
const { updateStore } = useStoreStore();
const { storeInForm, updateSuccess } = storeToRefs(useStoreStore());
const emit = defineEmits(["closeForm"]);
const props = defineProps(["isShowForm"]);

const rules = {
  name: { required },
  city: { required },
  street: { required },
};

const v$ = useVuelidate(rules, storeInForm);

const save = async () => {
  if (v$.value.$errors.length === 0) {
    const { store_id, name, city, street } = storeInForm.value;
    await updateStore({ store_id, name, city, street });
    emit("closeForm");
  }
};

// Computed
let dialog = computed(() => {
  return props.isShowForm;
});
</script>

<style scoped>
.font-inter {
  font-family: "Inter", sans-serif !important;
}

.profile {
  background: #2c2c2c;
}

.input-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.input-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
</style>
