<template lang="html">
  <div class="journalists-card">
    <div class="journalist-card-head">
      <div class="journalist-card-image">
        <img v-if="journalist?.image" :src="journalist?.image" alt="" />
        <img v-else src="@/assets/images/journalist.png" alt="" />
      </div>
      <div class="journalist-card-title">
        <h4>{{ journalist?.full_name }}</h4>
        <nuxt-link :to="localePath(`/journalists/${journalist?.id}`)"
          >Batafsil <span v-html="dropdown"></span
        ></nuxt-link>
      </div>
    </div>
    <div class="journalist-card-info">
      <p>
        <span v-if="journalist?.work_place"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g id="off-23-suitcase-bag-portfolio-office-tool-work-stationery.1.svg">
              <path
                id="Vector"
                d="M15.5714 5.71429C15.5714 4.74286 14.8286 4 13.8571 4H10.4286C9.45714 4 8.71429 4.74286 8.71429 5.71429V6.28571H3V11.9429L3.57143 12V20H20.7143V12L21.2857 11.9429V6.28571H15.5714V5.71429ZM9.85714 5.71429C9.85714 5.37143 10.0857 5.14286 10.4286 5.14286H13.8571C14.2 5.14286 14.4286 5.37143 14.4286 5.71429V6.28571H9.85714V5.71429ZM19.5714 18.8571H4.71429V12.1714L11.5714 13.0857V14.2857H12.7143V13.0857L19.5714 12.1714V18.8571ZM20.1429 7.42857V10.9143L12.7143 11.8857V10.8H11.5714V11.8857L4.14286 10.9143V7.42857H20.1429Z"
                fill="#707070"
              />
            </g></svg
        ></span>
        Ish joyi: <span>{{ journalist?.work_place }}</span>
      </p>
      <p v-if="journalist?.experience">
        <span v-html="target"></span>Tajribasi: <span>{{ journalist?.experience }}</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["journalist"],
  data() {
    return {
      dropdown: require("../../assets/svg/dropdown.svg?raw"),
      target: require("../../assets/svg/target.svg?raw"),
    };
  },
};
</script>
<style lang="css">
.journalists-card {
  border-radius: 16px;
  background: var(--black_111111, #f9f9f9);
  padding: 24px;
}
.journalist-card-head {
  display: grid;
  grid-template-columns: 130px auto;
  grid-gap: 24px;
}
.journalist-card-image {
  width: 100%;
  height: 130px;
  border-radius: 50%;
  overflow: hidden;
}
.journalist-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.journalist-card-title h4 {
  color: var(--white_ffffff, #000);
  font-size: 19px;
  font-family: var(--ROBOTO_SERIF);
  font-weight: 600;
  line-height: 170%;
}
.journalist-card-title a {
  color: var(--light-bue-80, #34a8ff);
  font-size: 16px;
  font-family: var(--ROBOTO_SERIF);
  font-weight: 500;
  line-height: 130%;
  display: flex;
  align-items: center;
  margin-top: 9.5px;
}
.journalist-card-title a span svg {
  transform: rotate(-90deg);
  height: 24px;
  width: 13px;
  margin-left: 6px;
}
.journalist-card-title a span {
  display: flex;
  align-items: center;
}
.journalist-card-title a span svg path {
  fill: #34a8ff;
}
.journalist-card-info {
  margin-top: 28px;
}
.journalist-card-info p {
  color: var(--black-50, #707070);
  font-size: 12px;
  font-family: var(--ROBOTO_SERIF);
  font-weight: 500;
  line-height: 130%;
}
.journalist-card-info p span {
  color: var(--white_ffffff, #292929);
  font-size: 14px;
  line-height: 150%;
  margin-right: 6px;
}
.journalist-card-info p span:last-child {
  margin-left: 6px;
}
@media (max-width: 360px) {
  .journalists-card {
    padding: 15px;
  }
  .journalist-card-image {
    height: 87px;
  }
  .journalist-card-head {
    display: grid;
    grid-template-columns: 87px auto;
    grid-gap: 20px;
  }
  .journalist-card-info {
    display: none;
  }
  .journalist-card-title h4 {
    font-size: 16px;
    font-weight: 500;
    line-height: 130%;
  }
  .journalist-card-title a {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 130%;
  }
  .journalist-card-title {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 20px;
  }
}
</style>
