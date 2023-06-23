<template>
  <div class="book-page">
    <div class="container_xl">
      <div class="book row">
        <div class="news-breadcrumb">
          <nuxt-link :to="localePath('/')"
            >{{ $store.state.translations["main.home"] }} <span v-html="dropdown"></span
          ></nuxt-link>
          <nuxt-link :to="localePath(`/library`)"
            >Kutubxona<span v-html="dropdown"></span
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
            <div class="primary_btn">Sotib olish</div>
            <div
              v-if="!$store.state[book.type].includes(book?.id)"
              @click="$store.commit('addToStore', { id: book?.id, name: book?.type })"
              class="primary_btn"
            >
              Saqlab qo'yish
            </div>
            <div v-else class="outline_btn"><span v-html="success"></span>Saqlangan</div>
          </div>
        </div>
      </div>

      <div class="book-desc">
        <h4>Kitob haqida qisqacha</h4>
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
            <div class="comments-list">
              <h4>
                {{ $store.state.translations["news.comments_title"] }} ({{
                  book?.comments.length
                }})
              </h4>
              <div class="comments-grid">
                <CommentCard
                  v-for="comment in book?.comments.slice(0, 3)"
                  :key="comment?.id"
                  :comment="comment"
                />
              </div>
              <div class="show-more-count" v-if="book?.comments.length > 3">
                {{ $store.state.translations["news.see_again"] }} ({{
                  book?.comments.length - 3
                }})
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
        </div>
      </div>
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
      dropdown: require("../../assets/svg/dropdown.svg?raw"),
      success: require("../../assets/svg/success.svg?raw"),
      rules: {
        full_name: [
          { required: true, message: "This field is required", trigger: "blur" },
        ],
        text: [{ required: true, message: "This field is required", trigger: "blur" }],
      },
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
      console.log(this.form);
      this.$refs.ruleFormComment.validate((valid) => {
        if (valid) {
          this.__POST_COMMENT(this.form);
        } else {
          console.log("error submit!!");
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
      } catch (e) {
        console.log(e);
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
  background: var(--black-1, #f9f9f9);
  padding-top: 50px;
  padding-bottom: 85px;
}
.book-body {
  width: 68%;
}
.book-body h3 {
  color: var(--black-100, #000);
  font-size: 26px;
  font-family: var(--ROBOTO_SERIF);
  font-weight: 700;
  line-height: 150%;
  margin-bottom: 8px;
}
.book-body p {
  color: var(--black-70, #414141);
  font-size: 19px;
  font-family: var(--ROBOTO_SERIF);
  line-height: 170%;
  margin-top: 24px;
}
.book-body h5 {
  color: var(--black-100, #000);
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
.outline_btn {
  border: 1px solid var(--light-bue-100, #0192ff);
  color: var(--light-bue-100, #0192ff);
}
.book-btns > div:last-child span {
  margin-right: 5px;
}
.book-btns > div {
  padding: 10px 0;
  width: 191px;
  display: flex;
  justify-content: center;
  border-radius: 4px;
  font-size: 16px;
  font-family: var(--ROBOTO_SERIF);
  line-height: 150%;
  cursor: pointer;
}
.book-desc {
  margin-top: 80px;
}
.book-desc h4 {
  color: var(--black-100, #000);
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
  color: var(--black-70, #414141);
  font-size: 19px;
  font-family: var(--ROBOTO_SERIF);
  line-height: 170%;
}
</style>
