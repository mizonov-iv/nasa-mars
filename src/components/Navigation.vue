<template>
<ul class="nav-list">
  <li class="nav-list-item" v-for="link in links">
    {{link}}
  </li>
</ul>
</template>

<script setup>

import {ref} from "vue";

const links = ref([
    "Главня",
    "Контакты",
    "О полете на марс"
])
</script>

<style scoped>

</style>