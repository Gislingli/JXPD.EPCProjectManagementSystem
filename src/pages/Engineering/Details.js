import React, { Component,Fragment } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DescriptionList from '@/components/DescriptionList';
import axios from 'axios';
import { Icon,Button,Card,Table,Divider,Popconfirm,message,Row,Col } from 'antd';
import { Get } from '@/services/engineering';
import router from 'umi/router';
import eLogo from '@/assets/egneering.png';

const { Description } = DescriptionList;

class Details extends Component {
  constructor(props){
    super(props)
    this.state={
      enginneering:{},
      stakeholders:[],
      bidsections:[],
    }
    this.Id = this.props.match.params.id;
    this.Cols = [
      {
        title:'序号',
        width: 70,
        dataIndex:'Id',
        render:(text,record,index) => `${index + 1}`
      },
      {
        title:'标段序号',
        dataIndex:'BidSectionCode',
        key:'BidSectionCode'
      },
      {
        title:'标段名称',
        dataIndex:'BidSectionName',
        key:'BidSectionName'
      },
      {
        title:'工作阶段',
        dataIndex:'BidSectionWork',
        key:'BidSectionWork'
      },
      {
        title:'所在区域',
        dataIndex:'BidSectionArea',
        key:'BidSectionArea'
      },
      {
        title:'投资估算',
        dataIndex:'PlanInvestmentAmount',
        key:'PlanInvestmentAmount'
      },
      {
        title:'合同金额',
        dataIndex:'ContractAmount',
        key:'ContractAmount'
      },
      {
        title:'实际投入',
        dataIndex:'ActualInvestmentAmount',
        key:'ActualInvestmentAmount'
      },
      {
        title:'资金进度',
        dataIndex:'InvestmentPercentage',
        key:'InvestmentPercentage'
      },
      {
        title:'标段负责人',
        dataIndex:'BidSectionLeader',
        key:'BidSectionLeader'
      },
      {
        title:'操作',
        key:'action',
        render:(text,record) => (
          <span>
            <a href="javascrips:;" onClick={this.handleBidDetails.bind(this,record)}>
                <Icon type="search" />详情
            </a>
            <Divider type="vertical" />
            <Popconfirm title="确定删除?" onConfirm={this.handleBidDelete.bind(this,record)}>
                <a href="javascript:;">
                    <Icon type="delete" />删除
                </a>
            </Popconfirm>
            
          </span>
        )
      }
    ];
  }


  getData = () => {
    axios.post(Get,{Id:this.Id}).then((res) => {
      debugger;
      if(res.data.Status){
        let data = res.data.Data;
        this.setState({
          enginneering:data.EngineeringViewModel,
          stakeholders:data.ItemRelationshipView.Persons,  
          bidsections:data.EngineeringViewModel.BidSectionViewModels,
        })
      }
    })

    // const data = {Id:'7049E6B8-0769-4BAD-B25A-B8CCB8D7ACB5',EngineeringName:'背街小巷',EngineeringArea:'新嘉街道',EngineeringOwner:'南湖城投',EngineeringSupervisor:'南湖区住建局',EngineeringInvest:'512572.14',EngineeringDate:'2019/01/01-2020/02/02',EngineeringLeader:'韩冰'};
    // const sdata = {leader:'金明辉',designleader:'万学良',buildleader:'苏友富',members:['吴佳伟','吴杰','张云','徐超','王海奇','李龙','陈国军','董翰翔']};
    // const bdata = [
    //   {Id:'1',BidSectionCode:3,BidSectionName:'新嘉三标段',BidSectionWork:'开工',BidSectionArea:'新嘉街道',PlanInvestmentAmount:31142.71,ContractAmount:56142.75,ActualInvestmentAmount:35225.35,InvestmentPercentage:'32.8%',BidSectionLeader:'金明辉'},
    //   {Id:'2',BidSectionCode:1,BidSectionName:'建设一标段',BidSectionWork:'施工图',BidSectionArea:'建设街道',PlanInvestmentAmount:11132.11,ContractAmount:86542.25,ActualInvestmentAmount:15425.15,InvestmentPercentage:'17.5%',BidSectionLeader:'苏友富'},
    //   {Id:'3',BidSectionCode:1,BidSectionName:'建设一标段',BidSectionWork:'施工图',BidSectionArea:'建设街道',PlanInvestmentAmount:11132.11,ContractAmount:86542.25,ActualInvestmentAmount:15425.15,InvestmentPercentage:'17.5%',BidSectionLeader:'苏友富'},
    //   {Id:'4',BidSectionCode:1,BidSectionName:'建设一标段',BidSectionWork:'施工图',BidSectionArea:'建设街道',PlanInvestmentAmount:11132.11,ContractAmount:86542.25,ActualInvestmentAmount:15425.15,InvestmentPercentage:'17.5%',BidSectionLeader:'苏友富'},
    //   {Id:'5',BidSectionCode:1,BidSectionName:'建设一标段',BidSectionWork:'施工图',BidSectionArea:'建设街道',PlanInvestmentAmount:11132.11,ContractAmount:86542.25,ActualInvestmentAmount:15425.15,InvestmentPercentage:'17.5%',BidSectionLeader:'苏友富'},
    //   {Id:'6',BidSectionCode:1,BidSectionName:'建设一标段',BidSectionWork:'施工图',BidSectionArea:'建设街道',PlanInvestmentAmount:11132.11,ContractAmount:86542.25,ActualInvestmentAmount:15425.15,InvestmentPercentage:'17.5%',BidSectionLeader:'苏友富'}
    // ];

  }

