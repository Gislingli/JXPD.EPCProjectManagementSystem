import React,{Component,Fragment} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, List,Avatar } from 'antd';
import axios from 'axios';
import EditableLinkGroup from '@/components/EditableLinkGroup';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { GetProjectCount } from '@/services/workplace';
import { timeSlot } from '@/utils/Date';
import avaC from '@/assets/avatar-c.png';
import avaR from '@/assets/avatar-r.png';
import msg from '@/assets/msg.png';
import styles from './Workplace.less';

const projectList = [
    {id:6,title:'精严北一弄',town:'建设街道',investment:'90.02',currentNode:'准备阶段-规划',conDate:2019,type:'背街小巷'},
    {id:11,title:'秀水兜糕作弄',town:'新嘉街道',investment:'1621.05',currentNode:'准备阶段-立项',conDate:2020,type:'背街小巷'},
    {id:13,title:'桂苑小区',town:'南湖街道',investment:'13625.67',currentNode:'准备阶段-立项',conDate:2019,type:'老旧小区'},
    {id:15,title:'许安公寓',town:'南湖街道',investment:'1928.49',currentNode:'设计-方案设计',conDate:2020,type:'老旧小区'},
    {id:21,title:'中山路自行车厂宿舍',town:'建设街道',investment:'156.95',currentNode:'准备阶段-立项',conDate:2020,type:'老旧小区'},
    {id:31,title:'长水东岸部分路段',town:'解放街道',investment:'585.80',currentNode:'招投标-施工招投标',conDate:2020,type:'背街小巷'}
]

const projectMsg = [
    {id:1,name:'邮电幼儿园南面通道',log:'进入准备阶段-立项',date:'8小时前'},
    {id:2,name:'天官坊路',log:'进入准备阶段-规划',date:'1小时前'},
    {id:3,name:'中意苑29栋南面通道',log:'新增入系统',date:'2小时前'},
    {id:4,name:'环城西路777号（航运公司）项目',log:'进入准备阶段-立项',date:'3小时前'},
    {id:5,name:'农行宿舍南幢河东街93号南项目',log:'进入招投标-施工招投标',date:'4小时前'}
  ];

  const links = [
    {
      title: '添加标段',
      href: '/BidSection/Add',
    },
    {
        title: '标段清单',
        href: '/BidSection/BidSectionList',
    },
    {
      title: '项目地图',
      href: '/ProjectManagement/ProjectMap',
    },
    {
      title: '新增项目',
      href: '/ProjectManagement/InsertProject',
    },
    {
      title: '项目质量',
      href: '/ProjectManagement/ProjectQuality',
    },
    {
        title: '项目资金',
        href: '/ProjectManagement/ProjectInvest',
    },
  ];

class Workplace extends Component{
    constructor(props){
        super(props);
        this.state={
            projectCount:0,
            roadCount:0,
            courtCount:0,
            currentUser:{
                id:'0000',
                name:'凌力',
                group:'嘉兴规划设计研究院有限公司',
                avatar:'',
                email:'1472505540@qq.com',
                phone:''
            }
        };
    }

    componentDidMount = () =>{
        axios.post(GetProjectCount).then((res)=>{
            
            const data = res.data.Data;
            this.setState({
                projectCount:data.total,
                roadCount:data.roadCount,
                courtCount:data.courtCount
            });
        })
    }


    render(){
        const pageHeaderContent=
            this.state.currentUser ?(
                <div className={styles.pageHeaderContent}>
                  <div className={styles.avatar}>
                    <Avatar size="large" src={this.state.currentUser.avatar} />
                  </div>
                  <div className={styles.content}>
                    <div className={styles.contentTitle}>
                      {timeSlot}好，
                      {this.state.currentUser.name}
                    </div>
                    <div>
                      {this.state.currentUser.group?this.state.currentUser.group:'暂无'} 
                    </div>
                    <div>
                      电话：{this.state.currentUser.phone?this.state.currentUser.phone:'暂无'}  | 邮箱：{this.state.currentUser.email?this.state.currentUser.email:'暂无'}   
                    </div>
                  </div>
                </div>
            ):null;

        const extraContent = (
            <div className={styles.extraContent}>
              <div className={styles.statItem}>
                <p>项目总数</p>
                <p>{this.state.projectCount}</p>
              </div>
              <div className={styles.statItem}>
                <p>老旧小区</p>
                <p>{this.state.courtCount}</p>
              </div>
              <div className={styles.statItem}>
                <p>背街小巷</p>
                <p>{this.state.roadCount}</p>
              </div>
            </div>
          );

        return (
            <Fragment>
                <PageHeaderWrapper 
                    title="工作台"
                    content={pageHeaderContent}
                    extraContent={extraContent}
                >
                    <Row gutter={24}>
                        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
                            <Card
                                className={styles.projectList}
                                style={{ marginBottom: 24 }}
                                title="参与的项目"
                                bordered={false}
                                extra={<Link to="/">查看全部</Link>}
                                bodyStyle={{ padding: 0 }}
                            >
                                {
                                    projectList.map(item => (
                                        <Card.Grid className={styles.projectGrid} key={item.id}>
                                            <Card bodyStyle={{ padding: 0 }} bordered={false}>
                                                <Card.Meta
                                                    title={
                                                        <div className={styles.cardTitle}>
                                                            <Avatar size="small" src={item.type=='背街小巷'?avaR:avaC} />
                                                            <Link to="/">{item.title}</Link>
                                                        </div>
                                                    }
                                                    description={item.type+' | '+item.currentNode}
                                                />
                                                <div>
                                                    街道：{item.town} | 投资：{item.investment}
                                                </div>
                                            </Card>
                                        </Card.Grid>
                                    ))
                                }
                            </Card>
                            <Card
                                bodyStyle={{ padding: 0 }}
                                bordered={false}
                                className={styles.activeCard}
                                title="动态"
                            >
                                <List 
                                    dataSource={projectMsg} 
                                    size="large"
                                    className={styles.activitiesList}
                                    renderItem={item => (
                                        <List.Item key={item.id}>
                                          <List.Item.Meta
                                            avatar={<Avatar size="small" src={msg} />}
                                            title={
                                                <span>
                                                    <a href="/">{item.name}</a>
                                                    &nbsp;项目&nbsp;
                                                    <a href="/">{item.log}</a>
                                                </span>
                                            }
                                            description={item.date}
                                          />
                                        </List.Item>
                                    )}
                                >
                                </List>
                            </Card>
                        </Col>
                        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                            <Card
                                style={{ marginBottom: 24 }}
                                title="快速开始 / 便捷导航"
                                bordered={false}
                                bodyStyle={{ padding: 0 }}
                            >
                                <EditableLinkGroup onAdd={() => {}} links={links} linkElement={Link}></EditableLinkGroup>
                            </Card>    
                        </Col>
                    </Row>
                </PageHeaderWrapper>
            </Fragment>
        )
    }
}

export default Workplace;