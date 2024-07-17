<template>
  <div class="text-start mt10 ml-5">
    <button
      @click="goBack"
      class="bg-gray-500 text-white py-2 px-4 rounded-full"
    >
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
    </button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<style scoped></style>
