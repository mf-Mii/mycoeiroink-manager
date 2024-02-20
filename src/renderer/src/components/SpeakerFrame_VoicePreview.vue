<script setup lang="ts">

</script>

<template>
  <div class="speaker_frame_style_controller_voicePlayer">
    <button class="speaker_frame_style_controller_voicePlayer_btn" v-for="voice in this.selectedStyle.voices" :key="voice.name" @click="playBtnClick(voice)">
      <svg class="ico_play" v-if="voice.name !== this.playingVoice">
        <use xlink:href="/src/assets/img/icon/play.svg#play" />
      </svg>
      <svg class="ico_stop" v-else>
        <use xlink:href="/src/assets/img/icon/stop.svg#stop" />
      </svg>
    </button>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/css/theme";
.speaker_frame_style_controller_voicePlayer {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 10px;
  .speaker_frame_style_controller_voicePlayer_btn {
    appearance: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid $theme-color-light;
    background: $theme-color-bg-lighter;
    cursor: pointer;
    transition: .3s;
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
      fill: $theme-color-light;
      transition: .3s;
      display: block;
      /*
      &.ico_stop {
        display: none;
      }
      &.ico_play {
        display: block;
      }

       */
    }
  }
}
</style>
<script lang="ts">

import {IStyle, IVoice} from "../interfaces/Speaker";

let audioContext: AudioContext;
let audioSource: AudioBufferSourceNode;

async function getFileBufferArray(path: string) {
  if (path === null) {
    return null;
  }
  if (path.startsWith("file://")) {
    path = path.replace("file://", "");
    return await window.ipcBridge.FILE_READ(path);
  } else if (path.startsWith("data:")){
    const base64 = path.split(",")[1];
    const bin = atob(base64);
    const buffer = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) {
      buffer[i] = bin.charCodeAt(i);
    }
    return buffer.buffer;
  } else {
    // HTTP,HTTPS
    return await fetch(path).then((res) => {
      return res.arrayBuffer();
    });
  }
}

async function playVoice(voice: IVoice) {
  if (audioContext === undefined) {
    audioContext = new AudioContext();
  } else {
    await audioContext.close();
    audioContext = new AudioContext();
  }
  const buffer = await getFileBufferArray(voice.url);
  const decodedData = await audioContext.decodeAudioData(buffer)
  audioSource = audioContext.createBufferSource();
  audioSource.buffer = decodedData;
  audioSource.connect(audioContext.destination);
  audioSource.start(0);
}

function stopVoice() {
  if (audioContext !== undefined) {
    audioContext.close();
    audioContext = undefined;
  }
}
export default {
  props: {
    selectedStyle: <IStyle>{}
  },
  data() {
    return {

      /**
       * 再生中の音声のファイル名
       */
      playingVoice: null
    }
  },
  methods: {
    async playBtnClick(voice: IVoice) {
      console.log(voice);
      if (this.playingVoice === voice.name) {
        this.playingVoice = null;
        stopVoice();
      } else {
        this.playingVoice = voice.name;
        await playVoice(voice);
        console.log("再生開始")
        audioSource.onended = () => {
          console.log("再生終了")
          this.playingVoice = null;
        }
        console.log("再生終了イベント登録")
      }
    }
  }
};
</script>
