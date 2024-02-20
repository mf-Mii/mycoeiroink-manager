<script setup lang="ts">

</script>

<template>
<div class="speaker_frame_links">
  <div class="speaker_frame_links_buttonContainer">
    <button class="speaker_frame_links_button" :disabled="policy.content === null" @click="policy.isOpened = true">
      利用規約
      <svg>
        <use xlink:href="/src/assets/img/icon/open_browser.svg#open_browser" />
      </svg>
    </button>
    <button class="speaker_frame_links_button" :disabled="license.content === null" @click="license.isOpened = true">
      ライセンス
      <svg>
        <use xlink:href="/src/assets/img/icon/open_browser.svg#open_browser" />
      </svg>
    </button>
    <button class="speaker_frame_links_button" :disabled="distribution_url === null" @click="openLink(distribution_url)">
      配布ページ
      <svg>
        <use xlink:href="/src/assets/img/icon/open_link.svg#open_link" />
      </svg>
    </button>
    <button class="speaker_frame_links_button" :disabled="folder_path === null" @click="openPath(folder_path)">
      インストールフォルダ
      <svg>
        <use xlink:href="/src/assets/img/icon/open_folder.svg#open_folder" />
      </svg>
    </button>
  </div>
  <div class="modals">
    <ModalFrame v-if="policy.isOpened" @close="policy.isOpened = false" :title="policy.title" >
      <div v-html="policy.content" />
    </ModalFrame>
    <ModalFrame v-if="license.isOpened" @close="license.isOpened = false" :title="license.title" >
      <div v-html="license.content" />
    </ModalFrame>
  </div>
</div>
</template>

<style scoped lang="scss">
@import "../assets/css/theme";
.speaker_frame_links {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  .speaker_frame_links_buttonContainer {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    .speaker_frame_links_button {
      appearance: none;
      border-radius: 5px;
      border: 1px solid $theme-color-light;
      background: $theme-color-bg-lighter;
      cursor: pointer;
      transition: .3s;
      color: $theme-color-text;
      margin: 3px auto;
      &:disabled {
        opacity: .5;
        cursor: not-allowed;
        &:hover {
          background: $theme-color-bg-lighter;
          color: $theme-color-text;
          > svg {
            fill: $theme-color-text;
          }
        }
      }
      &:hover {
        background: $theme-color-light;
        color: $theme-color-bg-lighter;
        > svg {
          fill: $theme-color-bg-lighter;
        }
      }
      > svg {
        width: 24px;
        height: 24px;
        fill: $theme-color-text;
        transition: .3s;
        display: inline;
        // 上下中央
        vertical-align: middle;
        scale: calc(18 / 24);
      }
    }
  }
}
</style>
<script lang="ts">
import { defineComponent, ref } from "vue";
import ModalFrame from "./ModalFrame.vue";
import {marked} from "marked";
import {ISpeaker} from "../interfaces/Speaker";
export default defineComponent({
  name: "SpeakerFrame_Links",
  components: {
    ModalFrame
  },
  props: {
    speaker: {
      type: Object as () => ISpeaker,
    },
  },
  data() {
    return {
      policy: {
        title: "利用規約",
        content: null,
        isOpened: false
      },
      license: {
        title: "ライセンス",
        content: null,
        isOpened: false
      },
      distribution_url: null,
      folder_path: null
    }
  },
  methods: {
    openLink(url:string) {
      window.ipcBridge.OPEN_LINK(url);
    },
    openPath(path:string) {
      window.ipcBridge.OPEN_PATH(path);
    }
  },
  beforeMount() {
    this.policy.content = marked.parse(this.speaker?.policy ?? "この話者はポリシーを持っていません。");
    this.license.content = marked.parse(this.speaker?.license?.replaceAll('\n', '\n\n') ?? "この話者はライセンスを持っていません。");
    this.distribution_url = this.speaker?.distribution_page ?? null;
    this.folder_path = this.speaker?.folder_path ?? null;
  },
  beforeUpdate() {
    this.policy.content = marked.parse(this.speaker?.policy ?? "この話者はポリシーを持っていません。");
    this.license.content = marked.parse(this.speaker?.license?.replaceAll('\n', '\n\n') ?? "この話者はライセンスを持っていません。");
    this.distribution_url = this.speaker?.distribution_page ?? null;
    this.folder_path = this.speaker?.folder_path ?? null;
  },
});

</script>
