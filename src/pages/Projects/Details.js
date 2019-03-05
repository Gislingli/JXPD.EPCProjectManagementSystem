    import React, { PureComponent,Fragment } from 'react';
    import PageHeaderWrapper from '@/components/PageHeaderWrapper';
    import { Icon,Button,Card,Table,Divider,Popconfirm,message,Row,Col } from 'antd';
    import DescriptionList from '@/components/DescriptionList';
    import router from 'umi/router';
    import axios from 'axios';
    const { Description } = DescriptionList;
    import { getProject } from '@/services/projects';
    class Details extends PureComponent{
        constructor(props){
            super(props)
            this.state={
                datasource:{},
                PersondataSource:[]
            }
            this.Id = this.props.match.params.id;
          }
          tableCols=()=>{
            return [
                {
                    title:'序号',
                    width: 80,
                    dataIndex:'iD',
                    render:(text,record,index) => `${index + 1}`
                },
                {
                    title:' 名称',
                    dataIndex:'RelationshipType',
                    key:'RelationshipType', 
                    width: 100
                    
                },
                {
                    title:' 姓名',
                    dataIndex:'Name',
                    key:'Name', 
                    width: 100
                    
                },
                {
                    title:'联系方式',
                    dataIndex:'Phone',
                    key:'Phone', 
                    width: 100
                    
                },
                {
                    title:' 联系地址',
                    dataIndex:'Address',
                    key:'Address', 
                    width: 100
                    
                },
                // {
                //     title:' 个人描述',
                //     dataIndex:'Description',
                //     key:'Description', 
                //     width: 100
                    
                // },
                {
                    title:' 组织',
                    dataIndex:'Organization',
                    key:'Organization', 
                    width: 100
                    
                },
                {
                    title:' 邮件地址',
                    dataIndex:'EMail',
                    key:'EMail', 
                    width: 100
                    
                },
                {
                    title:' 部门',
                    dataIndex:'Department',
                    key:'Department', 
                    width: 100
                    
                },
                {
                    title:' 职务/岗位',
                    dataIndex:'Position',
                    key:'Position', 
                    width: 100
                    
                },
                // {
                //     title:' 备注',
                //     dataIndex:'Remark',
                //     key:'Remark', 
                //     width: 100
                    
                // },
            ]

          }
              /*获取数据*/
        getData = () => {
        axios.post(getProject,{id: this.Id }).then((res) => {
       
            if(res.data.Status){
                this.setState({
                    datasource:res.data.Data.ProjectViewModel,
                    PersondataSource:res.data.Data.ProjectViewModel.Relationships.Persons
                });
             
            }
        })
    }
          componentDidMount=()=>{

            this.getData();
        }
        render(){
            return(
                <PageHeaderWrapper
                  title={'项目名称：' + this.state.datasource.ProjectName}

                    action={
                        <Fragment>
                            <Button type="primary" onClick={()=>{router.push('/projects/list/details/edit/'+this.Id)}}>
                                <Icon type="edit" />编辑
                            </Button>
                            <Button type="primary" onClick={()=>{router.push('/projects/list/details/progress/'+this.Id)}}>
                            <Icon type="bar-chart" />进度管理
                            </Button>
                        </Fragment>
                    }
                >
            <Card title='基本信息' style={{ margin: '15px 0' }}>
                <DescriptionList>
                    <Description term='项目编号'>{this.state.datasource.ProjectNumber}</Description>
                    <Description term='项目名称'>{this.state.datasource.ProjectName}</Description>
                    <Description term='省级区域'>{this.state.datasource.ProvinceName}</Description>
                    <Description term='市级区域'>{this.state.datasource.CityName}</Description>
                    <Description term='区县级区域'>{this.state.datasource.DistrictName}</Description>
                    <Description term='镇街道级区域'>{this.state.datasource.TownStreetName}</Description>
                    <Description term='建设分类'>{this.state.datasource.ConType}</Description>
                    <Description term='建设规模描述'>{this.state.datasource.ConDes}</Description>
                    <Description term='面积（平方米）'>{this.state.datasource.Areas}</Description>
                    <Description term='户数'>{this.state.datasource.HouseHolds}</Description>
                    <Description term='人口数'>{this.state.datasource.PersonCount}</Description>
                    <Description term='起点'>{this.state.datasource.StartingPoint}</Description>
                    <Description term='终点'>{this.state.datasource.EndingPoint}</Description>
                    <Description term='长度'>{this.state.datasource.Length}</Description>
                    <Description term='车行道宽度'>{this.state.datasource.DriveWidth}</Description>
                    <Description term='人行道宽度'>{this.state.datasource.FootwalkWidth}</Description>
                    <Description term='车行道面积'>{this.state.datasource.DriveAreas}</Description>
                    <Description term='人行道面积'>{this.state.datasource.FootwalkAreas}</Description>
                    <Description term='投资估算'>{this.state.datasource.Investment}</Description>
                    <Description term='合同金额'>{this.state.datasource.ContractValue}</Description>
                    <Description term='实际投入金额'>{this.state.datasource.ActualValue}</Description>
                    <Description term='实施年限'>{this.state.datasource.ConDate}</Description>
                    <Description term='牵头单位'>{this.state.datasource.LeaderDepart}</Description>
                    <Description term='建设内容'>{this.state.datasource.ConContent}</Description>
                    <Description term='实施主体'>{this.state.datasource.ConDepart}</Description>
                    <Description term='建设性质'>{this.state.datasource.ConProperty}</Description>
                    <Description term='谋划时间'>{this.state.datasource.IdeaDate}</Description>
                    <Description term='规划时间'>{this.state.datasource.PlanDate}</Description>
                    <Description term='立项时间'>{this.state.datasource.SetupDate}</Description>
                    <Description term='计划设计时间'>{this.state.datasource.DesignDate}</Description>
                    <Description term='计划招投标时间'>{this.state.datasource.BidDate}</Description>
                    <Description term='计划施工开始时间'>{this.state.datasource.ConStartDate}</Description>
                    <Description term='计划施工结束时间'>{this.state.datasource.ConEndDate}</Description>
                     <Description term='计划竣工验收时间'>{this.state.datasource.CheckDate}</Description>
                     <Description term='备注'>{this.state.datasource.Remark}</Description>
                     <Description term='图面显示'>{this.state.datasource.ImageView}</Description>
                </DescriptionList>
                
            </Card>
            <Card title='负责人员信息' style={{ margin: '15px 0' }}>
                   <Table
                        loading={this.state.loading}
                        columns={this.tableCols()}
                        PersondataSource={this.state.PersondataSource}
                    >
                    </Table> 
               
                
            </Card>
                </PageHeaderWrapper>
            )
        }
    }

    export default Details;