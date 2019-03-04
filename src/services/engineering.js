import { baseUrl } from './baseUrl';

let Add = `${baseUrl}/Engineering/AddAndUpdateBidsection`;
let Get = `${baseUrl}/Engineering/GetViewModel`;
let Delete = `${baseUrl}/Engineering/UpdateTag`;
let GetList = `${baseUrl}/Engineering/ListViewModel`;
let QueryModelByName = `${baseUrl}/Engineering/ListViewModelByEngineeringName`;
let QueryModelByInvest = `${baseUrl}/Engineering/ListViewModelByInvestmentAmount`;

export {
  Add,
  Get,
  GetList,
  QueryModelByName,
  QueryModelByInvest,
}