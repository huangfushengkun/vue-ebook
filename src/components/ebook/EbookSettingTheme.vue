<!--  -->
<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible === 1">
      <div class="setting-theme">
        <div
          class="setting-theme-item"
          v-for="(item, index) in themeList"
          :key="index"
          @click="setTheme(index)"
        >
          <div
            class="preview"
            :class="{'selected': item.name === defaultTheme}"
            :style="{background: item.style.body.background}"
          ></div>
          <div class="text" :class="{'selected': item.name === defaultTheme}">{{item.alias}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from '@/utils/mixin'
// import { realPx } from '../../utils/untils.js'
import { saveTheme } from '../../utils/localStorage'
// import { themeList } from '../../utils/book'
export default {
  mixins: [ebookMixin],
  // computed: {
  //   themeList () {
  //     return themeList(this)
  //   }
  // },
  methods: {
    setTheme (index) {
      const theme = this.themeList[index]
      this.setDefaultTheme(theme.name).then(() => {
        this.currentBook.rendition.themes.select(this.defaultTheme)
        this.initGlobalStyle()
      })
      //主题保存到本地
      saveTheme(this.fileName, theme.name)
    }
  }
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
@import "../../assets/styles/global.scss";
.setting-wrapper {
  background-color: #ffffff;
  position: absolute;
  bottom: px2rem(48);
  left: 0;
  z-index: 190;
  width: 100%;
  height: px2rem(90);
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  .setting-theme {
    height: 100%;
    display: flex;
    .setting-theme-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: px2rem(5);
      box-sizing: border-box;
      .preview {
        flex: 1;
        border: px2rem(1) solid #ccc;
        box-sizing: border-box;
        border: none;
        &.selected {
          box-shadow: 0 px2rem(4) px2rem(6) 0 rgba(0, 0, 0, 0.1);
          // border: px2rem(2) solid #5e6369;
        }
      }
      .text {
        color: #cccccc;
        flex: 0 0 px2rem(20);
        font-size: px2rem(14);
        @include center;
        &.selected {
          color: #5e6369;
        }

      }
    }
  }
}
</style>
