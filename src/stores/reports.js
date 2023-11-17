import { defineStore } from "pinia";
import http from "../http-common";

export const useReportsStore = defineStore("reports", {
  state: () => {
    return {
      productReports: [],
      moneyReports: [],
    };
  },
  actions: {
    async getProductReports(month, year) {
      try {
        const res = await http.get(
          `reports/product?month=${month}&year=${year}`
        );
        if (res.data.success) {
          this.productReports = res.data.data;
        }
      } catch (err) {
        return err;
      }
    },
    async getMoneyReports(year) {
      try {
        const res = await http.get(`reports/money?year=${year}`);
        if (res.data.success) {
          this.moneyReports = res.data.data;
        }
      } catch (err) {
        return err;
      }
    },
  },
  getters: {
    totalProduct() {
      return this.productReports.reduce((accumulator, r) => {
        return accumulator + r.total_orders;
      }, 0);
    },
    totalMoney() {
      return this.moneyReports.reduce((accumulator, r) => {
        return accumulator + r.total_money;
      }, 0);
    },
  },
});
