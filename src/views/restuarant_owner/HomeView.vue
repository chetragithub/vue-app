<template>
  <v-layout>
    <!-- Left side bar -->
    <res-owner-side-bar></res-owner-side-bar>

    <header-component :title="$t('app.nav.home')" />

    <v-main class="grid-container mx-2 mt-2 gap-2">
      <div @click="to('product')" class="cursor-pointer bg-grey-darken-2 rounded-lg d-flex justify-space-between align-center">
        <div class="w-50 d-flex flex-column align-center  card-summary py-2 m-2 rounded-lg text-center">
          <v-icon icon="mdi-cube-outline" color="white" size="x-large"></v-icon>
          <span class="mt-1">{{ $t('app.nav.product') }}</span>
        </div>
        <div class="w-50 d-flex justify-center">
          <h5 v-if="products.length > 1" class="mt-2">{{ products.length }} {{ $t('app.items') }}</h5>
          <h5 v-else class="mt-2">{{ products.length }} {{ $t('app.item') }}</h5>
        </div>
      </div>
      <div @click="to('category')" class="cursor-pointer bg-grey-darken-2 rounded-lg d-flex justify-space-between align-center">
        <div class="w-50 d-flex flex-column align-center  card-summary py-2 m-2 rounded-lg text-center">
          <v-icon icon="mdi-shape-plus-outline" color="white" size="x-large"></v-icon>
          <span class="mt-1">{{ $t('app.nav.category') }}</span>
        </div>
        <div class="w-50 d-flex justify-center">
          <h5 v-if="categories.length > 1" class="mt-2">{{ categories.length }} {{ $t('app.items') }}</h5>
          <h5 v-else class="mt-2">{{ categories.length }} {{ $t('app.item') }}</h5>
        </div>
      </div>
      <div @click="to('table')" class="cursor-pointer bg-grey-darken-2 rounded-lg d-flex justify-space-between align-center">
        <div class="w-50 d-flex flex-column align-center  card-summary py-2 m-2 rounded-lg text-center">
          <v-icon icon="mdi-table-chair" color="white" size="x-large"></v-icon>
          <span class="mt-1">{{ $t('app.nav.table') }}</span>
        </div>
        <div class="w-50 d-flex justify-center">
          <h5 v-if="tables.length > 1" class="mt-2">{{ tables.length }} {{ $t('app.items') }}</h5>
          <h5 v-else class="mt-2">{{ tables.length }} {{ $t('app.item') }}</h5>
        </div>
      </div>
      <div @click="to('staff')" class="cursor-pointer bg-grey-darken-2 rounded-lg d-flex justify-space-between align-center">
        <div class="w-50 d-flex flex-column align-center  card-summary py-2 m-2 rounded-lg text-center">
          <v-icon icon="mdi-account-group-outline" color="white" size="x-large"></v-icon>
          <span class="mt-1">{{ $t('app.nav.staff') }}</span>
        </div>
        <div class="w-50 d-flex justify-center">
          <h5 v-if="staff.length > 1" class="mt-2">{{ staff.length }} {{ $t('app.crud.staff.people') }}</h5>
          <h5 v-else class="mt-2">{{ staff.length }} {{ $t('app.crud.staff.person')}}</h5>
        </div>
      </div>
      <div @click="to('sale')" class="cursor-pointer bg-grey-darken-2 rounded-lg d-flex justify-space-between align-center">
        <div class="w-50 d-flex flex-column align-center  card-summary py-2 m-2 rounded-lg text-center">
          <v-icon icon="mdi-chart-bar" color="white" size="x-large"></v-icon>
          <span class="mt-1">{{ $t('app.nav.sale') }}</span>
        </div>
        <div class="w-50 d-flex justify-center">
          <h5 v-if="totalProduct > 1" class="mt-2">{{ totalProduct }} {{ $t('app.items') }}</h5>
          <h5 v-else class="mt-2">{{ totalProduct }} {{ $t('app.item') }}</h5>
        </div>
      </div>
      <div @click="to('money')" class="cursor-pointer bg-grey-darken-2 rounded-lg d-flex justify-space-between align-center">
        <div class="w-50 d-flex flex-column align-center  card-summary py-2 m-2 rounded-lg text-center">
          <v-icon icon="mdi-finance" color="white" size="x-large"></v-icon>
          <span class="mt-1">{{ $t('app.nav.money') }}</span>
        </div>
        <div class="w-50 d-flex justify-center">
          <h5 class="mt-2">{{ $t('app.currency') }}{{ totalMoney.toFixed(2) }}</h5>
        </div>
      </div>

    </v-main>
  </v-layout>
</template>

<script setup>
import { useProductStore } from "@/stores/product";
import { useCategoryStore } from "@/stores/category";
import { useTableStore } from "@/stores/table";
import { useUserStore } from "@/stores/user";
import { useReportsStore } from "@/stores/reports";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import router from "@/router/index";

const { getProducts } = useProductStore();
const { getCategory } = useCategoryStore();
const { getTables } = useTableStore();
const { getStaff } = useUserStore();
const { getProductReports, getMoneyReports } = useReportsStore();

const { products } = storeToRefs(useProductStore());
const { categories } = storeToRefs(useCategoryStore());
const { tables } = storeToRefs(useTableStore());
const { staff } = storeToRefs(useUserStore());
const { totalProduct, totalMoney } = storeToRefs(useReportsStore());

const currentDate = new Date();
const getMonth = currentDate.getMonth().toLocaleString("en-US", {
  minimumIntegerDigits: 2,
  useGrouping: false,
});
const getYear = currentDate.getFullYear();

const to = (routePath) => {
  router.push(routePath);
}

onMounted(() => {
  getProducts();
  getCategory();
  getTables();
  getStaff();
  getProductReports(Number(getMonth) + 1, getYear);
  getMoneyReports(getYear);
});
</script>

<style scoped>
.card-summary {
  background: #2c2c2c;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.cursor-pointer {
  cursor: pointer;
}
</style>