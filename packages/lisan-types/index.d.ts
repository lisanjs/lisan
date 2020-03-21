export * from './dictionary';
export * from './locale';
export * from './loader';

type Plugin<T> = (lisan: T) => void;

export { Plugin };
