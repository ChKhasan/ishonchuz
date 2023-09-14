<template>
  <div class="book-page">
    <div class="container_xl">
      <div class="book row mx-0">
        <div class="news-breadcrumb">
          <nuxt-link :to="localePath('/')"
            >{{ $store.state.translations["main.home"] }} <span v-html="dropdown"></span
          ></nuxt-link>
          <nuxt-link :to="localePath(`/library`)"
            >{{ $store.state.translations["main.libraries"]
            }}<span v-html="dropdown"></span
          ></nuxt-link>
          <nuxt-link :to="localePath('/')" style="pointer-events: none"
            >{{ book?.title }} <span v-html="dropdown"></span
          ></nuxt-link>
        </div>
      </div>
      <div class="book-info">
        <div class="book-image">
          <img v-if="book?.image" :src="book?.image" alt="" />
          <img v-else src="../../assets//images/Frame 92654237.png" alt="" />
        </div>
        <div class="book-body">
          <h3>{{ book?.title }}</h3>
          <a-rate
            :default-value="Number.parseInt(Number(book?.rating))"
            allow-half
            disabled
          />
          <p v-html="book?.short_desc"></p>
          <h5>{{ `${book?.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ") }} so’m</h5>
          <div class="book-btns">
            <div class="btn_container btn_container_primary">
              <div class="primary_btn">
                {{ $store.state.translations["main.buy"] }}
              </div>
              <div class="primary_btn" @click="visible = true">
                {{ $store.state.translations["main.buy"] }}
              </div>
            </div>
            <div
              class="btn_container btn_container_outline"
              v-if="!$store.state[book?.type]?.includes(book?.id)"
            >
              <div class="outline_btn">
                {{ $store.state.translations["main.save"] }}
              </div>
              <div class="primary_btn" @click="addToBasket(book)">
                {{ $store.state.translations["main.save"] }}
              </div>
              <Transition>
                <div class="primary_btn success_btn w-100" v-if="successBtn">
                  <span v-html="success"></span>
                </div>
              </Transition>
            </div>

            <div class="btn_container btn_container_outline" v-else>
              <div class="outline_btn">
                <span v-html="success"></span
                >{{ $store.state.translations["main.saved"] }}
              </div>
              <div @click="addToBasket(book)" class="primary_btn">
                <span v-html="deleteIcon"></span>
                {{ $store.state.translations["main.delete"] }}
              </div>
              <Transition>
                <div class="primary_btn success_btn" v-if="successBtn">
                  <span v-html="success"></span>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>

      <div class="book-desc">
        <h4>{{ $store.state.translations["inner.about-book"] }}</h4>
        <div v-html="book?.desc"></div>
      </div>
      <div class="comment-container-grid">
        <a-form-model ref="ruleFormComment" :model="form" :rules="rules">
          <div>
            <div class="comment-form">
              <h5>{{ $store.state.translations["news.leave_comment"] }}</h5>
              <a-form-model-item class="form-item mb-0 w-100" prop="full_name">
                <div>
                  <input
                    type="text"
                    v-model="form.full_name"
                    :placeholder="$store.state.translations['news.comment_input_place']"
                  />
                  <a-rate v-model="form.stars" />
                </div>
              </a-form-model-item>
              <a-form-model-item class="form-item mb-0 w-100" prop="text">
                <textarea
                  rows="5"
                  v-model="form.text"
                  :placeholder="$store.state.translations['news.comment_textarea_place']"
                ></textarea>
              </a-form-model-item>

              <div class="send-btn" @click="submit()">
                {{ $store.state.translations["news.leave_comment"] }}
              </div>
            </div>
          </div>
        </a-form-model>
        <div>
          <div class="general-assessment">
            <h5>{{ $store.state.translations["news.leave_comment"] }}</h5>
            <div class="main-rate">
              <a-rate
                :default-value="Number.parseInt(Number(book?.rating))"
                allow-half
                disabled
              /><span>{{ Number.parseInt(book?.rating) }}/5</span>
            </div>
            <div class="item-rate">
              <a-rate :default-value="5" disabled /><span
                ><p>{{ book?.rating_info["5"] }}</p></span
              >
            </div>
            <div class="item-rate">
              <a-rate :default-value="4" disabled /><span
                ><p>{{ book?.rating_info["4"] }}</p></span
              >
            </div>
            <div class="item-rate">
              <a-rate :default-value="3" disabled /><span
                ><p>{{ book?.rating_info["3"] }}</p></span
              >
            </div>
            <div class="item-rate">
              <a-rate :default-value="2" disabled /><span
                ><p>{{ book?.rating_info["2"] }}</p></span
              >
            </div>
            <div class="item-rate">
              <a-rate :default-value="1" disabled /><span
                ><p>{{ book?.rating_info["1"] }}</p></span
              >
            </div>
          </div>
          <div class="comments-list comments-mobile">
            <h4>
              {{ $store.state.translations["news.comments_title"] }} ({{
                book?.comments.length
              }})
            </h4>
            <div class="comments-grid" v-if="showAll">
              <CommentCard
                v-for="comment in book?.comments"
                :key="comment?.id"
                :comment="comment"
              />
            </div>
            <div class="comments-grid" v-else>
              <CommentCard
                v-for="comment in book?.comments.slice(0, 3)"
                :key="comment?.id"
                :comment="comment"
              />
            </div>
            <div
              class="show-more-count"
              @click="showAll = true"
              v-if="book?.comments.length > 3 && !showAll"
            >
              {{ $store.state.translations["news.see_again"] }} ({{
                book?.comments.length - 3
              }})
            </div>
          </div>
        </div>
      </div>
      <div class="comment-container-grid">
        <div class="comments-list comments-web">
          <h4>
            {{ $store.state.translations["news.comments_title"] }} ({{
              book?.comments.length
            }})
          </h4>
          <div class="comments-grid" v-if="showAll">
            <CommentCard
              v-for="comment in book?.comments"
              :key="comment?.id"
              :comment="comment"
            />
          </div>
          <div class="comments-grid" v-else>
            <CommentCard
              v-for="comment in book?.comments.slice(0, 3)"
              :key="comment?.id"
              :comment="comment"
            />
          </div>
          <div
            class="show-more-count"
            @click="showAll = true"
            v-if="book?.comments.length > 3 && !showAll"
          >
            {{ $store.state.translations["news.see_again"] }} ({{
              book?.comments.length - 3
            }})
          </div>
        </div>
      </div>
      <a-modal
        :body-style="{ padding: '0' }"
        v-model="visible"
        centered
        :closable="false"
        width="670px"
        @ok="handleOk"
      >
        <div class="vmodal-container">
          <div class="vmodal-header">
            <h2>To’lov uslubini tanlang</h2>
            <span @click="handleOk" v-html="mClose"></span>
          </div>
          <div class="vmodal-body buy__type__body">
            <p>To’lov miqdori</p>
            <h3>100 000 so’m</h3>
            <div class="buy__type">
              <div
                :class="{ buy__type__active: buyType == 'payme' }"
                @click="buyType = 'payme'"
              >
                <span></span>
                <img
                  v-if="$store.state.theme"
                  src="../../assets/images/payme-01 1.png"
                  alt=""
                />
                <img v-else src="../../assets/images/payme-light.png" alt="" />
              </div>
              <div
                :class="{ buy__type__active: buyType == 'click' }"
                @click="buyType = 'click'"
              >
                <span></span>
                <img
                  v-if="$store.state.theme"
                  src="../../assets/images/click-01 1.png"
                  alt=""
                />
                <img v-else src="../../assets/images/click-light.png" alt="" />
              </div>
              <div
                :class="{ buy__type__active: buyType == 'apelsin' }"
                @click="buyType = 'apelsin'"
              >
                <span></span>
                <img
                  v-if="$store.state.theme"
                  src="../../assets/images/apelsin-logo-light.2367a6d 1.png"
                  alt=""
                />
                <img
                  v-else
                  src="../../assets/images/apelsin-logo-light.2367a6d 2.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="vmodal-footer__book">
            <div class="auth-btn" @click="visibleError = true">To'lash</div>
            <div class="auth-btn__outline" @click="handleOk()">Bekor qilish</div>
          </div>
        </div>
      </a-modal>
      <a-modal
        :body-style="{ padding: '0' }"
        v-model="visibleSuccess"
        centered
        :closable="false"
        width="670px"
        @ok="handleOk"
      >
        <div class="vmodal-container">
          <div class="vmodal-header">
            <h2>To’lov uslubini tanlang</h2>
            <span @click="handleOk" v-html="mClose"></span>
          </div>
          <div class="vmodal-body buy__status__body">
            <span v-html="successBuy"> </span>
            <h1 class="buy_status__text">To’lovingiz muvaffaqiyatga amalga oshirildi</h1>
          </div>
          <div class="vmodal-footer">
            <div class="auth-btn w-100" @click="handleOk()">Bosh sahifaga qaytish</div>
          </div>
        </div>
      </a-modal>
      <a-modal
        :body-style="{ padding: '0' }"
        v-model="visibleError"
        centered
        :closable="false"
        width="670px"
        @ok="handleOk"
      >
        <div class="vmodal-container">
          <div class="vmodal-header">
            <h2>To’lov uslubini tanlang</h2>
            <span @click="handleOk" v-html="mClose"></span>
          </div>
          <div class="vmodal-body buy__status__body">
            <span v-html="errorBuy"> </span>
            <h1 class="buy_status__text">To’lovingiz muvaffaqiyatsiz amalga oshirildi</h1>
          </div>
          <div class="vmodal-footer">
            <div class="auth-btn w-100" @click="handleOk()">Bosh sahifaga qaytish</div>
          </div>
        </div>
      </a-modal>
    </div>
  </div>
</template>
<script>
import TitleComp from "../../components/Title-comp.vue";
import VNewsCard from "../../components/cards/VNewsCard.vue";
import RightNewsCard from "../../components/cards/RightNewsCard.vue";
import CommentCard from "../../components/cards/CommentCard.vue";

export default {
  name: "IndexPage",
  data() {
    return {
      visible: false,
      visibleSuccess: false,
      visibleError: false,
      showAll: false,
      buyType: "payme",
      mClose: require("../../assets/svg/modal-close.svg?raw"),
      successBuy: require("../../assets/svg/success_buy.svg?raw"),
      errorBuy: require("../../assets/svg/error_buy.svg?raw"),
      dropdown: require("../../assets/svg/dropdown.svg?raw"),
      success: require("../../assets/svg/success.svg?raw"),
      deleteIcon: require("../../assets/svg/delete-basket.svg?raw"),
      rules: {
        full_name: [
          {
            required: true,
            message: "This field is required",
            trigger: "blur",
          },
        ],
        text: [
          {
            required: true,
            message: "This field is required",
            trigger: "blur",
          },
        ],
      },
      successBtn: false,
      form: {
        full_name: "",
        text: "",
        book: null,
        stars: 0,
      },
    };
  },
  async mounted() {},
  async asyncData({ store, params, i18n }) {
    const [bookData] = await Promise.all([
      store.dispatch("fetchBooks/getBooksBySlug", {
        id: params.index,
        header: {
          headers: {
            Language: i18n.locale,
          },
        },
      }),
    ]);
    const book = bookData;
    return {
      book,
    };
  },
  computed: {
    rateSumm() {
      const summa =
        this.book?.rating_info["5"] * 5 +
        this.book?.rating_info["4"] * 4 +
        this.book?.rating_info["3"] * 3 +
        this.book?.rating_info["2"] * 2 +
        this.book?.rating_info["1"] * 1;
      return summa;
    },
  },
  methods: {
    handleOk() {
      this.visible = false;
      this.visibleSuccess = false;
      this.visibleError = false;
    },
    async __GET_BOOK() {
      const [newsData] = await Promise.all([
        this.$store.dispatch("fetchBooks/getBooksBySlug", {
          id: this.$route.params.index,
          header: {
            headers: {
              Language: this.$i18n.locale,
            },
          },
        }),
      ]);
      this.book = newsData;
    },
    submit() {
      this.form.book = this.book.id;
      this.$refs.ruleFormComment.validate((valid) => {
        if (valid) {
          this.__POST_COMMENT(this.form);
        } else {
          return false;
        }
      });
    },
    emptyForm() {
      this.form = {
        full_name: "",
        text: "",
        book: null,
        stars: 0,
      };
    },
    async __POST_COMMENT(dataForm) {
      try {
        const data = await this.$store.dispatch("fetchNews/postNewsComment", dataForm);
        this.$notification["success"]({
          message: "Success",
          description: "Комментарий отправлен успешно.",
        });
        this.emptyForm();
      } catch (e) {}
    },
    addToBasket(book) {
      this.$store.commit("addToStore", { id: book?.id, name: book?.type });
      this.successBtn = true;
    },
  },
  watch: {
    successBtn(val) {
      if (val) {
        setTimeout(() => {
          this.successBtn = false;
        }, 500);
      }
    },
  },
  components: {
    TitleComp,
    VNewsCard,
    RightNewsCard,
    CommentCard,
    TitleComp,
  },
};
</script>
<style lang="css">
@import "../../assets/css/pages/home-page.css";
@import "../../assets/css/pages/comment-components.css";
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.buy__status__body {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.buy_status__text {
  margin-top: 8px;
  color: var(--white_ffffff, #000);
  text-align: center;
  font-family: var(--ROBOTO_SERIF);
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  width: 68%;
}
.buy__type {
  display: flex;
  justify-content: flex-start;
  gap: 15px;
  margin-bottom: 28px;
}
.buy__type__body p {
  color: var(--white_ffffff, #888);
  font-family: var(--ROBOTO_SERIF);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 145%;
}
.buy__type__body h3 {
  color: var(--white_ffffff, #000);
  font-family: var(--ROBOTO_SERIF);
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  margin-top: 2px;
  margin-bottom: 22px;
}
.buy__type div {
  border-radius: 10px;
  border: 1px solid var(--black_707070, #eee);
  background: var(--black_414141, #f9f9f9);
  padding: 12px;
  padding-bottom: 9px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.buy__type div span {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid var(--black_707070, #e7e7e7);
  margin-right: 11px;
  position: relative;
}
.buy__type__active span::after {
  content: "";
  position: absolute;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #0192ff;
}
.buy__type__active span {
  border-color: var(--blue_0192FF, #99d3ff) !important;
}
.buy__type__active {
  border: 1.5px solid var(--light-bue-100, #0192ff) !important;
  background: var(--black_414141, #e6f4ff) !important;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.book-page {
  padding-top: 20px;
}
.book-info {
  display: grid;
  grid-template-columns: 338px auto;
  grid-gap: 30px;
}
.book-image img {
  width: 183px;
}
.book-image {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--header_bg);
  padding-top: 50px;
  padding-bottom: 85px;
}
.book-body {
  width: 68%;
}
.book-body h3 {
  color: var(--text_color);
  font-size: 26px;
  font-family: var(--ROBOTO_SERIF);
  font-weight: 700;
  line-height: 150%;
  margin-bottom: 8px;
}
.book-body p {
  color: var(--book_text);
  font-size: 19px;
  font-family: var(--ROBOTO_SERIF);
  line-height: 170%;
  margin-top: 24px;
}
.book-body h5 {
  color: var(--text_color);
  font-size: 22px;
  font-weight: 600;
  line-height: 150%;
  font-family: var(--ROBOTO_SERIF);
  margin-top: 24px;
}
.book-btns {
  display: flex;
  margin-top: 22px;
}
.book-btns > div:not(:last-child) {
  margin-right: 20px;
}
.primary_btn {
  background: var(--light-bue-100, #0192ff);
  color: #ffffff;
}
.primary_btn,
.outline_btn {
  padding: 10px 0;
  width: 191px;
  height: 45px;
  display: flex;
  justify-content: center;
  border-radius: 4px;
  font-size: 16px;
  font-family: var(--ROBOTO_SERIF);
  line-height: 150%;
  cursor: pointer;
}
.btn_container_primary {
  background: var(--light-bue-100, #0192ff);
}
.btn_container_outline {
  border: 1px solid var(--light-bue-100, #0192ff);
}
.outline_btn {
  /* border: 1px solid var(--light-bue-100, #0192ff); */
  color: var(--light-bue-100, #0192ff);
}
.book-btns > div:last-child span {
  margin-right: 5px;
}

.book-desc {
  margin-top: 80px;
}
.book-desc h4 {
  color: var(--white_ffffff, #000);
  font-size: 22px;
  font-family: var(--ROBOTO_SERIF);
  font-weight: 600;
  line-height: 150%;
  margin-bottom: 16px;
}
.book-desc > div {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 57px;
}
.book-desc > div > p {
  color: var(--book_text);
  font-size: 19px;
  font-family: var(--ROBOTO_SERIF);
  line-height: 170%;
}
.success_btn span svg path {
  fill: #ffffff;
}
.success_btn {
  top: 0;
  position: absolute;
  min-width: 100%;
}
.comments-mobile {
  display: none;
}
.auth-btn {
  background: #0192ff;
  border-radius: 4px;
  padding: 14px 83px;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
}
.auth-btn__outline {
  background: transparent;
  border-radius: 4px;
  padding: 14px 0;
  width: 201px;
  display: flex;
  justify-content: center;
  font-family: var(--ROBOTO_SERIF);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  color: #0192ff;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid var(--light-bue-100, #0192ff);
}
@media (max-width: 1024px) {
  .book-body {
    width: 100%;
  }
  .book-desc > div > p {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 24px */
  }
  .book-desc h4 {
    font-size: 19px;
    font-style: normal;
    font-weight: 600;
    line-height: 170%; /* 32.3px */
  }
  .book-body h5 {
    font-size: 19px;
    font-style: normal;
    font-weight: 600;
    line-height: 170%; /* 32.3px */
  }
  .book-body h3 {
    font-size: 19px;
    font-weight: 600;
    line-height: 170%; /* 32.3px */
  }
  .book-desc > div {
    grid-template-columns: 1fr;
  }
  .send-btn {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-left: 0;
    padding-right: 0;
    white-space: nowrap;
    margin-top: 20px;
  }
}
@media (max-width: 768px) {
  .book-info {
    grid-template-columns: 223px 1fr;
    grid-gap: 20px;
  }
  .book-image img {
    width: 120px;
  }
  .book-image {
    padding-top: 32px;
    padding-bottom: 56px;
  }
}
@media (max-width: 576px) {
  .general-assessment {
    padding: 24px;
  }
  .comments-list {
    margin-top: 40px;
  }
  .comment-form {
    margin-bottom: 0;
  }
  .comments-mobile {
    display: flex;
  }
  .comments-web {
    display: none;
  }
  .comment-container-grid {
    grid-template-columns: 1fr;
  }
  .primary_btn,
  .outline_btn {
    width: 166px;
  }
  .vmodal-footer__book {
    flex-direction: column;
  }
  .buy__type {
    flex-wrap: wrap;
    margin-bottom: 0;
  }
  .vmodal-footer__book div {
    width: 100%;
  }
  .book-body .anticon svg {
    width: 16px !important;
  }
  .book-info {
    display: grid;
    grid-template-columns: 165px 1fr;
    grid-gap: 22px;
  }
  /* .book-btns {
    display: none;
  } */
  .news-breadcrumb {
    display: none !important;
  }
  .comment-form {
    padding: 20px 24px;
  }
  .book-image img {
    width: 60%;
  }
  .book-image {
    padding-top: 18px;
    padding-bottom: 34px;
    width: 100%;
  }
  .book-body h3 {
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    line-height: 150%;
  }

  .book-body p {
    font-size: 12px;
    font-weight: 400;
    line-height: 130%;
    letter-spacing: 0.24px;
  }
  .book-body h5 {
    font-size: 14px;
    font-weight: 500;
    line-height: 150%;
    margin-top: 10px;
  }
  .book-desc {
    margin-top: 36px;
  }
  .book-btns .primary_btn,
  .book-btns .outline_btn {
    padding: 10px 30px;
    width: initial !important;
    white-space: nowrap;
  }
  .book-btns .btn_container {
    width: auto !important;
  }
  .book-btns {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .book-body {
    width: 100%;
  }
  .book-desc h4 {
    font-size: 14px;
    font-weight: 500;
    line-height: 150%;
  }
  .book-desc > div > p {
    font-size: 12px;
    font-weight: 400;
    line-height: 130%;
    letter-spacing: 0.24px;
  }
  .book-desc > div {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }
  .comment-form h5,
  .general-assessment h5 {
    font-size: 16px;
    font-weight: 500;
    line-height: 130%;
    margin-bottom: 15px;
  }
  .send-btn {
    width: 70%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    padding-left: 0;
    padding-right: 0;
  }
}
@media (max-width: 468px) {
  .book-info {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 22px;
  }
  .book-image {
    padding-top: 18px;
    padding-bottom: 34px;
    width: 60%;
  }
  .vmodal-header {
    padding: 16px 24px;
  }
  .vmodal-body {
    padding: 16px 24px;
  }
  .vmodal-footer__book {
    padding: 0 24px 24px 24px;
    gap: 10px;
  }
  .auth-btn,
  .auth-btn__outline {
    padding: 8px 0;
    display: flex;
    justify-content: center;
  }
  .vmodal-header h2 {
    font-size: 18px;
  }
  .buy_status__text {
    font-size: 16px;
    width: 100%;
  }
  .buy__status__body svg {
    height: 80px;
  }
  .buy__type div {
    width: 80%;
  }
  .buy__type {
    justify-content: center;
  }
  .buy__type img {
    height: 40px;
  }
  .ant-modal-content {
    border-radius: 8px !important;
  }
}
@media (max-width: 420px) {
  .primary_btn,
  .outline_btn {
    font-size: 14px;
    display: flex;
    align-items: center;
  }
}
</style>
