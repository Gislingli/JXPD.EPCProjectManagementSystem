import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import axios from 'axios';
import FilterData from './components/FilterData';
import { Icon,Button,Card,Table,Divider,Popconfirm,message } from 'antd';
import router from 'umi/router';
import { ProjectList } from '@/services/projects';
class List extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            datasource:[
        ],loading:true
        }
        this.Id = this.props.match.params.id;
    }
     /*表头*/
     tableCols = () => {
        return [
                {
                    title:'序号',
                    width: 80,
                    dataIndex:'ID', fixed: 'left',
                    render:(text,record,index) => `${index + 1}`
                },
                {
                    title:' 项目编号',
                    dataIndex:'ProjectNumber',
                    key:'ProjectNumber', 
                    fixed: 'left',
                    width: 100
                    
                },
                {
                    title:'项目名称',
                    dataIndex:'ProjectName',
                    key:'ProjectName', 
                    fixed: 'left',
                    width: 200
                },
                {
                    title:'位置区域',
                    dataIndex:'AreaName',
                    key:'AreaName',
                    width: 350
                },

                {
                    title:'建设分类',
                    dataIndex:'ConType',
                    key:'ConType',
                    width: 100
                }
                // ,
                // {
                //     title:'建设规模描述',
                //     dataIndex:'ConDes',
                //     key:'ConDes'
                //     ,
                //     width: 200
                // },
                // {
                //     title:'面积（平方米）',
                //     dataIndex:'Areas',
                //     key:'Areas'
                //     ,
                //     width: 115
                // },
                // {
                //     title:'户数',
                //     dataIndex:'HouseHolds',
                //     key:'HouseHolds'
                //     ,
                //     width: 100
                // },
                // {
                //     title:'人口数',
                //     dataIndex:'PersonCount',
                //     key:'PersonCount'
                //     ,
                //     width: 100
                // },
                // {
                //     title:'起点',
                //     dataIndex:'StartingPoint',
                //     key:'StartingPoint'
                //     ,
                //     width: 100
                // },
                // {
                //     title:'终点',
                //     dataIndex:'EndingPoint',
                //     key:'EndingPoint'
                //     ,
                //     width: 100
                // },
                // {
                //     title:'长度',
                //     dataIndex:'Length',
                //     key:'Length'
                //     ,
                //     width: 100
                // },
                // {
                //     title:'车行道宽度',
                //     dataIndex:'DriveWidth',
                //     key:'DriveWidth'
                //     ,
                //     width: 100
                // },
                // {
                //     title:'人行道宽度',
                //     dataIndex:'FootwalkWidth',
                //     key:'FootwalkWidth'
                //     ,
                //     width: 100
                // },
                // {
                //     title:'车行道面积',
                //     dataIndex:'DriveAreas',
                //     key:'DriveAreas'
                //     ,
                //     width: 100
                // },
                // {
                //     title:'人行道面积',
                //     dataIndex:'FootwalkAreas',
                //     key:'FootwalkAreas'
                //     ,
                //     width: 100
                // }
                ,
                {
                    title:'投资估算',
                    dataIndex:'Investment',
                    key:'Investment'
                    ,
                    width: 100
                },                {
                    title:'合同金额',
                    dataIndex:'ContractValue',
                    key:'ContractValue'
                    ,
                    width: 100
                },                {
                    title:'实际投入金额',
                    dataIndex:'ActualValue',
                    key:'ActualValue'
                    ,
                    width: 100
                },                {
                    title:'实施年限',
                    dataIndex:'ConDate',
                    key:'ConDate'
                    ,
                    width: 100
                },                {
                    title:'牵头单位',
                    dataIndex:'LeaderDepart',
                    key:'LeaderDepart'
                    ,
                    width: 100
                },                {
                    title:'建设内容',
                    dataIndex:'ConContent',
                    key:'ConContent'
                    ,
                    width: 200
                }
                // ,
                // {
                //     title:'实施主体',
                //     dataIndex:'ConDepart',
                //     key:'ConDepart'
                //     ,
                //     width: 100
                // },
                // {
                //     title:'建设性质',
                //     dataIndex:'ConProperty',
                //     key:'ConProperty'
                //     ,
                //     width: 100
                // },
                // {
                //     title:'谋划时间',
                //     dataIndex:'IdeaDate',
                //     key:'IdeaDate'
                //     ,
                //     width: 100
                // },
                // {
                //     title:'规划时间',
                //     dataIndex:'PlanDate',
                //     key:'PlanDate'
                //     ,
                //     width: 100
                // },
                // {
                //     title:'立项时间',
                //     dataIndex:'SetupDate',
                //     key:'SetupDate'
                //     ,
                //     width: 100
                // },
                // {
                //     title:'计划设计时间',
                //     dataIndex:'DesignDate',
                //     key:'DesignDate'
                //     ,
                //     width: 100
                // },
                // {
                //     title:'计划招投标时间',
                //     dataIndex:'BidDate',
                //     key:'BidDate'
                //     ,
                //     width: 100
                // },

                // {
                //     title:'计划施工开始时间',
                //     dataIndex:'ConStartDate',
                //     key:'ConStartDate'
                //     ,
                //     width: 100
                // },
                // {
                //     title:'计划施工结束时间',
                //     dataIndex:'ConEndDate',
                //     key:'ConEndDate'
                //     ,
                //     width: 100
                // },
                // {
                //     title:'计划竣工验收时间',
                //     dataIndex:'CheckDate',
                //     key:'CheckDate'
                //     ,
                //     width: 100
                // }
                ,
                // {
                //     title:'备注',
                //     dataIndex:'Remark',
                //     key:'Remark'
                //     ,
                //     width: 200
                // },
                {
                    title:'图面显示',
                    dataIndex:'ImageView',
                    key:'ImageView'
                    ,
                    width: 200
                },
                {
                    title:'操作',
                    key:'action',
                    fixed: 'right',
                    width: 150,
                    render:(text,record) => (
                        <span>
                                                        <a href="javascrips:;" onClick={this.handleDetails.bind(this,record)}>
                                <Icon type="edit" />详情
                            </a>
                            <Divider type="vertical" />
                            <Popconfirm title="确定删除?" onConfirm={this.handleDelete.bind(this,record)}>
                                <a href="javascript:;">
                                    <Icon type="delete" />删除
                                </a>
                            </Popconfirm>
                            
                        </span>
                    )
                }
            ]
    }
        /*查询项目*/
        formProjectByName = (queryContent) => {
            
}
handleDelete=(record)=>{


}
handleDetails=(record)=>{


    router.push('/projects/list/details/'+record.Id)
}
    /*获取数据*/
    getData = () => {
        axios.post(ProjectList,{id :this.Id}).then((res) => {
   
            if(res.data.Status){
                this.setState({
                    datasource:res.data.Data.ProjectPlainViewModel,
                    loading:false
                });
                
            }
        })
    }
    componentDidMount=()=>{

        this.getData();
    }
     /*渲染*/
    render(){
        const titleContent = (
            <div>
                <label>项目清单</label>
                <Button type="primary" style={{float:'right'}} onClick={()=>{router.push('/projects/list/add')}}>
                    <Icon type="plus" />项目新增
                </Button>
            </div>
        ); 
        return(
            <PageHeaderWrapper
            title={titleContent}
            >
            <FilterData formProjectByName = {this.formProjectByName.bind(this)}/>
                        <Card>
                    <Table
                        loading={this.state.loading}
                        scroll={{ x: 1895,y: 400}}
                        columns={this.tableCols()}
                        dataSource={this.state.datasource}
                    >
                    </Table>

                </Card>
            </PageHeaderWrapper>
        )
    }
}

export default List;