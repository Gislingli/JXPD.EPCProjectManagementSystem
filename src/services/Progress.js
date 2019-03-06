import { baseUrl } from './baseUrl';

let ProjectPaymentAdd= `${baseUrl}/ProjectPayment/Add`;
// let getProject= `${baseUrl}/Project/GetViewModel`;
let ProjectPaymentList= `${baseUrl}/ProjectPayment/ListByProjectId`;

let ProjectPaymentDelete= `${baseUrl}/ProjectPayment/Delete`;

let ListByCategoryId= `${baseUrl}/Dictionary/ListByCategoryId`;

let ProjectProgressList = `${baseUrl}/ProjectProgress/ListByProjectId`;

let ProjectProgressAdd = `${baseUrl}/ProjectProgress/Add`;
export{
    ProjectPaymentAdd,
    ProjectPaymentList,
    ProjectPaymentDelete,
    ListByCategoryId,
    ProjectProgressList,
    ProjectProgressAdd
}