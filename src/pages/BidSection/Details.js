import React,{ PureComponent, Fragment } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card,Icon, Row,Col,Button,Steps,Table } from 'antd';
import axios from 'axios';
import DescriptionList from '@/components/DescriptionList';
import { bidSectionQuery } from '@/services/bidSection';
import { workStageList } from '@/services/workstage';
import bidLogo from '@/assets/tags.png';
import router from 'umi/router';
import styles from './Details.less';

const { Step } = Steps;
const { Description } = DescriptionList;

class Details extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            bidSection:{},
            courtProjects:[],
            roadProjects:[],
            workStage:[],
        }
        this.Id = this.props.match.params.id;
        this.projectCols=[{
            title:'序号',
            width: 50,
            dataIndex:'ID',
            render:(text,record,index) => `${index + 1}`
        },
        {
            title:'项目编号',
            dataIndex:'ProjectNumber',
            key:'ProjectNumber'
        },
        {
            title:'项目名称',
            dataIndex:'ProjectName',
            key:'ProjectlName'
        },
        {
            title:'竣工日期',
            dataIndex:'CompletedDate',
            key:'CompletedDate'
        },
        {
            title:'投资估算',
            dataIndex:'ProjectAmount',
            key:'ProjectAmount'
        },
        {
            title:'合同金额',
            dataIndex:'ContractAmount',
            key:'ContractAmount'
        },
        {
            title:'操作',
            key:'action',
            render:(text,record) => (
                <a href="javascrips:;" onClick={this.handleToProject.bind(this,record)}>
                    <Icon type="search" />详情
                </a>
            )
        }];
    }

    getData = () =>{
        let _self = this;
        axios.post(bidSectionQuery,{Id: _self.Id}).then(res => {
            let data = res.data;
            if(data.Status == 'true'){
                let detail = data.Data;
                let courts = [];
                let roads = [];

                detail.courtProjects.map((item) => {
                    let rowdata = {
                        ID:item.ID,
                        ProjectNumber: item.ProjectNumber,
                        ProjectName: item.ProjectName,
                        CompletedDate: item.CheckDate,
                        ProjectAmount: item.Investment,
                        ContractAmount: item.ContractAmount,
                    }
                    courts.push(rowdata);
                });

                detail.roadProjects.map((item) => {
                    let rowdata = {
                        ID:item.ID,
                        ProjectNumber: item.ProjectNumber,
                        ProjectName: item.RoadName,
                        CompletedDate: item.CheckDate,
                        ProjectAmount: item.Investment,
                        ContractAmount: item.ContractAmount,
                    }
                    roads.push(rowdata);
                });

                _self.setState({
                    bidSection:detail.bidSection,
                    courtProjects:courts,
                    roadProjects:roads
                })
                
            }
        })
    }

    getProps = () =>{
        axios.post(workStageList).then(res => {
            console.log(res)
            let data = res.data;
            if(data.Status == 'true'){
                let workStages = data.Data.list;
                this.setState({
                    workStage: workStages
                })
            }
        })
    }

    //编辑
    handleToEdit = () => {
        const Id = this.Id;
        router.push('/bidSection/edit/'+ Id);
    }

    //子项目查看详情
    handleToProject = (record) => {
        const Id = this.Id;
        router.push('/bidSection/details/'+ Id);
    }

    //进度管理
    handleClickProgress = () => {
        const Id = this.Id;
        router.push('/bidSection/progress/' + Id);
    }
    //质安管理
    handleClickQualSecu = () => {
        const Id = this.Id;
        router.push('/bidSection/sec/' + Id);
    }
    //资料管理
    handleClickFile = () => {
        const Id = this.Id;
        router.push('/bidSection/doc/' + Id);
    }
    //设计管理
    handleClickDesign = () => {
        const Id = this.Id;
        router.push('/bidSection/design/' + Id);
    }
    componentDidMount = () =>{
        this.getData();
        this.getProps();
    }

    render(){
        return(
            <PageHeaderWrapper
                title={'标段号：' + this.state.bidSection.BidSectionCode}
                logo={
                    <img src={bidLogo} />
                }
                action={
                    <Fragment>
                        <Button type="primary" onClick={this.handleToEdit}>
                            <Icon type="edit" />编辑
                        </Button>
                        <Button type="primary">
                            <Icon type="printer" />打印
                        </Button>
                    </Fragment>
                }
            >
                <Row gutter={24}>
                    <Col lg={6} sm={12}>
                        <div className={styles.manageCard} style={{background:'#CC3333'}} onClick={this.handleClickFile}>
                            <Icon type="snippets" style={{marginRight:'20px'}}/>
                            资料管理
                        </div>
                    </Col>
                    <Col lg={6} sm={12}>
                        <div className={styles.manageCard} style={{background:'#FF9900'}} onClick={this.handleClickQualSecu}>
                            <Icon type="alert" style={{marginRight:'20px'}}/>
                            质安管理
                        </div>
                    </Col>
                    <Col lg={6} sm={12}>
                        <div className={styles.manageCard} style={{background:'#66CC99'}} onClick={this.handleClickProgress}>
                            <Icon type="ordered-list" style={{marginRight:'20px'}}/>
                            进度管理
                        </div>
                    </Col>
                    <Col lg={6} sm={12}>
                        <div className={styles.manageCard} style={{background:'#6699CC'}} onClick={this.handleClickDesign}>
                            <Icon type="picture" style={{marginRight:'20px'}}/>
                            设计管理
                        </div>
                    </Col>
                </Row>
                
                <Card title={<h4><Icon type="book" style={{marginRight:'10px'}}/>基本信息</h4>}  style={{ margin: '15px 0' }}>
                    <DescriptionList>
                        <Description term='标段序号'>{this.state.bidSection.BidSectionCode}</Description>
                        <Description term='标段名称'>{this.state.bidSection.BidSectionName}</Description>
                        <Description term='所属街道'>{this.state.bidSection.Street}</Description>
                        <Description term='投资估算'>{this.state.bidSection.Invest}</Description>
                        <Description term='合同金额'>{this.state.bidSection.ContractAmount}</Description>
                        <Description term='投资进度'>{this.state.bidSection.ContractAmountPercentage + '%'}</Description>
                    </DescriptionList>
                    <DescriptionList style={{ margin: '12px 0' }} col="1">
                        <Description term="范围描述">
                            {this.state.bidSection.ScopeDesc}
                        </Description>
                    </DescriptionList>
                </Card>
                <Card title={<h4><Icon type="team" style={{marginRight:'10px'}}/>参与人员</h4>} style={{ margin: '15px 0' }}>
                    <DescriptionList style={{ marginBottom: 24 }}>
                        <Description term='设计负责人'>{this.state.bidSection.ContractDesigner}</Description>
                        <Description term='施工负责人'>{this.state.bidSection.ContractManager}</Description>
                    </DescriptionList>
                    <DescriptionList style={{ margin: '12px 0' }} col="1">
                        <Description term="备注">
                            {this.state.bidSection.Remark}
                        </Description>
                    </DescriptionList>
                    <DescriptionList style={{ margin: '12px 0' }} col="1">
                        <Description term="工作进度">
                            <Steps progressDot current={parseInt(this.state.bidSection.BidSectionWork)}>
                                {this.state.workStage.map(item => 
                                    <Step key={item.WorkStageCode} title={item.WorkStageName} />
                                )}
                            </Steps>
                        </Description>
                    </DescriptionList>
                    
                </Card>
                <Card title={<h4><Icon type="tool" style={{marginRight:'10px'}}/>施工单位</h4>} style={{ margin: '15px 0' }}>
                    <DescriptionList>
                        <Description term='施工单位'>{this.state.bidSection.Builder}</Description>
                        <Description term='承包老板'>{this.state.bidSection.BuilderBoss}</Description>
                        <Description term='分管领导'>{this.state.bidSection.BuilderLeader}</Description>
                        <Description term='项目经理'>{this.state.bidSection.BuilderManager}</Description>
                        <Description term='专职安全员'>{this.state.bidSection.BuilderSecurity}</Description>
                    </DescriptionList>
                </Card>
                <Card  title={<h4><Icon type="copy" style={{marginRight:'10px'}}/>项目清单</h4>} style={{ margin: '15px 0' }}>
                    <Table
                        size='small'
                        rowKey={record => record.ID}
                        columns={this.projectCols}
                        dataSource={this.state.courtProjects}
                    >
                    </Table>                     
                </Card>
            </PageHeaderWrapper>
        )
    }
}

export default Details;