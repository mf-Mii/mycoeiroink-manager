<script setup lang="ts">
</script>

<template>
  <div class="main_frame_characters">
    <MainFrame_ViewType />
    <div class="characters_list_container">
      <ul :class="'listType_'+(viewType?viewType:'list')">
        <li v-for="speaker in speakers" :key="speaker.id">
          <div :class="{'character': true, 'selected': speaker.id === this.$parent.$parent.selectedSpeaker.id}" v-if="speaker.styles.length" @click="selectSpeaker(speaker)">
            <div class="character_image">
              <img :src="speaker.portrait" alt="">
            </div>
            <div class="character_info">
              <span class="character_name">{{speaker.name}}</span>
              <div class="character_detail">
                <div class="character_detail_items">
                  <div class="character_detail_item">スタイル: <span v-for="style in sliceStyles(speaker.styles, (viewType?(viewType === 'list'?7:4):7))" :key="style.id">{{style.name}}, </span></div>
                </div>
                <div class="character_detail_notifies">
                  <span class="character_detail_notify_update"><i />更新可能</span>
                  <span class="character_detail_notify_notinstall"><i />未インストール</span>
                  <span class="character_detail_notify_manually_update"><i />手動更新</span>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/css/theme";
.main_frame_characters {
  display: block;
  .characters_list_container {
    margin: 10px 50px;
    display: block;

    ul {
      list-style: none;
      display: flex;
      padding: 0;

      &.listType_list {
        flex-direction: column;
        justify-content: space-between;
        margin: 10px 0;
        li {
          display: block;
          width: 100%;
          user-select: none;
          margin: 10px 0;

          .character {
            width: 100%;
            height: 80px;
            border-radius: 10px;
            display: flex;
            transition: .3s;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            &:hover {
              box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);
            }
            .character_image {
              height: 80px;
              width: 80px;
              background: $theme-color-bg-light;
              border-radius: 10px 0 0 10px;
              > img {
                height: 100%;
                width: 100%;
                border-radius: 10px 0 0 10px;
                top: 0;
                -webkit-user-drag: none;
                object-fit: cover;
                object-position: top;
                overflow: hidden;
              }
            }

            .character_info {
              padding: 5px 10px;
              width: calc(100% - 80px);
              background: $theme-color-bg-lighter;
              border-radius: 0 10px 10px 0;
              display: flex;
              flex-direction: column;
              .character_name {
                display: block;
                font-size: 20px;
                color: $theme-color-text-darker;
              }
              .character_detail {
                display: block;
                font-size: 13px;
                color: $theme-color-text-light;
                .character_detail_items {
                  display: flex;
                  flex-direction: column;
                  .character_detail_item {
                    display: block;
                    margin: 0;
                    > span {
                      color: $theme-color-text-darker;
                    }
                  }
                }
                .character_detail_notifies {
                  > span {
                    display: inline-block;
                    margin: 0 5px;
                    > i {
                      display: inline-block;
                      width: 10px;
                      height: 10px;
                      border-radius: 5px;
                      background: $theme-color-base;
                      margin-right: 5px;
                    }
                  }
                }
              }
            }
          }
        }
      }
      &.listType_grid {
        justify-content: center;
        flex-wrap: wrap;
        li {
          display: block;
          width: 300px;
          margin: 10px;
          user-select: none;

          .character {
            width: 100%;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            transition: .3s;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            &:hover {
              box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);
            }
            .character_image {
              height: 200px;
              width: 100%;
              background: $theme-color-bg-light;
              border-radius: 10px 10px 0 0;
              > img {
                width: 100%;
                height: 100%;
                -webkit-user-drag: none;
                object-fit: cover;
                object-position: top;
                border-radius: 10px 10px 0 0;
              }
            }

            .character_info {
              padding: 5px 10px;
              height: 100px;
              width: calc(100% - 20px);
              background: $theme-color-bg-lighter;
              border-radius: 0 0 10px 10px;
              display: flex;
              flex-direction: column;
              .character_name {
                display: block;
                font-size: 22px;
                color: $theme-color-text-darker;
              }
              .character_detail {
                height: 64px;
                display: flex;
                font-size: 13px;
                color: $theme-color-text-light;
                flex-direction: column;
                justify-content: space-between;
                .character_detail_items {
                  display: flex;
                  flex-direction: column;
                  .character_detail_item {
                    display: block;
                    margin: 0;
                    > span {
                      color: $theme-color-text-darker;
                    }
                  }
                }
              }
            }
          }
        }
      }
      li > .character {
        border: 2px solid transparent;
        > .character_info > .character_detail > .character_detail_notifies {
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

            &.character_detail_notify_update > i {
              background: $theme-color-warning;
            }

            &.character_detail_notify_manually_update > i {
              background: $theme-color-text-light;
            }

            &.character_detail_notify_notinstall > i {
              background: $theme-color-info;
            }
          }
        }
      }
      li > .character.selected {
        border: 2px solid $theme-color-dark;
        .character_info {
          background: $theme-color-lighter;
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
        }
      }
    }
  }
}
</style>
<script lang="ts">
import MainFrame_ViewType from "./MainFrame_ViewType.vue";
import {ISpeaker, IStyle} from "../interfaces/Speaker";

export default {
  name: "MainFrame_Speakers",
  components: {
    MainFrame_ViewType,
  },
  props: {
    speakers: {
      type: Array<ISpeaker>,
      default: [],
    },
  },
  data() {
    return {
      viewType: 'list',
      selectedSpeaker: <ISpeaker>{},
    }
  },
  methods: {
    sliceStyles(styles: Array<IStyle>, limit: number = 3): Array<IStyle> {
      return styles.slice(0, limit);
    },
    selectSpeaker(speaker: ISpeaker): void {
      this.$parent.$parent.selectedSpeaker = speaker;
    }
  },
  computed: {
  },
  mounted() {
    this.viewType = this.$data.viewType;
  },
}
</script>
