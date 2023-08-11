export const actions = {
  async getContact({}, payload) {
    const res = await this.$axios.$get(`/advert_and_connection`, {
      ...payload,
    });
    return res;
  },
};
