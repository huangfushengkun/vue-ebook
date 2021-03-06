<!--  -->
<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
// import { mapActions } from 'vuex'
import { ebookMixin } from '../../utils/mixin'
import Epub from 'epubjs'
import { Promise } from 'q'
import {
  getFontFamily,
  saveFontFamily,
  getFontSize,
  saveFontSize,
  getTheme,
  saveTheme,
  getLocation
} from '../../utils/localStorage'
global.ePub = Epub
export default {
  data () {
    return {}
  },
  mixins: [ebookMixin],
  methods: {
    prevPage () {
      this.rendition && this.rendition.prev().then(() => {
        this.refreshLocation()
      })
      this.hideTitleAndMenu()
    },
    nextPage () {
      this.rendition && this.rendition.next().then(() => {
        this.refreshLocation()
      })
      this.hideTitleAndMenu()
    },
    /* 切换头部和菜单 */
    toggleTitleAndMenu () {
      this.menuVisible && this.setSettingVisible(-1)
      // this.$store.dispatch('setMenuVisible', !this.menuVisible)
      this.setMenuVisible(!this.menuVisible)
      this.setFontFamilyVisible(false)
    },

    /* 字号初始化 */
    initFontSize () {
      let fontSize = getFontSize(this.fileName)
      if (!fontSize) {
        saveFontSize(this.fileName, this.defaultFontSize)
      } else {
        this.rendition.themes.fontSize(fontSize)
        this.setDefaultFontSize(fontSize)
      }
    },
    /* 字体初始化 */
    initFontFamily () {
      let font = getFontFamily(this.fileName)
      if (!font) {
        saveFontFamily(this.fileName, this.defaultFontFamily)
      } else {
        this.rendition.themes.font(font)
        this.setDefaultFontFamily(font)
      }
    },
    /* 主题初始化 */
    initTheme () {
      let defaultTheme = getTheme(this.fileName)
      if (!defaultTheme) {
        defaultTheme = this.themeList[0].name
        saveTheme(this.fileName, defaultTheme)
      }
      this.themeList.forEach(theme => {
        this.rendition.themes.register(theme.name, theme.style)
      })
      /* 选择默认样式 */
      this.setDefaultTheme(defaultTheme)
      this.rendition.themes.select(defaultTheme)
    },
    initRendition () {
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        method: 'default'
      })
      const location = getLocation(this.fileName)
      this.display(location, () => {
        this.initTheme()
        this.initFontSize()
        this.initFontFamily()
        this.initGlobalStyle()
        this.refreshLocation()
      })
      this.rendition.hooks.content.register(contents => {
        Promise.all([
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/cabin.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`
          )
        ])
        // .then (() => {})
      })
    },
    /* 手势操作 */
    initGesture () {
      this.rendition.on('touchstart', event => {
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
    },
    initEpub () {
      const url =
        `${process.env.VUE_APP_RES_URL}/epub/` + this.fileName + '.epub'
      this.book = new Epub(url)
      this.setCurrentBook(this.book)
      this.initRendition()
      this.initGesture()
      this.book.ready.then(() => {  //分页
        return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
      }).then(locations => {
        /* 分页完成后调用 */
        this.setBookAvailable(true)
        this.refreshLocation()
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
@import "../../assets/styles/global.scss";
iframe {
  body {
    padding-left: 0 !important;
  }
}
</style>
