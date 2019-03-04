import request from '@/utils/request';
import { baseUrl } from './baseUrl';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

// export async function getStakeholders() {
//   return request('/qiapi/User/GetStakeholders',{
//     method:'POST'
//   });
// }

let getStakeholders = `${baseUrl}/User/GetStakeholders`;

export{
  getStakeholders
}

export async function queryCurrentUser(params){
  return request(baseUrl+'/User/Get',{
    method: 'POST',
    body: params,
  })
}