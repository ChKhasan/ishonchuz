export const actions = {
  async getAudio({}, payload) {
    const res = await this.$axios.$get(`/fm_radio`, { ...payload });
    return res;
  },
};
