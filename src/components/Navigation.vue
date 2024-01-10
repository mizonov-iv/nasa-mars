<template>
  <nav class="navigation">
    <span style="color: #FFFFFF" @click="toggleBurger">Open</span>
    <span class="nav-close-btn" v-show="navIsOpen" @click="toggleBurger">&times;</span>
    <ul class="nav-list" v-show="navIsOpen">
      <li class="nav-list-item" v-for="link in links">
        {{link}}
      </li>
    </ul>
  </nav>
</template>

<script setup>
import {ref} from "vue";

const navIsOpen = ref(false)

const toggleBurger = () => {
  navIsOpen.value = !navIsOpen.value
  console.log(navIsOpen.value)
}

const links = ref([
    "Главня",
    "Контакты",
    "О полете на марс"
])
</script>