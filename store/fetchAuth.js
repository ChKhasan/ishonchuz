export const actions = {
  async postSendSmsCode({}, payload) {
    const res = await this.$axios.$post(`/auth/send_sms_code`, payload);
    return res;
  },
  async postCheckSmsCode({}, payload) {
    const res = await this.$axios.$post(`/auth/check_sms_code`, payload);
    return res;
  },
  async postLoginRegister({}, payload) {
    const res = await this.$axios.$post(`/auth/sing_up`, payload);
    return res;
  },
  async postLogOut({}, payload) {
    const res = await this.$axios.$post(`/auth/logout`, payload);
    return res;
  },
  async postViewSaved({}, payload) {
    const res = await this.$axios.$post(`/view_saved`, payload);
    return res;
  },
};
