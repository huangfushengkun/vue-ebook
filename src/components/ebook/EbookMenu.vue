<!-- EbookMenu -->
<template>
  <div class="meu-bar">
    <transition name="slide-up">
      <div class="menu-wrapper" :class="{'hide-box-shadow': settingVisible >= 0 || !menuVisible}"
          v-show="menuVisible">
        <div class="icon-wrapper" :class="{'selected': settingVisible === 3}">
          <span class="icon-menu" @click="showSetting(3)"></span>
        </div>
        <div class="icon-wrapper" :class="{'selected': settingVisible === 2}">
          <span class="icon-progress" @click="showSetting(2)"></span>
        </div>
        <div class="icon-wrapper" :class="{'selected': settingVisible === 1}">
          <span class="icon-bright" @click="showSetting(1)"></span>
        </div>
        <div class="icon-wrapper" :class="{'selected': settingVisible === 0}">
          <span class="icon-A" @click="showSetting(0)"></span>
        </div>
      </div>
    </transition>
    <ebook-setting-font></ebook-setting-font>
    <ebook-setting-font-popuo></ebook-setting-font-popuo>
    <ebook-setting-theme></ebook-setting-theme>
    <ebook-setting-progress></ebook-setting-progress>
  </div>
</template>

<script>
import EbookSettingFontPopuo from './EbookSettingFontPopup.vue'
import EbookSettingFont from './EbookSettingFont.vue'
import EbookSettingTheme from './EbookSettingTheme.vue'
import EbookSettingProgress from './EbookSettingProgress'
import { ebookMixin } from '../../utils/mixin.js'
export default {
  data () {
    return {
    }
  },
  mixins: [ebookMixin],
  components: {
    EbookSettingFont,
    EbookSettingFontPopuo,
    EbookSettingTheme,
    EbookSettingProgress
  },
  methods: {
    showSetting (key) {
      this.setSettingVisible(key)
    }
  }
}

</script>
<style lang='scss' rel='stylesheet/scss' scoped>
  @import '../../assets/styles/global.scss';
  .menu-wrapper {
    background-color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 200;
    display: flex;
    width: 100%;
    height: px2rem(48);
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    font-size: px2rem(22);
    &.hide-box-shadow {
      box-shadow: none;
    }
    .icon-wrapper {
      flex: 1;
      @include center;
      .icon-progress {
        font-size: px2rem(24);
      }
      .icon-A {
        font-size: px2rem(20);
      }
    }
  }
</style>
