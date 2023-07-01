import requestFun from "./fetchUtil"; //引入
import qs from "qs";

const { stringify } = qs;
const { post, get, deleteMethod,patch} = requestFun;

//get方式
export async function fetchData1(params) {
  return get(`/api/bbb?${stringify(params)}`);
}

//post方式
export async function fetchData2(params) {
  return post(`/api/aaa`, params);
}

// 获取菜单信息
export async function fetchGetMenus(params) {
  return get(`http://localhost:8001/rights?_embed=children`, params);
}

// 获取菜单信息
export async function fetchGetFirstMenus(params) {
    return get(`http://localhost:8001/rights`, params);
}

// 删除菜单信息
export async function fetchDeleteMenus(params) {
  console.log(params)
    return deleteMethod(`http://localhost:8001/rights/${params}`, params);
}

// 删除菜单信息
export async function fetchDeleteSubMenus(params) {
  console.log(params)
    return deleteMethod(`http://localhost:8001/children/${params}`, params);
}

// 修改权限菜单信息
export async function fetchPatchMenus(id,params) {
  console.log(params)
    return patch(`http://localhost:8001/rights/${id}`, params);
}

// 权限菜单信息
export async function fetchPatchSubMenus(id,params) {
  console.log(params)
    return patch(`http://localhost:8001/children/${id}`, params);
} 

// 处理角色信息
export async function fetchGetRoles(id,params) {
  console.log(params)
    return get(`http://localhost:8001/roles`, params);
}

export async function fetchDeleteRoles(id) { 
    return deleteMethod(`http://localhost:8001/roles/${id}`);
}

// 修改角色菜单信息
export async function fetchPatchRoles(id,params) { 
    return patch(`http://localhost:8001/roles/${id}`, params);
}

// 用户管理处理 
export async function fetchGetUserList(id,params) { 
    return get(`http://localhost:8001/users?_expand=role`, params);
} 

export async function fetchGetRegionList(id,params) { 
  return get(`http://localhost:8001/regions`, params);
}  

//post方式
export async function fetchAddUser(params) {
  return post(`http://localhost:8001/users`, params);
}

export async function fetchDeleteUser(params) {
  console.log(params)
    return deleteMethod(`http://localhost:8001/users/${params}`, params);
} 

export async function fetchPatchUser(id,params) {
  console.log(params)
    return patch(`http://localhost:8001/users/${id}`, params);
}

export async function fetchGetUsersLogin(params) { 
  return get(`http://localhost:8001/users?username=${params.username}&password=${params.password}&roleState=true&_expand=role`);
}  

// 站内信
export async function fetchGetCategoriesList() { 
  return get(`http://localhost:8001/categories`);
}

export async function fetchDeleteCategories(params) { 
    return deleteMethod(`http://localhost:8001/categories/${params}`);
} 

export async function fetchPatchtCategories(id,params) { 
  return patch(`http://localhost:8001/categories/${id}`, params);
} 

export async function fetchAdNewsSave(params) { 
  return post(`http://localhost:8001/news`, params);
} 


export async function fetchGetNewsList(params) { 
  return get(`http://localhost:8001/news?author=${params.author}&auditState=${params.auditState}&_expand=category`);
} 

export async function fetchGetUnPublishedNewsList(params) { 
  return get(`http://localhost:8001/news?author=${params.author}&publishState=${params.publishState}&_expand=category`);
} 


export async function fetchGetAuditNewsList(params) { 
  return get(`http://localhost:8001/news?author=${params.author}&auditState_ne=${params.auditState}&publishState_lte=${params.publishState}&_expand=category`);
}

export async function fetchDeleteNews(params) {
  console.log(params)
    return deleteMethod(`http://localhost:8001/news/${params}`);
} 
 
export async function fetchGetNewsDetail(params) { 
  return get(`http://localhost:8001/news?id=${params.id}&_expand=category&_expand=role`);
}

// 修改权限菜单信息
export async function fetchPatchtNewsDetail(id,params) {
  console.log(params)
    return patch(`http://localhost:8001/news/${id}`, params);
}

// 
export async function fetchCheckPatchtNews(id,params) {
  console.log(params)
    return patch(`http://localhost:8001/news/${id}`, params);
}

export async function fetchGetUnAuditNewsList(params) { 
  return get(`http://localhost:8001/news?auditState=${params.auditState}&_expand=category`);
}


export async function fetchGetViewsDescNewsList(params) { 
  // http://localhost:8001/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=2
  return get(`http://localhost:8001/news?publishState=${params.publishState}&_expand=category&_sort=${params.sort}&_order=${params.order}&_limit=${params.limit}`);
}

export async function fetchGetBarChartNewsList(params) { 
  // http://localhost:8001/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=2
  return get(`http://localhost:8001/news?publishState=${params.publishState}&_expand=category`);
}
