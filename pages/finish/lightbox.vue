<template>
  <div class="content">
    <h1>lightbox</h1>
    <div class="columns is-multiline">
      <div v-for="picture in pictures" :key="picture.id" class="column is-one-third">
        <a :href="`https://picsum.photos/id/${picture.id}/600/600`" @click.prevent="zoom">
          <img :src="`https://picsum.photos/id/${picture.id}/300/300`" :alt="`画像${picture.id}`">
        </a>
      </div>
    </div>
    <transition name="lightbox-fade">
      <div class="modal is-active" v-show="isShow">
        <div class="modal-background" @click="close"></div>
        <transition name="lightbox-slide" @after-leave="afterLeave">
          <div class="modal-content" v-show="isShow">
            <p class="image is-1by1">
              <img :src="src" alt="">
            </p>
          </div>
        </transition>
        <button class="modal-close is-large" aria-label="close" @click="close"></button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: null,
      isShow: false,
      pictures: [
        {id: '237'},
        {id: '238'},
        {id: '239'},
        {id: '240'},
        {id: '241'},
        {id: '242'},
        {id: '243'},
        {id: '244'},
        {id: '247'},
        {id: '248'},
      ]
    }
  },
  methods: {
    zoom(event) {
      this.src = event.currentTarget.getAttribute('href');
      this.isShow = true;
    },
    close() {
      this.isShow = false;
    },
    afterLeave() {
      this.src = null;
    }
  },
}
</script>

<style lang="scss">
.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity .5s ease;
}
.lightbox-fade-enter,
.lightbox-fade-leave-to {
  opacity: 0;
}

.lightbox-slide-enter-active,
.lightbox-slide-leave-active {
  transition: top .5s ease;
  top: 0;
}
.lightbox-slide-enter {
  top: -100px;
}
.lightbox-slide-leave-to {
  top: 300px;
}
</style>