  componentDidMount = () =>{
    this.getData();
  }

  //标段详情
  handleBidDetails = (record) => {
    const Id = record.Id;
    router.push('/bidSection/list/details/'+Id);
  }

  handleBidDelete = (record) => {
    const params ={Id:record.key};
  }

  render(){
    return(
      <PageHeaderWrapper
        title={'工程名称：' + this.state.enginneering.EngineeringName}
        logo={
            <img src={eLogo} />
        }
        action={
            <Fragment>
                <Button type="primary" onClick={()=>{router.push('/engineering/edit/'+this.Id)}}>
                    <Icon type="edit" />编辑
                </Button>
                <Button type="primary">
                    <Icon type="printer" />打印
                </Button>
            </Fragment>
        }
      >
        <Card title={<h4><Icon type="book" style={{marginRight:'10px'}}/>基本信息</h4>} style={{ margin: '15px 0' }}>
          <DescriptionList>
            <Description term='名称'>{this.state.enginneering.EngineeringName}</Description>
            <Description term='区域'>{this.state.enginneering.EngineeringArea}</Description>
            <Description term='业主单位'>{this.state.enginneering.EngineeringOwner}</Description>
            <Description term='监理单位'>{this.state.enginneering.EngineeringSupervisor}</Description>
            <Description term='合同金额'>{this.state.enginneering.EngineeringInvest}</Description>
            <Description term='工程工期'>{this.state.enginneering.EngineeringDate}</Description>
          </DescriptionList>
        </Card>
        <Card title={<h4><Icon type="team" style={{marginRight:'10px'}}/>参与人员</h4>} style={{ margin: '15px 0' }}>
          <DescriptionList>
            <Description term='工程负责人'>{this.state.stakeholders.filter(o=>o.RelationshipType=='工程负责人').length>0?this.state.stakeholders.filter(o=>o.RelationshipType=='工程负责人')[0].Name:'暂无'}</Description>
            <Description term='设计总监'>{this.state.stakeholders.filter(o=>o.RelationshipType=='设计总监').length>0?this.state.stakeholders.filter(o=>o.RelationshipType=='设计总监')[0].Name:'暂无'}</Description>
            <Description term='施工总监'>{this.state.stakeholders.filter(o=>o.RelationshipType=='施工总监').length>0?this.state.stakeholders.filter(o=>o.RelationshipType=='施工总监')[0].Name:'暂无'}</Description>
          </DescriptionList>
          <DescriptionList style={{ margin: '12px 0' }} col="1">
              <Description term="其他成员">
                  {this.state.stakeholders.filter(o=>o.RelationshipName=='工程参与人员').length>0?
                    this.state.stakeholders.filter(o=>o.RelationshipName=='工程参与人员').map((item) => {return(<span key={item.AttachId} style={{marginRight:'15px'}}>{item.AttachName}</span>)})
                    :''
                  }
              </Description>
          </DescriptionList>
        </Card>
        <Card 
          title={<h4><Icon type="copy" style={{marginRight:'10px'}}/>标段清单</h4>}
          style={{ margin: '15px 0' }} 
          extra={
            <Button type='primary' size='small' onClick={()=>{router.push('/bidSection/list/'+this.Id)}}>
              <Icon type="ellipsis" />
              查看全部
            </Button>
          }
        >
          <Table
            size='small'
            rowKey={record => record.Id}
            columns={this.Cols}
            dataSource={this.state.bidsections}
          >
          </Table>
        </Card>
      </PageHeaderWrapper>
    )
  }
}

export default Details;