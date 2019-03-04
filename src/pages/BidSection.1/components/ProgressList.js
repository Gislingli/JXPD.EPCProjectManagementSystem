import React,{ PureComponent, Fragment } from 'react';
import axios from 'axios';
import { Card,Icon,List,DatePicker,Button,Input,InputNumber,Progress  } from 'antd';
import { bidSectionNodeAdd,bidSectionNodeDelete,bidSectionNodeUpdate } from '@/services/bidSectionNode';
import ProgressEdit from './ProgressEdit';
import styles from '../ProgressMana.less';

class ProgressList extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            datasource:[
                {Id:1,ProgressNode:'设计',NodePlanDate:'2019/01/01至2019/02/02',NodeFactDate:'2019/01/01至2019/02/03',NodeCompletion:100},
                {Id:2,ProgressNode:'需求调研',NodePlanDate:'2019/02/01至2019/03/02',NodeFactDate:'2019/02/01至2019/03/03',NodeCompletion:13.2},
                {Id:3,ProgressNode:'施工图',NodePlanDate:'2019/03/01至2019/03/02',NodeFactDate:'2019/03/01至2019/03/03',NodeCompletion:90},
                {Id:5,ProgressNode:'竣工',NodePlanDate:'2019/07/01至2019/12/01',NodeFactDate:'2019/07/03至2019/12/03',NodeCompletion:80},
                {Id:6,ProgressNode:'竣工验收',NodePlanDate:'2019/12/01至2019/12/12',NodeFactDate:'2019/12/01至2019/12/12',NodeCompletion:20}
            ]
        }
    }

    getData = () => {
        
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleModalOk = () => {
        this.setState({
            visible: false,
        });
    }

    handleModalCancel = () => {
        this.setState({
            visible: false,
        });
    }

    render = () => {
        //列表
        const ListContent = ({ data: { NodePlanDate,NodeFactDate,NodeCompletion } }) => (
            <div className={styles.listContent}>
                <div className={styles.listContentItem} style={{textAlign:'left'}}>
                    <span>计划时间</span>
                    <p>{NodePlanDate}</p>
                </div>
                <div className={styles.listContentItem} >
                    <span>实际时间</span>
                    <p>{NodeFactDate}</p>
                </div>
                <div className={styles.listContentItem}>
                    <span>完成率</span><br />
                    <Progress percent={NodeCompletion} status={NodeCompletion==100?'success':'active'} strokeWidth={6} style={{ width: 180 }} />
                </div>
            </div>
        );

        return (
            <Card
                title='进度列表'
            >
                <List
                    size="large"
                    rowkey="Id"
                    dataSource={this.state.datasource}
                    renderItem={item =>(
                        <List.Item
                        actions={[
                            <a onClick={this.showModal.bind(this)}
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
                                title={item.ProgressNode}
                            />
                            <ListContent data={item} />
                        </List.Item>
                    )}
                >

                </List>
                <ProgressEdit
                    modalVisible={this.state.visible}
                    ModalOk={this.handleModalOk.bind(this)}
                    ModalCancel={this.handleModalCancel.bind(this)}
                />
            </Card>
        )
    }
}

export default ProgressList;