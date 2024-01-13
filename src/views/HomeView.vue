<template>
  <div class="hero" v-bind:style="{ 'background-image': 'url(' + bgImage + ')' }">
    <section class="container home-section">
      <header>
        <h1>Миссия на Марс</h1>
      </header>
      <main>
        <p>В 2004 году NASA запустила программу по исследованию Марса с помощью двух космическихх аппаратов, которые пробыли на планете более 10 лет.</p>
        <router-link to="rover-select">Select</router-link>
      </main>
    </section>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";

const bgImage = ref('')

onMounted(() => {
  let imgNumber = 1
  bgImage.value = `/src/assets/${imgNumber}.jpg`

  setInterval(() => {
    imgNumber++
    if (imgNumber === 5) {
      imgNumber = 1
    }
    bgImage.value = `/src/assets/${imgNumber}.jpg`
  }, 7000)
})
</script>