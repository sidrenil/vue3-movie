<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1" class="page-btn">
      ‹
    </button>
    <button
      v-for="page in pagesToShow"
      :key="page"
      @click="updatePage(page)"
      :class="['page-btn', { active: currentPage === page }]"
    >
      {{ page }}
    </button>
    <button
      @click="nextPage"
      :disabled="currentPage === totalPages"
      class="page-btn"
    >
      ›
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});

const emits = defineEmits(["updatePage"]);

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emits("updatePage", props.currentPage + 1);
  }
};

const prevPage = () => {
  if (props.currentPage > 1) {
    emits("updatePage", props.currentPage - 1);
  }
};

const updatePage = (page) => {
  emits("updatePage", page);
};

const pagesToShow = computed(() => {
  const range = 2;
  let start = Math.max(1, props.currentPage - range);
  let end = Math.min(props.totalPages, props.currentPage + range);

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.page-btn {
  margin: 0 5px;
  padding: 8px 12px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.page-btn:hover {
  background-color: #e0e0e0;
}

.page-btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.page-btn.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}
</style>
