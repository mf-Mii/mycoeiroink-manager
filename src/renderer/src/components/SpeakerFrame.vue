<script setup lang="ts">

import SpeakerFrame_Styles from "./SpeakerFrame_Styles.vue";
import SpeakerFrame_Links from "./SpeakerFrame_Links.vue";
</script>

<template>
  <div class="speaker_frame">
    <div class="speaker_frame_thumb">
      <img ref="thumb_img" :src="speaker?.portrait ?? '/src/assets/img/no_icon.png'" alt="" />
    </div>
    <div class="speaker_frame_info">
      <span class="speaker_frame_name">{{ speaker?.name }}</span>
      <div class="speaker_frame_detail">
        <div class="speaker_frame_detail_texts">
          <div class="speaker_frame_detail_text">バージョン: <span>{{ speaker?.version ?? 'なし' }}</span></div>
          <div class="speaker_frame_detail_text">ID: <span>{{ speaker?.id }}</span></div>
        </div>
        <div class="speaker_frame_notifies">
          <span class="speaker_frame_notify_update"><i />更新可能</span>
          <span class="speaker_frame_notify_notinstall"><i />未インストール</span>
          <span class="speaker_frame_notify_manually_update"><i />手動更新</span>
        </div>
      </div>
      <SpeakerFrame_Styles :styles="speaker.styles" />
      <SpeakerFrame_Links :speaker="speaker" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/css/theme";
.speaker_frame {
  background: #fff;
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  .speaker_frame_thumb {
    width: 100%;
    min-height: 200px;
    height: 32.5%;
    border-radius: 10px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
    }
  }
  .speaker_frame_info {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    //height: calc(100% - 200px);
    overflow-x: hidden;
    .speaker_frame_name {
      font-size: 1.5rem;
      color: $theme-color-text-dark;
      font-weight: bolder;
      display: block;
      margin-left: 10px;
      text-align: left;
    }
    .speaker_frame_detail {
      color: $theme-color-text;
      > div {
        margin: 10px 0;
      }
      .speaker_frame_detail_texts {
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        font-size: 12px;
        .speaker_frame_detail_text {
          user-select: none;
          display: flex;
          flex-direction: row;
          span {
            margin-left: 5px;
            color: $theme-color-text-dark;
            user-select: text;
          }
        }
      }
      .speaker_frame_notifies {
        font-size: 14px;
        > span {
          display: inline-block;
          margin: 0 5px;

          > i {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 5px;
            margin-right: 5px;
          }

          &.speaker_frame_notify_update > i {
            background: $theme-color-warning;
          }

          &.speaker_frame_notify_manually_update > i {
            background: $theme-color-text-light;
          }

          &.speaker_frame_notify_notinstall > i {
            background: $theme-color-info;
          }
        }
      }
    }
  }
}
</style>
<script lang="ts">
import {marked} from "marked";
import {ISpeaker} from "../interfaces/Speaker";
export default {
  name: "SpeakerFrame",
  props: {
    speaker: <ISpeaker>{}
  },
  data() {
    return {};
  },
  computed: {
    speakerPolicyMarkdown() {
      return marked.parse(this.speaker?.policy ?? "この話者はポリシーを持っていません。");
    },
  },
  filters: {
    marked: marked
  }
};
</script>
