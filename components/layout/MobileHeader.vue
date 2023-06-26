<template>
  <div class="wrap">
    <div class="position-relative">
      <div class="top">
        <a href="" target="_blank">
          <img class="banner" src="@/assets/images/header.jpg" alt="" />
        </a>
      </div>
      <div class="container">
        <div class="bottom">
          <div class="left">
            <NuxtLink to="/">
              <img src="@/assets/images/logo/brand.svg" alt="" />
            </NuxtLink>
          </div>
          <div class="right">
            <button class="butn">
              <img src="@/assets/images/search.svg" alt="" />
            </button>
            <button class="butn">
              <img src="@/assets/images/person.svg" alt="" />
            </button>
            <button class="butn" @click="drawerVisible = !drawerVisible">
              <span v-html="menu" v-if="!drawerVisible"></span>
              <span v-else
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g id="close-line">
                    <path
                      id="Vector"
                      d="M10 8.66671L14.6667 4L16 5.33333L11.3334 10L16 14.6667L14.6667 16L10 11.3334L5.33333 16L4 14.6667L8.66671 10L4 5.33333L5.33333 4L10 8.66671Z"
                      fill="#6974A5"
                    />
                  </g></svg
              ></span>
            </button>
          </div>
        </div>
      </div>
      <div class="drawer_menu" :class="{ 'h-100vh': drawerVisible }">
        <div>
          <div class="drawer_menu-body">
            <div
              v-for="category in categories"
              :key="category?.id"
              class="home-page-right-drop home-page-right-drop-mobile"
              :class="{ heightAuto: dropVal == category?.id }"
            >
              <h5 v-if="category?.children?.length > 0" @click="dropAction(category?.id)">
                {{ category?.title }}
                <span
                  v-html="dropdown"
                  :class="{ rotate180: dropVal == category?.id }"
                ></span>
              </h5>
              <!-- <Transition name="bounceDrop"> -->
              <div
                class="home-page-right-drop-board"
                :class="{ disabled: dropVal !== category?.id }"
                v-if="category?.children?.length > 0"
              >
                <ul>
                  <li
                    v-for="(child, index) in category?.children"
                    :key="index"
                    @click="$router.push(localePath(`/news-menu/${child?.slug}`))"
                  >
                    {{ child?.title }}
                  </li>
                </ul>
              </div>
              <nuxt-link v-else :to="localePath(`/news-menu/${category?.slug}`)">
                {{ category?.title }}</nuxt-link
              >
              <!-- </Transition> -->
            </div>
          </div>
          <div class="drawer_lang">
            <ul>
              <li
                :class="{ 'active-lang': $i18n.locale == 'ru' }"
                @click="$router.push(switchLocalePath('ru'))"
              >
                Русский
              </li>
              <li
                :class="{ 'active-lang': $i18n.locale == 'oz' }"
                @click="$router.push(switchLocalePath('oz'))"
              >
                Uzbek
              </li>
              <li
                :class="{ 'active-lang': $i18n.locale == 'uz' }"
                @click="$router.push(switchLocalePath('uz'))"
              >
                English
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["categories"],
  data() {
    return {
      dropVal: false,
      drawerVisible: false,
      dropdown: require("../../assets/svg/dropdown.svg?raw"),
      menu: require("../../assets/svg/menu.svg?raw"),
    };
  },
  computed: {
    routerName() {
      return this.$route.path;
    },
  },
  methods: {
    dropAction(val) {
      console.log(":asdasdasds");
      if (val != this.dropVal) {
        this.dropVal = val;
      } else {
        this.dropVal = false;
      }
    },
  },
  watch: {
    drawerVisible() {
      console.log(this.$route.path);
    },
    "$route.path"() {
      this.drawerVisible = false;
      console.log("asdasdas");
    },
  },
};
</script>

<style scoped>
@import "../../assets/css/pages/home-page.css";
.heightAuto {
  max-height: 500px !important;
  transition: max-height 0.4s ease-in !important;
}
.wrap {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  background: white;
}
.banner {
  width: 100%;
}
.bottom {
  padding: 16px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.right {
  display: flex;
  align-items: center;
  gap: 8px;
}
.bottom .butn {
  border-radius: 6px;
  border: 0.75px solid var(--dark-blue-10, #e6e8f0);
  background: #fff;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
}
.drawer_menu {
  position: absolute;
  width: 100%;
  height: 0;
  background: #fff;
  padding: 0;
  transition: 0.3s;
  overflow: hidden;
}
.drawer_menu-body {
  padding: 20px;
}
.h-100vh {
  height: 100vh !important;
}
@media screen and (max-width: 1024px) {
  .wrap {
    display: block;
    z-index: 1000;
  }
  .home-page-right-drop-mobile {
    background: transparent;
    padding: 10px;
    border: none;
    max-height: 40px;
  }
  .home-page-right-drop-mobile .home-page-right-drop-board ul li {
    padding: 10px;
    margin-bottom: 8px;
  }
  .home-page-right-drop-mobile .home-page-right-drop-board ul li:last-child {
    margin-bottom: 0;
  }
  .home-page-right-drop-mobile .home-page-right-drop-board {
    margin-top: 0px;
    padding-top: 4px;
  }
  .home-page-right-drop-mobile .home-page-right-drop-board ul {
    margin-left: 16px;
  }
  .home-page-right-drop-mobile a {
    font-family: var(--ROBOTO_SERIF);
    font-size: 14px;
    line-height: 130%;
    text-transform: uppercase;
    color: #828bb4;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }
  .home-page-right-drop-mobile h5 {
    color: #828bb4;
  }
  .home-page-right-drop-mobile span svg path {
    fill: #828bb4 !important;
  }
  .drawer_lang {
    margin-top: 30px;
    padding-top: 24px;
    padding-right: 19px;
    padding-left: 19px;
    padding-bottom: 24px;
    border-top: 1px solid var(--black-5, #e7e7e7);
    border-bottom: 1px solid var(--black-5, #e7e7e7);
  }
  .drawer_lang ul {
    display: flex;
    justify-content: space-between;
  }
  .drawer_lang ul li {
    border-radius: 72px;
    border: 1px solid var(--light-grey-2, #f5f5f7);
    padding: 8px 16px;
    color: var(--black, #020105);
    font-size: 16px;
    font-family: var(--ROBOTO_SERIF);
    line-height: 150%;
  }
  .active_lang {
    background: var(--white-grey-1, #f5f7fa);
    border: 1.5px solid var(--light-bue-100, #0192ff);
    color: var(--light-bue-100, #0192ff);
  }
}
</style>
