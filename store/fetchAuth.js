export const actions = {
  async postSendSmsCode({}, payload) {
    const res = await this.$axios.$post(`/auth/send_sms_code`, payload);
    return res;
  },
  async getProfileInfo({}, payload) {
    const res = await this.$axios.$get(`/auth/me`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("access_token")
        )}`,
      },
    });
    return res;
  },
  async putUpdateProfile({}, payload) {
    const res = await this.$axios.$put(`/auth/me/update`, payload, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("access_token")
        )}`,
      },
    });
    return res;
  },
  async putUpdateNumber({}, payload) {
    const res = await this.$axios.$put(`/auth/update_number`, payload, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("access_token")
        )}`,
      },
    });
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
    const res = await this.$axios.$post(`/auth/logout`, payload, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("access_token")
        )}`,
      },
    });
    return res;
  },
  async postViewSaved({}, payload) {
    const res = await this.$axios.$post(`/view_saved`, payload);
    return res;
  },
};
