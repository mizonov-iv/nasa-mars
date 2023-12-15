<template>
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
          :value="camera.name"
      >
        {{camera.name}}
      </option>
    </select>
    <input
        class="form-input"
        type="number"
        max="1000"
        placeholder="Выберите день"
        :disabled="!selectedRover"
        v-model="selectedSol"
    >
    <button class="form-btn" type="submit">Увидеть снимки</button>
  </form>
</template>

<script setup>
import axios from 'axios'
import {computed, ref} from "vue";

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

const resp = ref()

const selectedRover = ref("")
const selectedCamera = ref("")
const selectedSol = ref(1)

const sendForm = () => {
  axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRover.value}/photos?sol=${selectedSol.value}&api_key=${API_KEY}`)
      .then(response => {
        resp.value = response.data
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
}

const cameras = computed(() => {
  if(selectedRover.value) {
    if(selectedRover.value === "Curiosity") {
      return curiosityCameras
    } else return opportunityAndSpiritCameras
  }
})
</script>