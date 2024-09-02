<template>
  <v-layout>
    <!-- Left side bar -->
    <res-owner-side-bar></res-owner-side-bar>
    <v-main class="ml-2">
      <header-component :title="$t('app.crud.category.title')">
      </header-component>

      <!-- Main container -->
      <main class="d-flex flex-column mt-2">
        <!-- list category -->
        <div
          class="grid-container mt-1 mr-2 gap-2"
          v-if="categories.length > 0"
        >
          <category-card
            v-for="category in categories"
            :key="category._id"
            :category="category"
          >
            <div class="d-flex justify-space-between align-center mt-2">
              <!-- close dialo delete category -->
              <dark-button @click="onEdit(category)">
                <v-icon
                  icon="mdi-square-edit-outline"
                  color="white"
                  size="large"
                ></v-icon>
                {{ $t("app.btn.edit") }}
              </dark-button>

              <!-- delete category -->
              <danger-button @click="onDelete(category._id)">
                <v-icon
                  icon="mdi-delete-forever"
                  color="white"
                  size="large"
                ></v-icon>
                {{ $t("app.btn.delete") }}
              </danger-button>
            </div>
          </category-card>
        </div>
        <!-- list category empty -->
        <div class="w-100 text-center" v-else>
          <h4 class="text-center mt-5 text-white">{{ $t("app.noData") }}</h4>
        </div>

        <!-- Category Summary -->
        <summary-component
          class="mt-2"
          :title="$t('app.crud.category.summary')"
        >
          <template v-slot:btn>
            <secondary-button @click="isShowForm = true">
              <v-icon
                icon="mdi-plus-box-multiple"
                color="white"
                size="large"
              ></v-icon>
              {{ $t("app.btn.add") }}
            </secondary-button>
          </template>
          <template v-slot:content>
            <div
              class="bg-grey-darken-2 mt-3 py-3 rounded-lg d-flex justify-space-between align-center"
            >
              <span class="ml-2">{{ $t("app.total") }}</span>
              <span v-if="categories.length > 1" class="mr-2"
                >{{ categories.length }} {{ $t("app.items") }}</span
              >
              <span v-else class="mr-2"
                >{{ categories.length }} {{ $t("app.item") }}</span
              >
            </div>
          </template>
        </summary-component>
      </main>
    </v-main>
  </v-layout>

  <!-- form create category -->
  <category-form :isShowForm="isShowForm" @closeForm="closeForm" />

  <!-- dialog delete category -->
  <base-dialog
    v-model="dialog"
    title="Tips"
    ms="Are you sure you want to delete?"
  >
    <danger-button @click="dialog = false">
      <v-icon icon="mdi-close-box-multiple" color="white" size="large"></v-icon
      >Cancel
    </danger-button>
    <primary-button @click="deleted">
      <v-icon
        icon="mdi-checkbox-multiple-marked"
        color="white"
        size="large"
      ></v-icon>
      Confirm
    </primary-button>
  </base-dialog>
</template>

<script>
import { onMounted, ref, getCurrentInstance } from "vue";
import { useCategoryStore } from "@/stores/category";
import { storeToRefs } from "pinia";
export default {
  setup() {
    // data
    const { categoryInForm, categories } = storeToRefs(useCategoryStore());
    const isShowForm = ref(false);
    const dialog = ref(false);
    const categoryId = ref(null);
    const instance = getCurrentInstance();

    // mothods
    const { getCategory, deleteCategory } = useCategoryStore();
    function onDelete(id) {
      categoryId.value = id;
      dialog.value = true;
    }
    function deleted() {
      if (categoryId.value !== null) {
        const id = categoryId.value;
        deleteCategory(id);
      }
      dialog.value = false;
      instance.root.$notif("Delete is success.", { type: "success" });
    }
    function onEdit(category) {
      const { _id, name } = category;
      categoryInForm.value = { category_id: _id, name };
      isShowForm.value = true;
    }
    function closeForm() {
      isShowForm.value = false;
    }

    // lifecycle
    onMounted(() => {
      getCategory();
    });

    return {
      // data
      categories,
      isShowForm,
      dialog,

      // mothods
      onDelete,
      deleted,
      onEdit,
      closeForm,
    };
  },
};
</script>

<style>
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}

.card-summary {
  background: #2c2c2c;
}

.search {
  background: #2c2c2c;
}
</style>
