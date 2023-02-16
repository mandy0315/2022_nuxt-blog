import mainStore from './mainStore';
import asideStore from './asideStore';
import { postsStore, postsListStore } from './postsStore';

export const useMainStore = mainStore;
export const usePostsStore = postsStore;
export const usePostsListStore = postsListStore;
export const useAsideStore = asideStore;
