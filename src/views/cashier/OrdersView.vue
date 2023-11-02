<template>
  <!-- Order view -->
  <v-layout>
    <base-side-bar :menus="menus"></base-side-bar>
    <!-- Header -->
    <header-component title="Manage order">
      <v-text-field
        v-model="keyword"
        class="search text-white rounded-lg"
        density="compact"
        variant="solo-none"
        label="Search for order..."
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        @click:append-inner="console.log('search')"
      ></v-text-field>
    </header-component>
    <!------>

    <v-main style="height: auto">
      <!-- If no order -->
      <div class="h-screen" v-if="orders.length == 0">
        <h4 class="text-center mt-5 text-white">No order available.</h4>
      </div>
      <!-- If have some orders -->
      <order-list-table v-else :orders="orders" />
      <!-- Product Summary -->
      <summary-component class="mt-2" title="Order Summary">
        <template v-slot:content>
          <div
            class="bg-grey-darken-2 mt-4 py-3 rounded-lg d-flex justify-space-between align-center"
          >
            <span class="ml-2">Total</span>
            <span class="mr-2">{{ orders.length }} items</span>
          </div>
        </template>
      </summary-component>
    </v-main>
  </v-layout>

  <!-- Alert message -->
  <base-alert v-model="paidSuccess" @hide-snackbar="paidSuccess = false">
    <span class="mr-2 text-h4 mdi mdi-check-circle"></span>
    <h5 class="mt-2">Order have paid successfully.</h5>
  </base-alert>
</template>

<script setup>
import { useOrderStore } from "@/stores/order";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { onMounted } from "vue";
import { ref } from "vue";
import { defineProps } from "vue";

// Variable
defineProps(["title"]);
const { getOrder } = useOrderStore();
const { notPaidOrders, paidSuccess } = storeToRefs(useOrderStore());
const keyword = ref("");
const menus = ref([
  {
    link: "/cashier",
    title: "Order",
    icon: "mdi-storefront-plus",
  },
]);

const orders = computed(() => {
  if (!notPaidOrders.value.length === 0) return [];
  return notPaidOrders.value.filter((r) => {
    if (
      r.table_id.table_number
        .toLowerCase()
        .search(keyword.value.toLowerCase()) >= 0 ||
      r._id.toLowerCase().search(keyword.value.toLowerCase()) >= 0 ||
      new Date(r.datetime).toLocaleDateString() == keyword.value
    ) {
      return true;
    }
    return false;
  });
});

// Lifecycle hook
onMounted(() => {
  getOrder();
});
</script>

<style>
.search {
  background: #2c2c2c;
}

#onesignal-bell-launcher {
  display: block;
}
</style>
