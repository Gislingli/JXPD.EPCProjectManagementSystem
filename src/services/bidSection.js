import { baseUrl } from './baseUrl';

let bidSectionAdd = `${baseUrl}/BidSection/Add`;
let bidSectionDelete = `${baseUrl}/BidSection/Delete`;
let bidSectionUpdate = `${baseUrl}/BidSection/Update`;
let bidSectionsQuery = `${baseUrl}/BidSection/QueryBidSections`;
let bidSectionQuery = `${baseUrl}/BidSection/QueryBidSection`;
let bidSectionQuery2 = `${baseUrl}/BidSection/QueryBidSection2`;
let bidSectionProp = `${baseUrl}/BidSection/QueryBidSectionProp`;

//资料管理
let addFiles = `${baseUrl}/BidSection/AddFiles`;
let deleteFiles = `${baseUrl}/BidSection/DeleteFiles`;
let QueryFiles = `${baseUrl}/BidSection/QueryFiles`;


//质安管理
let AddQS = `${baseUrl}/BidSection/AddQS`;
let DeleteQS = `${baseUrl}/BidSection/DeleteQS`;
let GetQSByBID = `${baseUrl}/BidSection/GetQSByBID`;


export{
    bidSectionAdd,
    bidSectionDelete,
    bidSectionUpdate,
    bidSectionsQuery,
    bidSectionQuery,
    bidSectionQuery2,
    bidSectionProp,
    addFiles,
    deleteFiles,
    QueryFiles,
    AddQS,
    DeleteQS,
    GetQSByBID
}