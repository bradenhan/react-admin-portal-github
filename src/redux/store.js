import { createStore, combineReducers } from "redux";
import { SidebarCollapsedReducers } from "./reducers/SidebarCollapsedReducers"; // 导入 SidebarCollapsedReducers

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  // 注意这里 persistConfig
  key: "root",
  storage,
  whitelist: ["SidebarCollapsedReducers"], //设置SidebarCollapsedReducers数据持久化， 注意单词的拼写
};

const reducer = combineReducers({
  SidebarCollapsedReducers,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer);
const persisstore = persistStore(store);
// 导出
export { store, persisstore }
