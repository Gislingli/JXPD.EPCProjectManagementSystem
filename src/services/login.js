import request from '@/utils/request';
import { baseUrl } from './baseUrl';

export async function UserLogin(params) {
    return request(baseUrl+'/User/Login', {
      method: 'POST',
      body: params,
    });
  }