export const state = () => ({
  currentPop: '',
  isLoading: false,
  forceUpdate: 1
})

export const getters = {}

export const actions = {
  openPop({ state, commit, dispatch }, payload) {
    // console.log('이전팝업' + state.currentPop)
    const popPos = payload.popPos
      ? $('.wrap__pc')
        ? payload.popPos + 100
        : payload.popPos
      : $('.popup__dialog').css('top')

    $('.popup__dialog').css('top', popPos)
    $('html, body').animate(
      {
        scrollTop: popPos
      },
      800,
      function() {}
    )

    // dispatch('setLoading', false)
    commit('OPEN_POP', payload)
  },
  closePop({ commit }) {
    commit('CLOSE_POP')
    commit('newSemester/INIT_USER_MODEL', null, { root: true })
    commit('FORCE_UPDATE')
  },
  setLoading({ commit, dispatch }, boolean) {
    commit('SET_LOADING', boolean)
  }
}

export const mutations = {
  OPEN_POP(state, payload) {
    state.currentPop = payload.popName
  },
  CLOSE_POP(state) {
    state.currentPop = ''
  },
  SET_LOADING(state, boolean) {
    state.isLoading = boolean
  },
  FORCE_UPDATE(state) {
    state.forceUpdate += 1
  }
}
