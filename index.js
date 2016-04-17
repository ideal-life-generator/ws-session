export default function caseReducer (initialState, cases) {
  return function (state = initialState, action) {
    const { type, ...data } = action

    if (type in cases) return cases[ type ](state, data)
    else return state
  }
}