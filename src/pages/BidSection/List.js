import React,{ Component } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Icon,Input,InputNumber,Button,Card,Table,Divider,Popconfirm,message,Row,Col,Cascader,DatePicker } from 'antd';
import { GetListByEngineering,Delete } from '@/services/bidSection';
import router from 'umi/router';
import axios from 'axios';
import styles from './List.less';

class List extends Component{
    constructor(props){
        super(props);
        this.state={
          bidsectionData:[],
          area:[],
          queryMinInvest:0,
          queryMaxInvest:0,
          queryName:'',
          queryArea:'',
          queryDate:'',
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
              title:'操作',
              key:'action',
              render:(text,record) => (
                <span>
                  <a href="javascrips:;" onClick={this.handleDetails.bind(this,record)}>
                      <Icon type="search" />详情
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
        ];
        this.handleQueryNameChange = this.handleQueryNameChange.bind(this);
        this.handleMinInvestChange = this.handleMinInvestChange.bind(this);
        this.handleMaxInvestChange = this.handleMaxInvestChange.bind(this);
        this.handleQueryDate = this.handleQueryDate.bind(this);
        this.handleAreaChange = this.handleAreaChange.bind(this);
        this.queryBidSectionByName = this.queryBidSectionByName.bind(this);
    }

    //获取数据
    getData = () => {
        axios.post(GetListByEngineering,{engineeringId:this.Id}).then(res => {
            debugger;
            const data = res.data;
            if(data.Status){
                this.setState({
                    datasource:data.Data.BidSection
                });
            }
        })

      // const bidsectionData = [
      //   {Id:'5',BidSectionCode:1,BidSectionName:'建设二标段',BidSectionWork:'施工图',BidSectionArea:'建设街道',PlanInvestmentAmount:11132.11,ContractAmount:86542.25,ActualInvestmentAmount:15425.15,InvestmentPercentage:'17.5%',BidSectionLeader:'苏友富'},
      //   {Id:'6',BidSectionCode:1,BidSectionName:'建设四标段',BidSectionWork:'施工图',BidSectionArea:'建设街道',PlanInvestmentAmount:11132.11,ContractAmount:86542.25,ActualInvestmentAmount:15425.15,InvestmentPercentage:'17.5%',BidSectionLeader:'苏友富'}
      // ];

      
    }

    //查询工程名称
    queryBidSectionByName = () => {
      const queryStr = this.state.queryName;
      if(queryStr.length>0){
          const data = [{Id:'6',BidSectionCode:1,BidSectionName:'建设四标段',BidSectionWork:'施工图',BidSectionArea:'建设街道',PlanInvestmentAmount:11132.11,ContractAmount:86542.25,ActualInvestmentAmount:15425.15,InvestmentPercentage:'17.5%',BidSectionLeader:'苏友富'}];

          setTimeout(()=>{
              this.setState({
                bidsectionData:data
              })
          },1000);
      }
      else{
          message.error('关键字不能为空!');
          this.getData();
      }
        
    }

    //详情
    handleDetails = (record) =>{
        const Id = record.Id;
        router.push('/bidSection/details/'+Id);
    }

    //删除
    handleDelete = (record) =>{
      this.getData();
    }

    componentDidMount = () =>{
      this.getData();
    }

    //监测名称查询
    handleQueryNameChange(e){
      const value = e.target.value;
      this.setState({
          queryName:value
      });
    }

    //监测区域查询
    handleAreaChange(value){
        console.log(value);
        this.setState({
            queryArea:value[2]
        })
    }

    //监测金额最小值
    handleMinInvestChange(value){
        this.setState({
            queryMinInvest:value
        });
    }

    //监测金额最大值
    handleMaxInvestChange(value){
        this.setState({
            queryMaxInvest:value
        })
    }

    //按日期查询
    handleQueryDate(date,dateString){
        this.setState({
            queryDate:dateString
        })
        //console.log(date,dateString);
    }

    render(){
        const titleContent = (
            <div>
                <label>标段清单</label>
                <Button type="primary" style={{float:'right'}} onClick={()=>{router.push('/bidSection/add')}}>
                    <Icon type="plus" />添加标段
                </Button>
            </div>
        ); 

        return(
            <PageHeaderWrapper
                title={titleContent}
            >
                <Card style={{marginTop:'20px'}}>
                  <Row className={styles.rowSpace}>
                      <Col span={11}>
                          <span>名称：</span>
                          <Input className={styles.ctrl}  onChange={this.handleQueryNameChange}/>
                          <Button type='primary' onClick={this.queryBidSectionByName}>查询</Button>
                      </Col>
                      <Col span={11}>
                          <span>金额：</span>
                          <span className={styles.marginRight}>
                              <InputNumber defaultValue={0} onChange={this.handleMinInvestChange}/>
                                  <span style={{margin:'0 10px'}}>-</span>
                              <InputNumber defaultValue={0} onChange={this.handleMaxInvestChange}/>
                          </span>
                          <Button type='primary'>查询</Button>
                      </Col>
                  </Row>
                  <Row className={styles.rowSpace}>
                      <Col span={11}>
                          <span>区域：</span>
                          <Cascader 
                              className={styles.ctrl} 
                              options={this.state.area} 
                              placeholder="选择区域" 
                              expandTrigger="hover"
                              onChange={this.handleAreaChange}
                          />
                      </Col>
                      <Col span={11}>
                          <span>日期：</span>
                          <DatePicker onChange={this.handleQueryDate} />
                      </Col>
                  </Row>
                  <Divider />
                  <Table
                      size='small'
                      rowKey={record => record.Id}
                      columns={this.Cols}
                      dataSource={this.state.datasource}
                  >
                  </Table>
                </Card>
            </PageHeaderWrapper>
        )
    }
}

export default List;