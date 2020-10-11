<template>
  <div class="content">
    <h1>カルーセル</h1>
    <div>
      <div class="carousel__slide">
        <div
          v-for="(picture, index) in pictures"
          :key="picture.id"
          class="carousel__slide-img"
        >
          <transition :name="style">
            <img
              v-if="index === displayImg"
              :src="`https://picsum.photos/id/${picture.id}/600/200`"
              alt="picture.id"
            >
          </transition>
        </div>
      </div>
      <div class="carousel__btns">
        <button class="button" @click="prev">prev</button>
        <div>
          <span
            v-for="(number, index) in pictures.length"
            :key="index"
            class="carousel__pointer"
            :class="{'active': index === displayImg}"
            @click="switchImg(index)"
          >●</span>
        </div>
        <button class="button" @click="next">next</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      displayImg: 0,
      style: '',
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
    next() {
      if (this.displayImg >= this.pictures.length - 1) {
        this.displayImg = 0;
      } else {
        this.displayImg++;
      }
      this.style = 'slide-right';
    },
    prev() {
      if (this.displayImg === 0) {
        this.displayImg = this.pictures.length - 1;
      } else {
        this.displayImg--;
      }
      this.style = 'slide-left';
    },
    switchImg(index) {
      this.displayImg = index;
      this.style = 'slide-right';
    }
  },
  mounted() {
    const timerId = setInterval(this.next, 3000);
  }
}
</script>

<style lang="scss">
.carousel__slide {
  position: relative;
  height: 200px;
}
.carousel__slide-img {
  position: absolute;
  height: 200px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  & > img {
    display: block;
    height: 100%;
    margin: 0 auto;
  }
}
.carousel__btns {
  display: flex;
  justify-content: space-between;
}
.carousel__pointer {
  color: #888;
  &.active {
    color: #333;
  }
}

.slide-right-leave-active,
.slide-right-enter-active,
.slide-left-leave-active,
.slide-left-enter-active {
  transition: 1s ease-in-out;
}
.slide-right-enter,
.slide-left-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.slide-right-leave-to,
.slide-left-enter {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
