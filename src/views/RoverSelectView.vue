<template>
  <section class="container section rovers-section">
    <header class="home-header">
      <h2 class="home-header-title">Выберите аппарат, камеру и день</h2>
    </header>
    <main>
      <form v-if="showForm" class="form" @submit.prevent="sendForm">
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

      <svg @click="showForm = !showForm" v-else width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#D0BCFF"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z" fill="#ffffff"></path> </g></svg>

      <Spinner v-if="loadingStatus"/>

      <div v-show="!showForm">
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
      </div>

      <ImagePopup v-if="showPopup" :item="popupItem" @closePopup="closePopup"/>
      <p v-if="message">{{message}}</p>
    </main>
  </section>
</template>

<script setup>
import axios from 'axios'
import {computed, onMounted, ref} from "vue"
import ImagePopup from "../components/ImagePopup.vue"
import Spinner from "../components/Spinner.vue"

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
        showForm.value = false
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
const showForm = ref((true))
const popupItem = ref()

const openPopup = (item) => {
  popupItem.value = item
  showPopup.value = true
}

const closePopup = () => {
  showPopup.value = false
}
</script>