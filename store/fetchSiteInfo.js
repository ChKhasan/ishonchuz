export const actions = {
  async getSiteInfo({}, payload) {
    const res = await this.$axios.$get(`/static_infos`, { ...payload });
    return res;
  },
};
