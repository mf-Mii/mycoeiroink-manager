<script setup lang="ts">

import SpeakerFrame_VoicePreview from "./SpeakerFrame_VoicePreview.vue";
</script>

<template>
  <div class="speaker_frame_styles">
    <img class="speaker_frame_style_icon" :src="this.selectedStyle?.icon ?? '/src/assets/img/no_icon.png'">
    <div class="speaker_frame_style_controller">
      <div :class="{'speaker_frame_style_select':1,'selecting':this.isSelecting}" @click="isSelecting = !isSelecting">
        {{ this.selectedStyle?.name ?? 'スタイルを選択' }}
        <div :class="{'speaker_frame_style_select_overlay':1 ,'selecting':this.isSelecting}">
          <span v-for="style in styles" :key="style.id" @click="selectStyle(style)" :class="{'selecting': selectedStyle?.id === style.id}">{{style.name}}</span>
        </div>
      </div>
      <SpeakerFrame_VoicePreview :selectedStyle="selectedStyle" />

    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/css/theme";
.speaker_frame_styles {
  width: calc(100% - 20px);
  background: $theme-color-bg;
  padding: 10px;
  border-radius: 20px;
  box-shadow: 0 0 10px #0003;
  display: flex;
  flex-direction: row;
  > img.speaker_frame_style_icon {
    width: 30%;
  }
  .speaker_frame_style_controller {
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    .speaker_frame_style_select {
      appearance: none;
      min-width: 100px;
      font-size: 0.85rem;
      outline: 2px solid $theme-color-light;
      background: $theme-color-bg-lighter;
      border-radius: 5px;
      padding: 3px 15px 3px 3px;
      user-select: none;
      cursor: pointer;
      transition: .3s;
      position: relative;
      &::after {
        content: "";
        display: inline-block;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 5px 5px 0 5px;
        border-color: $theme-color-light transparent transparent transparent;
        position: absolute;
        top: 50%;
        right: 5px;
        transform: translateY(-50%);
        margin-left: 10px;

      }
      &.selecting::after {
        border-width: 0 5px 5px 5px;
        border-color: transparent transparent $theme-color-light transparent;
      }
      .speaker_frame_style_select_overlay {
        position: absolute;
        top: 100%;
        left: 0;
        border-radius: 10px;
        //background: red;
        width: 100%;
        padding: 3px 0;
        border: 1px solid $theme-color-light;
        background: $theme-color-bg-lighter;

        display: none;
        &.selecting {
          display: block;
        }
        > span {
          display: block;
          padding: 3px 10px;
          cursor: pointer;
          transition: .3s;
          &:hover {
            background: $theme-color-light;
            color: $theme-color-bg-lighter;
          }
        }
      }
    }
  }
}
</style>
<script lang="ts">
import {IStyle,IVoice} from "../interfaces/Speaker";


export default {
  name: "SpeakerFrame_Styles",
  props: {
    styles: {
      type: Array<IStyle>,
      default: []
    }
  },
  data() {
    return {
      selectedStyle: <IStyle>{},
      isSelecting: false,
    }
  },
  methods: {
    selectStyle(style: IStyle) {
      this.selectedStyle = style;

    },
  },
  mounted() {
  },
  beforeUpdate() {
    let isExist = false;
    this.styles.forEach((style: IStyle) => {
      if (style.id === this.selectedStyle.id) {
        isExist = true;
      }
    });
    if (!isExist) {
      this.selectedStyle = <IStyle>{};
    }
  }
}
</script>
