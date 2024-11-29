<template>
  <div class="fixed top-4 right-4 z-50">
    <TransitionGroup
        name="toast"
        tag="div"
        class="space-y-2"
    >
      <Toast
          v-for="toast in toastStore.toasts"
          :key="toast.uuid"
          :message="toast.message"
          :type="toast.type"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import Toast from "./Toast.vue";
import { useToastStore } from "../store/toastStore";

const toastStore = useToastStore();
</script>

<style>
.toast-enter-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-leave-active {
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(80px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(80px);
}

.toast-enter-to,
.toast-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
