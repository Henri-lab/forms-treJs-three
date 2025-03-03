import { createStore } from "vueX";
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
const store = createStore({
  state,
  mutations,
  actions,
  modules: {},
});
export default store;
