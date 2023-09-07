<template>
  <div class="about-page">
    <div class="container_xl">
      <div class="new-category-title">
        <h2>{{ $store.state.translations["main.library"] }}</h2>
      </div>
      <div class="news-breadcrumb">
        <nuxt-link :to="localePath('/')"
          >{{ $store.state.translations["main.home"] }} <span v-html="dropdown"></span
        ></nuxt-link>
        <nuxt-link :to="localePath(`/library?type=articles`)"
          >{{ $store.state.translations["main.articles"] }} <span v-html="dropdown"></span
        ></nuxt-link>
        <nuxt-link :to="localePath('/')" style="pointer-events: none"
          >{{ article?.title }} <span v-html="dropdown"></span
        ></nuxt-link>
      </div>
      <div class="engineers-container">
        <h2>{{ article?.title }}</h2>
        <div class="" v-html="article?.text"></div>
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
                  article?.comments.length
                }})
              </h4>
              <div class="comments-grid" v-if="showAll">
                <CommentCard
                  v-for="comment in article?.comments"
                  :key="comment?.id"
                  :comment="comment"
                />
              </div>
              <div class="comments-grid" v-else>
                <CommentCard
                  v-for="comment in article?.comments.slice(0, 3)"
                  :key="comment?.id"
                  :comment="comment"
                />
              </div>
              <div
                class="show-more-count"
                @click="showAll = true"
                v-if="article?.comments.length > 3 && !showAll"
              >
                {{ $store.state.translations["news.see_again"] }} ({{
                  article?.comments.length - 3
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
                :default-value="Number.parseInt(Number(article?.rating))"
                allow-half
                disabled
              /><span>{{ Number.parseInt(article?.rating) }}/5</span>
            </div>
            <div class="item-rate">
              <a-rate :default-value="5" disabled /><span
                ><p>{{ article?.rating_info["5"] }}</p></span
              >
            </div>
            <div class="item-rate">
              <a-rate :default-value="4" disabled /><span
                ><p>{{ article?.rating_info["4"] }}</p></span
              >
            </div>
            <div class="item-rate">
              <a-rate :default-value="3" disabled /><span
                ><p>{{ article?.rating_info["3"] }}</p></span
              >
            </div>
            <div class="item-rate">
              <a-rate :default-value="2" disabled /><span
                ><p>{{ article?.rating_info["2"] }}</p></span
              >
            </div>
            <div class="item-rate">
              <a-rate :default-value="1" disabled /><span
                ><p>{{ article?.rating_info["1"] }}</p></span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CommentCard from "../../components/cards/CommentCard.vue";

export default {
  data() {
    return {
      dropdown: require("../../assets/svg/dropdown.svg?raw"),
      form: {
        full_name: "",
        text: "",
        article: null,
        stars: 0,
      },
      showAll: false,
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
    };
  },
  computed: {
    rateSumm() {
      const summa =
        this.article?.rating_info["5"] * 5 +
        this.article?.rating_info["4"] * 4 +
        this.article?.rating_info["3"] * 3 +
        this.article?.rating_info["2"] * 2 +
        this.article?.rating_info["1"] * 1;
      return summa;
    },
  },
  async asyncData({ store, i18n, params }) {
    const [articleData] = await Promise.all([
      store.dispatch("fetchBooks/getArticlesBySlug", {
        id: params.index,
        header: {
          headers: {
            Language: i18n.locale,
          },
        },
      }),
    ]);
    const article = articleData;
    return {
      article,
    };
  },
  methods: {
    submit() {
      this.form.article = this.article.id;
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
        article: null,
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
  components: { CommentCard },
};
</script>
<style lang="css">
@import "../../assets/css/pages/home-page.css";
@import "../../assets/css/pages/news-menu-page.css";
@import "../../assets/css/pages/site-info.css";
@import "../../assets/css/pages/comment-components.css";
</style>
