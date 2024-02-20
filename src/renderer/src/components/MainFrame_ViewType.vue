<script setup lang="ts">

</script>

<template>
  <div class="view_types">
    <div class="container">
      <button :class="this.selected === 'list' ? 'selected':''" ref="btn_list" @click="selectList">
        <img src="/src/assets/img/icon/list.svg">
      </button>
      <button :class="this.selected === 'grid' ? 'selected': ''" ref="btn_grid" @click="selectGrid">
        <img src="/src/assets/img/icon/grid.svg">
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/css/theme";
.view_types {
  display: block;
  text-align: right;
  margin: 10px 50px;
  .container {
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));
    button {
      border: none;
      outline: none;
      background: #fff;
      width: 40px;
      height: 40px;
      border-radius: 10px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
      &:first-child {
        border-radius: 10px 0 0 10px;
      }
      &:last-child {
        border-radius: 0 10px 10px 0;
      }
      &.selected {
        background: $theme-color-light;
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
      }
    }
  }
}
</style>
<script>
export default {
  name: "MainFrame_ViewType",
  props: {
    selected: {
      type: String,
      default: "list",
      enum: ["list", "grid"],
    },
  },
  data() {
    return {
      selected: this.$props.selected,
    }
  },
  methods: {
    selectList() {
      this.selected = "list";
      this.$parent.viewType = "list";
      this.$refs.btn_grid.className = "selected";
      this.$refs.btn_list.className = "";
    },
    selectGrid() {
      this.selected = "grid";
      this.$parent.viewType = "grid";
      this.$refs.btn_list.classList.remove("selected");
      this.$refs.btn_grid.classList.add("selected");
    },
  },
  mounted() {

  },
  beforeUnmount() {

  },
}
</script>
