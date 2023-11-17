<template>
  <base-side-bar :menus="menus"></base-side-bar>
</template>

<script setup>
import { computed } from "vue";
import { t } from "../../plugins/i18n";

const menus = computed(() => {
  return [
    {
      link: "/",
      title: t("app.nav.home"),
      icon: "mdi-home-analytics",
    },
    {
      link: "/product",
      title: t("app.nav.product"),
      icon: "mdi-cube-outline",
    },
    {
      link: "/category",
      title: t("app.nav.category"),
      icon: "mdi-shape-plus-outline",
    },
    {
      link: "/table",
      title: t("app.nav.table"),
      icon: "mdi-table-chair",
    },
    {
      link: "/staff",
      title: t("app.nav.staff"),
      icon: "mdi-account-group-outline",
    },
    {
      link: "/sale",
      title: t("app.nav.sale"),
      icon: "mdi-chart-bar",
    },
    {
      link: "/money",
      title: t("app.nav.money"),
      icon: "mdi-finance",
    },
  ];
});
</script>
