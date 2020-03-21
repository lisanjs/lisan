import Lisan from './Lisan';

const lisan = new Lisan();
const t = lisan.t.bind(lisan);
const c = lisan.c.bind(lisan);

export { lisan, t, c, Lisan };
