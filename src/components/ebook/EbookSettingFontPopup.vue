<!--  -->
<template>
<transition name="popup-slide-up">
    <div class="ebook-popup-list" v-show="fontFamilyVisible">
    <div class="ebook-popup-title">
        <div class="ebook-popup-title-icon" @click="hide">
            <span class="icon-down2"></span>
        </div>
        <span class="ebook-popup-title-text">选择字体</span>
    </div>
    <div class="ebook-popup-list-wrapper">
      <div class="ebook-popup-item" 
        v-for="(item,index) in fontFamilyList" 
        :key="index" @click="setFintFamily(item.font)">
        <div class="ebook-popup-item-text" 
          :class="{'selected':isSelected(item)}"
          >{{item.font}}</div>
        <div class="ebook-popup-item-check" 
          v-if="isSelected(item)">
          <span class="icon-check"></span>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import { setLocalStorage, getLocalStorage, removeLocalStorage, clearLocalStorage} from '../../utils/localStorage.js'
import { FONT_FAMILY } from '../../utils/book.js'
import { ebookMixin }  from '../../utils/mixin.js'
export default {
  mixins: [ebookMixin],
  data () {
    return {
      fontFamilyList: FONT_FAMILY
    }
  },
  methods: {
      isSelected (item) {
        return this.defaultFontFamily === item.font
      },
      hide () {
        this.setFontFamilyVisible(false)
      },
      setFintFamily (font) {
        this.setDefaultFontFamily(font)
        if(font === 'Default') {
          font ='Times New Roman'
        }
        this.currentBook.rendition.themes.font(font)
      }
  },
  mounted () {
    setLocalStorage (this.fileName, this.defaultFontFamily)
    // console.log(getLocalStorage(this.fileName))
    // removeLocalStorage(this.fileName)
    // clearLocalStorage()
  }
}

</script>
<style lang='scss' rel='stylesheet/scss' scoped>
  @import '../../assets/styles/global.scss';
  .ebook-popup-list {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 900;
    width: 100%;
    background: #fff;
    box-shadow: 0 px2rem(-4) px2rem(6) rgba(0, 0, 0, .1);
    .ebook-popup-title {
      position: relative;
      padding: px2rem(15);
      box-sizing: border-box;
      border-bottom: px2rem(1) solid #b8b9bb;
      text-align: center;
      @include center;
      .ebook-popup-title-icon {
        position: absolute;
        left: px2rem(15);
        top: 0;
        height: 100%;
        font-size: px2rem(18);
        font-weight: bold;
        @include center;
      }
      .ebook-popup-title-text {
        font-size: px2rem(14);
        font-weight: bold;
      }
    }
    .ebook-popup-list-wrapper {
      .ebook-popup-item {
        display: flex;
        padding: px2rem(15);
        .ebook-popup-item-text {
          flex: 1;
          font-size: px2rem(14);
          text-align: left;
          &.selected {
            color: #346cb9;
            font-weight: bold;
          }
        }
        .ebook-popup-item-check {
          font-weight: bold;
          font-size: px2rem(14);
          flex: 1;
          text-align: right;
          color: #346cb9;
        }
      }
    }
  }
</style>
