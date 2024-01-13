<template>
  <header class="header">
    <div class="container header-container">
      <button
          class="burger"
          :class="{open: navIsOpen}"
          @click.prevent="toggleBurger"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <p class="logo">Миссия на Марс</p>
      <nav
          class="menu"
          :class="{open: navIsOpen}"
      >
        <ul class="menu-list">
          <li class="menu-list-item" v-for="link in links">
            {{link}}
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import {ref} from "vue";

const navIsOpen = ref(false)

const toggleBurger = () => {
  navIsOpen.value = !navIsOpen.value
  console.log(navIsOpen.value.classList)
}

const links = ref([
    "Главня",
    "Контакты",
    "О полете на марс",
])
</script>