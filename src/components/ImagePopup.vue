<template>
  <div class="image-popup">
    <span class="img-close-btn" @click="$emit('closePopup')">&times;</span>
    <img class="popup-img" :src="props.item.img_src" alt="">
  </div>
</template>

<script setup>
const props = defineProps({
  item: Object
})
</script>