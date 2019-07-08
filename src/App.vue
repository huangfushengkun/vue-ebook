<template>
  <div id="app">
    <span class="text">ABCDFWERFD</span>
    <router-view/>
  </div>
</template>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html')
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > 50 ? 50 : fontSize
    html.style.fontSize = fontSize + 'px'
  })
export default {
  
}
</script>


<style scoped>
  .text {
    font-family: 'Days One';
    font-size: 1rem;
    color: red;
  }
</style>
