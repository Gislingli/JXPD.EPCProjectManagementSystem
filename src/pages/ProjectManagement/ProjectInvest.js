import React,{Component,Fragment} from 'react';
import {
    Row,Col,Card,Input,Select,Icon,Button,Dropdown,Menu,message,List,Avatar,Progress,Modal
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import CurrentInvestQuery from './DataFilter/CurrentInvestQuery';
import NodeEdit from './DataForm/NodeEdit';
import roadPic from '@/assets/road.png';
import courtPic from '@/assets/court.png';
import styles from './Projects.less';

const ProjectData=[
    {id:1,name:'桂苑小区',town:'南湖',block:17,invest:10412,type:'老旧小区'},
    {id:2,name:'许安公寓',town:'嘉北',block:1,invest:31043,type:'老旧小区'},
    {id:13,name:'邮电幼儿园南面通道',town:'新嘉',block:7,invest:31043,type:'背街小巷'},
    {id:14,name:'竹桥街',town:'建设',block:3,invest:31043,type:'背街小巷'},
    {id:3,name:'天宁寺街2号自来水公司',town:'建设',block:3,invest:31043,type:'老旧小区'},
    {id:4,name:'中山路自行车厂宿舍',town:'建设',block:4,invest:31043,type:'老旧小区'},
    {id:10,name:'精严北一弄',town:'建设',block:25,invest:31043,type:'背街小巷'},
    {id:11,name:'秀水兜糕作弄',town:'新嘉',block:25,invest:31043,type:'背街小巷'},
    {id:5,name:'金鑫公寓 少年路84号',town:'建设',block:6,invest:31043,type:'老旧小区'},
    {id:6,name:'竹篱弄25号、29号',town:'建设',block:17,invest:31043,type:'老旧小区'},
    {id:7,name:'公安宿舍、教委宿舍',town:'新嘉',block:17,invest:31043,type:'老旧小区'},
    {id:8,name:'桂苑小区',town:'南湖',block:17,invest:31043,type:'老旧小区'}
];

class ProjectInvest extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const ListContent = ({ data: { type, invest } }) => (
            <div className={styles.listContent}>
              <div className={styles.listContentItem}>
                <span>类型</span>
                <p>{type}</p>
              </div>
              <div className={styles.listContentItem} style={{width:'80px',textAlign:'left'}}>
                <span>金额</span>
                <p>{invest}</p>
              </div>
            </div>
          );

        return (
            <Fragment>
                <PageHeaderWrapper>
                    <Card bordered={false}>
                        <div className={styles.tableList}>
                            <div className={styles.tableListForm}>
                                <CurrentInvestQuery></CurrentInvestQuery>
                            </div>
                        </div>
                        <List
                            size="large"
                            rowkey="id"
                            pagination={{
                                pageSize:6
                            }}
                            dataSource={ProjectData}
                            renderItem={item =>(
                                <List.Item
                                    actions={[
                                        <a onClick={e => {
                                                e.preventDefault();
                                            }}
                                        >
                                        编辑
                                        </a>,
                                        <a onClick={e => {
                                            e.preventDefault();
                                        }}
                                        >
                                        删除
                                        </a>
                                    ]}
                                    >
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.type=="背街小巷"?roadPic:courtPic} shape="square" size="large" />}
                                        title={<a href='/'>{item.name}</a>}
                                        description={'区域（街道-网格）：'+item.town+'-'+item.block}
                                    />
                                    <ListContent data={item} />
                                </List.Item>
                            )}
                        >

                        </List>
                    </Card>
                </PageHeaderWrapper>
            </Fragment>
        )
    }
}

export default ProjectInvest;