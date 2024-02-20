<script setup lang="ts">

import ModalFrame from "./ModalFrame.vue";
import MainFrame_SettingsModal from "./MainFrame_SettingsModal.vue";
</script>

<template>
  <button type="button" class="setting_button" @click="isSettingModalOpen = true">
    <svg>
      <use xlink:href="/src/assets/img/icon/settings.svg#settings" />
    </svg>
  </button>
  <MainFrame_SettingsModal v-if="isSettingModalOpen" @close="isSettingModalOpen = false" />
  <form class="search_form">
    <input type="text" placeholder="検索"/>
    <button type="button" class="filter">
      <svg>
        <use xlink:href="/src/assets/img/icon/filter.svg#filter" />
      </svg>
    </button>
  </form>
</template>

<style scoped lang="scss">
@import "../assets/css/theme";

.setting_button {
  position: fixed;
  left: 10px;
  top: 10px;
  width: 40px;
  height: 40px;
  border: none;
  outline: none;
  background: #fff;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: #0008 0 0 10px;
  transition: .3s;
  z-index: 100;
  > svg {
    width: 24px;
    height: 24px;
    fill: $theme-color-text;
  }
}

.search_form {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 10px auto;
  border-bottom: 3px solid $theme-color-base;

  > input[type="text"] {
    width: 100%;
    height: 40px;
    border: none;
    outline: none;
    padding: 0 10px;
    font-size: 16px;
    border-radius: 10px 0 0 10px;
  }

  > button {
    width: 40px;
    height: 40px;
    border: none;
    outline: none;
    background: #fff;
    border-radius: 0 10px 10px 0;
    cursor: pointer;

    > svg {
      width: 24px;
      height: 24px;
      fill: $theme-color-text;
    }
  }
}
</style>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "MainFrame_SearchForm",
  data() {
    return {
      isSettingModalOpen: false,
    }
  },
  methods: {
  },
});
</script>
