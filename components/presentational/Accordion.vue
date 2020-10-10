<template>
  <div class="box has-background-light content">
    <a href="#" @click.prevent="toggle" class="accordion__title">
      <slot name="title"></slot>
      <div class="accordion__icon">
        <span class="icon" v-if="!isOpen">
          <fa :icon="['fas', 'angle-down']" />
        </span>
        <span class="icon" v-if="isOpen">
          <fa :icon="['fas', 'angle-up']" />
        </span>
      </div>
    </a>
    <transition
      name="accordion"
      @before-enter="beforeEnter"
      @enter="enter"
      @before-leave="beforeLeave"
      @leave="leave"
    >
      <div class="accordion__body" v-if="isOpen">
        <slot name="detail"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    beforeEnter(el) {
      el.style.height = '0';
    },
    enter(el) {
      el.style.height = el.scrollHeight + 'px';
    },
    beforeLeave(el) {
      el.style.height = el.scrollHeight + 'px';
    },
    leave(el) {
      el.style.height = '0';
    },
  },
}
</script>

<style lang="scss">
.accordion__title {
  position: relative;
  display: block;
}
.accordion__icon {
  position: absolute;
  top: 0;
  right: 0;
  .icon {
    transition: transform .3s ease-in-out;
  }
}
.accordion__body {
  overflow: hidden;
  transition: height .3s ease-in-out;
}
</style>
