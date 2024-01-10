<template>
  <div class="hero" v-bind:style="{ 'background-image': 'url(' + bgImage + ')' }">
    <Navigation/>

    <h1>Миссия на Марс</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias consequatur debitis delectus dicta explicabo nam perspiciatis quasi sapiente veniam.</p>

    <form class="form" @submit.prevent="sendForm">
      <select class="form-select" v-model="selectedRover">
        <option class="select-option" disabled value="">Выберите ровер</option>
        <option
            class="select-option"
            v-for="rover in roversList"
            :key="rover.id"
            :value="rover.name"
        >
          {{rover.name}}
        </option>
      </select>
      <select class="form-select" v-model="selectedCamera" :disabled="!selectedRover">
        <option class="select-option" disabled value="">Выберите камеру</option>
        <option
            class="select-option"
            v-for="camera in cameras"
            :key="camera"
            :value="camera.abbreviation"
        >
          {{camera.name}}
        </option>
      </select>
      <input
          class="form-input"
          type="number"
          max="1000"
          placeholder="Выберите день"
          :disabled="!selectedCamera"
          v-model="selectedSol"
      >
      <button class="form-btn" type="submit">Увидеть снимки</button>
    </form>
  </div>

  <Spinner v-if="loadingStatus"/>

  <ul class="images-list">
    <li class="image-item" v-for="item in paginatedItems" :key="item.id" @click="openPopup(item)">
      <img
          class="item-img"
          :src="item.img_src"
          :alt="item.id"
      >
    </li>
  </ul>

  <button @click="loadMore" v-if="showLoadMoreButton">Load more</button>
  <ImagePopup v-if="showPopup" :item="popupItem" @closePopup="closePopup"/>
  <p v-if="message">{{message}}</p>
</template>

<script setup>
import axios from 'axios'
import {computed, onMounted, ref} from "vue"
import ImagePopup from "./components/ImagePopup.vue"
import Spinner from "./components/Spinner.vue"
import Navigation from "./components/Navigation.vue";

onMounted(() => {
  let imgNumber = 1
  bgImage.value = `/src/assets/${imgNumber}.jpg`

  setTimeout(() => {
    imgNumber++
    bgImage.value = `/src/assets/${imgNumber}.jpg`
  }, 3000)

  console.log(bgImage)
})

const bgImage = ref('')


const API_KEY = 'RRXijm1h3BtuMsaXOIKawe81ERYXsWcGVemIW8FJ'
const roversList = [
  {
    id: 0,
    name: "curiosity"
  },
  {
    id: 1,
    name: "opportunity"
  },
  {
    id: 2,
    name: "spirit"
  }
]
const curiosityCameras = [
  {
    name: "Front Hazard Avoidance Camera",
    abbreviation: "FHAZ"
  },
  {
    name: "Rear Hazard Avoidance Camera",
    abbreviation: "RHAZ"
  },
  {
    name: "Mast Camera",
    abbreviation: "MAST"
  },
  {
    name: "Chemistry and Camera Complex",
    abbreviation: "CHEMCAM"
  },
  {
    name: "Mars Hand Lens Imager",
    abbreviation: "MAHLI"
  },
  {
    name: "Mars Descent Imager",
    abbreviation: "MARDI"
  },
  {
    name: "Navigation Camera",
    abbreviation: "NAVCAM"
  },
]
const opportunityAndSpiritCameras = [
  {
    name: "Front Hazard Avoidance Camera",
    abbreviation: "FHAZ"
  },
  {
    name: "Rear Hazard Avoidance Camera",
    abbreviation: "RHAZ"
  },
  {
    name: "Navigation Camera",
    abbreviation: "NAVCAM"
  },
  {
    name: "Panoramic Camera",
    abbreviation: "PANCAM"
  },
  {
    name: "Miniature Thermal Emission Spectrometer (Mini-TES)",
    abbreviation: "MINITES"
  },
]

const selectedRover = ref("spirit")
const selectedCamera = ref("PANCAM")
const selectedSol = ref(4)

const message = ref()
const loadingStatus = ref(false)

const cameras = computed(() => {
  if(selectedRover.value) {
    if(selectedRover.value === "curiosity") {
      return curiosityCameras
    } else return opportunityAndSpiritCameras
  }
})

const photos = ref([])

const sendForm = () => {
  message.value = ""
  loadingStatus.value = true
  axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRover.value}/photos?sol=${selectedSol.value}&camera=${selectedCamera.value}&api_key=${API_KEY}`)
      .then(response => {
        loadingStatus.value = false
        photos.value = response.data.photos

        if(!photos.value.length) {
          message.value = "В этот день съемка с выбранной камеры не велась."
        }

        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
}

const pageSize = 6
const currentPage = ref(1)

const paginatedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize
  const endIndex = startIndex + pageSize
  return photos.value.slice(startIndex, endIndex)
})

const showLoadMoreButton = computed(() => {
  return currentPage.value * pageSize < photos.value.length
})

const loadMore = () => {
  currentPage.value++;
}

const showPopup = ref(false)
const popupItem = ref()

const openPopup = (item) => {
  popupItem.value = item
  showPopup.value = true
}

const closePopup = () => {
  showPopup.value = false
}
</script>