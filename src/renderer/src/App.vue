<script setup lang="ts">
</script>

<template>
  <!--
  <Versions></Versions>

  <svg class="hero-logo" viewBox="0 0 900 300">
    <use xlink:href="./assets/icons.svg#electron" />
  </svg>
  <h2 class="hero-text">You've successfully created an Electron project with Vue and TypeScript</h2>
  <p class="hero-tagline">Please try pressing <code>F12</code> to open the devTool</p>

  <div class="links">
    <div class="link-item">
      <a target="_blank" href="https://electron-vite.org">Documentation</a>
    </div>
    <div class="link-item link-dot">•</div>
    <div class="link-item">
      <a target="_blank" href="https://github.com/alex8088/electron-vite">Getting Help</a>
    </div>
    <div class="link-item link-dot">•</div>
    <div class="link-item">
      <a
        target="_blank"
        href="https://github.com/alex8088/quick-start/tree/master/packages/create-electron"
      >
        create-electron
      </a>
    </div>
  </div>

  <div class="features">
    <div class="feature-item">
      <article>
        <h2 class="title">Configuring</h2>
        <p class="detail">
          Config with <span>electron.vite.config.ts</span> and refer to the
          <a target="_blank" href="https://electron-vite.org/config">config guide</a>.
        </p>
      </article>
    </div>
    <div class="feature-item">
      <article>
        <h2 class="title">HMR</h2>
        <p class="detail">
          Edit <span>src/renderer</span> files to test HMR. See
          <a target="_blank" href="https://electron-vite.org/guide/hmr.html">docs</a>.
        </p>
      </article>
    </div>
    <div class="feature-item">
      <article>
        <h2 class="title">Hot Reloading</h2>
        <p class="detail">
          Run <span>'electron-vite dev --watch'</span> to enable. See
          <a target="_blank" href="https://electron-vite.org/guide/hot-reloading.html">docs</a>.
        </p>
      </article>
    </div>
    <div class="feature-item">
      <article>
        <h2 class="title">Debugging</h2>
        <p class="detail">
          Check out <span>.vscode/launch.json</span>. See
          <a target="_blank" href="https://electron-vite.org/guide/debugging.html">docs</a>.
        </p>
      </article>
    </div>
    <div class="feature-item">
      <article>
        <h2 class="title">Source Code Protection</h2>
        <p class="detail">
          Supported via built-in plugin <span>bytecodePlugin</span>. See
          <a target="_blank" href="https://electron-vite.org/guide/source-code-protection.html">
            docs
          </a>
          .
        </p>
      </article>
    </div>
    <div class="feature-item">
      <article>
        <h2 class="title">Packaging</h2>
        <p class="detail">
          Use
          <a target="_blank" href="https://www.electron.build">electron-builder</a>
          and pre-configured to pack your app.
        </p>
      </article>
    </div>
  </div>
  -->
  <MainFrame />
  <SpeakerFrame :speaker="selectedSpeaker" />
</template>

<style lang="scss">
@import "assets/css/theme";
body {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  #app {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    > * {
      transition: .3s;
    }
    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
}
a {
  color: $theme-color-link;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
</style>

<script lang="ts">
import SpeakerFrame from "./components/SpeakerFrame.vue";
import MainFrame from "./components/MainFrame.vue";
import Config from "./interfaces/Config";
import {ISpeaker} from "./interfaces/Speaker";
export default {
  name: "App",
  components: {
    MainFrame,
    SpeakerFrame,
  },
  data() {
    return {
      isMenuOpen: false,
      config: <Config>{},
      selectedSpeaker: <ISpeaker>{},
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    loadConfig() {
      this.config = window.ipcBridge.CONFIG_LOAD();
    }
  },
  beforeMount() {
  },
  mounted() {
    this.loadConfig();
    if (document.querySelector('head > title')){
      // @ts-ignore
      //document.querySelector('head > title').innerHTML = 'MyCOEIROINK Manager v' + window.Electron.app.getVersion();
    }
  },
}
</script>
