<template>
  <section class="container section home-section">
    <header class="home-header">
      <h1 class="home-header-title">Миссия на Марс</h1>
      <p style="color: #FFFFFF; font-size: 18px">
        {{result}}
      </p>
    </header>
    <main>
      <router-link to="rover-select" class="select-btn">Посмотреть снимки</router-link>
    </main>
  </section>
</template>

<script setup>
import {onMounted, ref} from "vue";

onMounted(() => {
  typeLine();
})

let line = 0
const text = ["В 2004 году NASA запустила программу по исследованию Марса с помощью двух космическихх аппаратов, которые пробыли на планете более 10 лет."]
let count = 0;
const result = ref("")

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function typeLine() {
  let interval = setTimeout(
      () => {
        result.value += text[line][count]
        count++;
        if (count >= text[line].length) {
          count = 0;
          // sleep(2000);
          // result.value = ''
          // if (result.value.length === text.length) {
          //   clearTimeout(interval);
            return true;
          // }
        }
        typeLine();
      }, getRandomInt(getRandomInt(100*2.5)))
}
</script>