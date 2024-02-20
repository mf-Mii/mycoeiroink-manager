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
          <span>設定</span>
        </div>
      </div>
      <div class="modal_frame_content">
        <table>
          <tbody>
            <tr>
              <th>UIの言語</th>
              <td>
                <div class="select_button_container">
                  <button class="select_button" data-selected="true">日本語</button>
                  <button class="select_button">English</button>
                </div>
              </td>
            </tr>
            <tr>
              <th>ボイスの自動更新</th>
              <td>
                <div class="select_button_container">
                  <button class="select_button" data-selected="true">有効</button>
                  <button class="select_button">無効</button>
                </div>
              </td>
            </tr>
            <tr>
              <th>ボイスの自動更新間隔</th>
              <td>
                <div class="input_container">
                  <input type="number" min="1" max="60" value="1" />
                  <div class="select_button_container">
                    <button class="select_button" data-selected="true">分</button>
                    <button class="select_button">時間</button>
                    <button class="select_button">日</button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/css/theme";
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
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 18px;
        color: $theme-color-text;
        th {
          width: 30%;
          padding: 10px;
          font-weight: normal;
          text-align: left;
        }
        td {
          width: 70%;
          padding: 10px;
          text-align: right;
          .input_container {
            display: inline-block;
            flex-direction: row;
            justify-content: flex-end;
            margin: 0 5px;
            input {
              width: 100px;
              height: 30px;
              border: 2px solid $theme-color-light;
              border-radius: 5px;
              outline: none;
              background: $theme-color-bg-lighter;
              padding: 0 10px;
              font-size: 16px;
              color: $theme-color-text-dark;
              text-align: right;
              transition: .3s;
              &:hover {
                background: $theme-color-lighter;
              }
              &:focus {
                background: $theme-color-lighter;
              }
              &[data-disabled="true"] {
                opacity: .5;
                cursor: not-allowed;
                &:hover {
                  background: $theme-color-bg-lighter;
                  color: $theme-color-text;
                }
              }
            }
          }
          .select_button_container {
            display: inline-block;
            flex-direction: row;
            justify-content: flex-end;
            margin: 0 5px;
            .select_button {
              font-size: 16px;
              appearance: none;
              border: 2px solid $theme-color-light;
              border-right: none;
              border-left: none;
              outline: none;
              background: $theme-color-bg-lighter;
              padding: 5px 20px;
              cursor: pointer;
              transition: .3s;
              color: $theme-color-text-dark;
              line-height: 20px;
              &:hover {
                background: $theme-color-lighter;
              }
              &:first-child {
                border-radius: 5px 0 0 5px;
                border-left: 2px solid $theme-color-light;
              }
              &:last-child {
                border-radius: 0 5px 5px 0;
                border-right: 2px solid $theme-color-light;
              }
              &[data-selected="true"] {
                background: $theme-color-light;
              }
            }
            &[data-disabled="true"] {
              opacity: .5;
              cursor: not-allowed;
              .select_button{
                &[data-selected="true"]:hover {
                  background: $theme-color-light;
                }
                &:hover {
                  background: $theme-color-bg-lighter;
                  color: $theme-color-text;
                }
              }
            }
          }
        }
      }
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
  name: "MainFrame_SettingsModal",
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
