<!--  -->
<template>
  <div class="ebook-reader">
    <div id="read">

    </div>
  </div>
</template>

<script>
// import { mapActions } from 'vuex'
import { ebookMixin } from '../../utils/mixin'
import Epub from 'epubjs'
global.ePub = Epub
export default {
  data () {
    return {
    }
  },
  mixins: [ebookMixin],
  methods: {
    prevPage () {
      this.rendition && this.rendition.prev()
      this.hideTitleAndMenu()
    },
    nextPage () {
      this.rendition && this.rendition.next()
      this.hideTitleAndMenu()
    },
    toggleTitleAndMenu () {
      this.menuVisible && this.setSettingVisible(-1)
      // this.$store.dispatch('setMenuVisible', !this.menuVisible)
      this.setMenuVisible(!this.menuVisible)
    },
    hideTitleAndMenu () {
      // this.$store.dispatch('setMenuVisible', false)
      this.setMenuVisible(false)
      this.setSettingVisible(-1)
    },
    initEpub () {
      const url = 'http://47.101.198.221:8080/epub/' + this.fileName + '.epub'
      // console.log(url)
      this.book = new Epub(url)
      this.setCurrentBook(this.book)
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        method: 'default'
      })
      this.rendition.display()
      this.rendition.on('touchstart', (event) => {
        this.touchStartX = event.changedTouches[0].clientX
        this.touchStartTime = event.timeStamp
      })
      this.rendition.on('touchend', event => {
        const offsetX = event.changedTouches[0].clientX - this.touchStartX
        const time = event.timeStamp - this.touchStartTime
        if (time < 500 && offsetX > 40) {
          this.prevPage()
        } else if (time < 500 && offsetX < -40) {
          this.nextPage()
        } else {
          this.toggleTitleAndMenu()
        }
        event.preventDefault()
        event.stopPropagation()
      })
    }
  },
  mounted () {
    const fileName = this.$route.params.fileName.split('|').join('/')
    this.setFileName(fileName).then(() => {
      this.initEpub()
    })
  }
}

</script>
<style lang='scss' rel='stylesheet/scss' scoped>
  @import '../../assets/styles/global.scss';
  iframe {
    body {
      padding-left: 0!important;
    }
  }
</style>
