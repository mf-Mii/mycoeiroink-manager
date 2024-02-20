<script setup lang="ts">

</script>

<template>
  <div class="modal_frame_container">
    <button @click="closeBtnClick" class="modal_frame_clsBtn">
      <svg>
        <use xlink:href="/src/assets/img/icon/close.svg#close" />
      </svg>
    </button>
    <div class="modal_frame">
      <div class="modal_frame_header">
        <div class="modal_frame_header_title">
          <span>{{ title }}</span>
        </div>
      </div>
      <div class="modal_frame_content">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal_frame_container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: #0006;
  transition: .3s;

  z-index: 999999;
  .modal_frame_clsBtn {
    position: absolute;
    right: 10px;
    top: 10px;
    appearance: none;
    border: none;
    background: none;
    cursor: pointer;
    filter: drop-shadow(0 0 5px #0006);
    > svg {
      width: 24px;
      height: 24px;
      fill: #fff;
      scale: 2;
    }
  }
  .modal_frame {
    margin: 50px auto;
    width: 80%;
    height: 80%;
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 10px #0006;
    display: flex;
    flex-direction: column;
    .modal_frame_header {
      width: 100%;
      height: 50px;
      background: #fff;
      border-bottom: 1px solid #0003;
      display: flex;
      align-items: center;
      .modal_frame_header_title {
        margin-left: 10px;
        font-size: 24px;
        font-weight: bold;
      }
    }
    .modal_frame_content {
      width: 100%;
      height: calc(100% - 50px);
      background: #fff;
      overflow-y: scroll;
      padding: 10px;
    }
  }
}
</style>
<style lang="scss">
@import "../assets/css/theme";
svg.open_link {
  width: 24px;
  height: 24px;
  fill: $theme-color-link;
  display: inline;
  // 上下中央
  vertical-align: middle;
  scale: calc(18 / 24);
  cursor: pointer;
}
</style>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ModalFrame",
  props: {
    title: {
      type: String,
      default: "タイトル"
    }
  },
  setup(props, { emit }) {
    const closeBtnClick = () => {
      emit("close");
    };
    return {
      closeBtnClick
    };
  },
  mounted() {
    document.querySelectorAll('a').forEach((el) => {
      el.setAttribute('target', '_blank');
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.classList.add('open_link');
      svg.innerHTML = '<use xlink:href="/src/assets/img/icon/open_link.svg#open_link" />';
      el.after(svg)
    });
  }
});
</script>
