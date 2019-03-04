import React,{Component,Fragment} from 'react';
import { Row, Col, Card, List,Avatar,Tabs } from 'antd';
import axios from 'axios';
import SettingBase from './SettingBase';
import TimeEcharts from './TimeEcharts';

const { TabPane } = Tabs;

class Setting extends Component{
    render(){
        return(
            <Card bordered={false} bodyStyle={{ padding: 0 }}>
                <Tabs size="large" tabBarStyle={{ margin: '0 20px',marginBottom:'20px' }}>
                    <TabPane tab='基本设置' key='base'>
                        <SettingBase />
                    </TabPane>
                    <TabPane tab='安全设置' key='security'>
                        <TimeEcharts />
                    </TabPane>
                </Tabs>
            </Card>
        )
    }
}

export default Setting;