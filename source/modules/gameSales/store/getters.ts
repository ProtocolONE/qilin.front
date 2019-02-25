import { State } from './state'
import { GetterTree } from 'vuex'

const getters: GetterTree<State, any> = {
  getUrl: state => (value: string) => `${ state.api + state.id }/${ value }/`
}

export default getters
