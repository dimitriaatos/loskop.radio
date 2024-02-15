<template>
  <NuxtLayout>
    <div>{{ error.statusCode }}</div>
    <div>{{ error.message }}</div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps<{ error: NuxtError }>();
</script>
