<template>
  <div>
    <select v-model="selectedRover">
      <option disabled value="">Выберите ровер</option>
      <option
          v-for="rover in roversList"
          :key="rover.id"
          :value="rover.name"
      >
        {{rover.name}}
      </option>
    </select>

    <select>
      <option disabled value="">Выберите камеру</option>
      <option v-for="camera in cameras" :key="camera" :value="camera.name">{{camera.name}}</option>
    </select>
  </div>
</template>

<script setup>
import axios from 'axios'
import {computed, onMounted, ref} from "vue";

const API_KEY = 'RRXijm1h3BtuMsaXOIKawe81ERYXsWcGVemIW8FJ'
const roversList = [
  {
    id: 0,
    name: "Curiosity"
  },
  {
    id: 1,
    name: "Opportunity"
  },
  {
    id: 2,
    name: "Spirit"
  }
]
const camerasList = [
  {
    name: "Front Hazard Avoidance Camera",
    abbreviation: "FHAZ"
  },
  {
    name: "RHAZ",
    abbreviation: "Rear Hazard Avoidance Camera"
  },
  {
    name: "MAST",
    abbreviation: "Mast Camera"
  },
  {
    name: "CHEMCAM",
    abbreviation: "Chemistry and Camera Complex"
  },
  {
    name: "MAHLI",
    abbreviation: "Mars Hand Lens Imager"
  },
  {
    name: "MARDI",
    abbreviation: "Mars Descent Imager"
  },
  {
    name: "NAVCAM",
    abbreviation: "Navigation Camera"
  },
  {
    name: "PANCAM",
    abbreviation: "Panoramic Camera"
  },
  {
    name: "MINITES",
    abbreviation: "Miniature Thermal Emission Spectrometer (Mini-TES)"
  },
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
    name: "RHAZ",
    abbreviation: "Rear Hazard Avoidance Camera"
  },
  {
    name: "NAVCAM",
    abbreviation: "Navigation Camera"
  },
  {
    name: "PANCAM",
    abbreviation: "Panoramic Camera"
  },
  {
    name: "MINITES",
    abbreviation: "Miniature Thermal Emission Spectrometer (Mini-TES)"
  },
]

const resp = ref()

const selectedRover = ref("")

const cameras = computed(() => {
  if(selectedRover.value) {
    if(selectedRover.value === "Curiosity") {
      return curiosityCameras
    } else return opportunityAndSpiritCameras
  }
})

onMounted(() => {
  axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${API_KEY}`)
      .then(response => {
        resp.value = response.data
        console.log(response)
      })
})
</script>