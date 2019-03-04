import React,{Component,Fragment} from 'react';
import {
    Row,Col,Card,Input,Select,Icon,Button,Dropdown,Menu,message,List,Avatar,Progress,Modal
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import CurrentNodeQuery from './DataFilter/CurrentNodeQuery';
import NodeEdit from './DataForm/NodeEdit';
import roadPic from '@/assets/road.png';
import courtPic from '@/assets/court.png';
import styles from './Projects.less';

const ProjectData=[
    {id:1,name:'桂苑小区',town:'南湖',block:17,CurrentNode:'竣工验收',CurrentParentNode:104,NodeProcess:100,type:'老旧小区'},
    {id:2,name:'许安公寓',town:'嘉北',block:1,CurrentNode:'谋划',CurrentParentNode:100,NodeProcess:40,type:'老旧小区'},
    {id:13,name:'邮电幼儿园南面通道',town:'新嘉',block:7,CurrentNode:'立项',CurrentParentNode:100,NodeProcess:33,type:'背街小巷'},
    {id:14,name:'竹桥街',town:'建设',block:3,CurrentNode:'方案设计',CurrentParentNode:101,NodeProcess:14,type:'背街小巷'},
    {id:3,name:'天宁寺街2号自来水公司',town:'建设',block:3,CurrentNode:'招投标',CurrentParentNode:102,NodeProcess:80,type:'老旧小区'},
    {id:4,name:'中山路自行车厂宿舍',town:'建设',block:4,CurrentNode:'方案设计',CurrentParentNode:101,NodeProcess:50,type:'老旧小区'},
    {id:10,name:'精严北一弄',town:'建设',block:25,CurrentNode:'方案设计',CurrentParentNode:101,NodeProcess:70,type:'背街小巷'},
    {id:11,name:'秀水兜糕作弄',town:'新嘉',block:25,CurrentNode:'施工',CurrentParentNode:103,NodeProcess:70,type:'背街小巷'},
    {id:5,name:'金鑫公寓 少年路84号',town:'建设',block:6,CurrentNode:'方案设计',CurrentParentNode:101,NodeProcess:70,type:'老旧小区'},
    {id:6,name:'竹篱弄25号、29号',town:'建设',block:17,CurrentNode:'竣工验收',CurrentParentNode:104,NodeProcess:10,type:'老旧小区'},
    {id:7,name:'公安宿舍、教委宿舍',town:'新嘉',block:17,CurrentNode:'施工',CurrentParentNode:103,NodeProcess:70,type:'老旧小区'},
    {id:8,name:'桂苑小区',town:'南湖',block:17,CurrentNode:'立项',CurrentParentNode:100,NodeProcess:30,type:'老旧小区'}
];

const getPercent = node =>{
    let Percent = 0;
    switch(node){
        case '谋划': Percent=5; break;
        case '规划': Percent=10; break;
        case '立项': Percent=15; break;
        case '方案设计': Percent=30; break;
        case '招投标': Percent=40; break;
        case '施工': Percent=60; break;
        case '竣工验收': Percent=100; break;
    }
    return Percent;
};

class Projects extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            currentEditItem:null
        }
    }

    showEditModal = item =>{
        this.setState({
            visible:true,
            currentEditItem:item
        })
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
    }

    render(){
        //列表
        const ListContent = ({ data: { type, CurrentNode,NodeProcess } }) => (
            <div className={styles.listContent}>
              <div className={styles.listContentItem}>
                <span>类型</span>
                <p>{type}</p>
              </div>
              <div className={styles.listContentItem} style={{width:'80px',textAlign:'left'}}>
                <span>进度</span>
                <p>{CurrentNode}</p>
              </div>
              <div className={styles.listContentItem}>
                <Progress percent={NodeProcess} status={NodeProcess==100?'success':'active'} strokeWidth={6} style={{ width: 180 }} />
              </div>
            </div>
          );
          

        return (
            <Fragment>
                <PageHeaderWrapper>
                    <Card bordered={false}>
                        <div className={styles.tableList}>
                            <div className={styles.tableListForm}>
                                <CurrentNodeQuery></CurrentNodeQuery>
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
                                                this.showEditModal(item);
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
                    <Modal
                        title='进度编辑'
                        width={640}
                        bodyStyle={{padding: '72px 0'}}
                        destroyOnClose
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                    >
                        <NodeEdit data={this.state.currentEditItem}/>
                    </Modal>
                </PageHeaderWrapper>
            </Fragment>
        )
    }
}

export default Projects;