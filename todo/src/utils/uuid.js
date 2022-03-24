import {loadFromLocalStorage} from "./localstorage";

const uuidGen = () => Math.max(...(loadFromLocalStorage('tds').map(e => e.id)), 0) + 1;

export default uuidGen;