<!-- http://localhost:8080/#/ebook/History|2018_Book_AnimalsAndTheShapingOfModernMe-->
<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  export default {
  }
  document.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html')
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > 50 ? 50 : fontSize
    html.style.fontSize = fontSize + 'px'
  })
</script>
<style lang="scss" scoped>
  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
