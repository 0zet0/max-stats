import { defineStore } from "pinia";
import { ref, Ref, computed } from "vue";

export const useStatsStore = defineStore("stats", () => {
  const selectedStats = ref({}) as Ref<{
    title: string,
    items: Array<any>
  }>;

  const getSortedItems = computed(() => selectedStats.value.items?.sort((a, b) => a.value - b.value).reverse() || []);

  function selectStats(stat: any) {
    selectedStats.value = stat;
  }

  return {
    selectedStats,
    getSortedItems,
    selectStats
  };
});
