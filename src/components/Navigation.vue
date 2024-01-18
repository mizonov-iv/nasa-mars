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
      <nav
          class="menu"
          :class="{open: navIsOpen}"
      >
        <ul class="menu-list">
          <li class="menu-list-item" v-for="link in links">
            <router-link

                :to="link.path"
            >
              {{link.name}}
            </router-link>
          </li>
        </ul>
      </nav>
      <p class="logo">Миссия на Марс</p>
    </div>
  </header>
</template>

<script setup>
import {ref} from "vue";

const navIsOpen = ref(false)

const toggleBurger = () => {
  navIsOpen.value = !navIsOpen.value
}

const links = ref([
  {
    name: "Главная",
    path: "/"
  },
  {
    name: "Контакты",
    path: "/"
  },
  {
    name: "О полете на марс",
    path: "/"
  },
])
</script>