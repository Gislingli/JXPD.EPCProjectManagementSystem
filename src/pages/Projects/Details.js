    import React, { PureComponent,Fragment } from 'react';
    import PageHeaderWrapper from '@/components/PageHeaderWrapper';
    import { Icon,Button,Card,Table,Divider,Popconfirm,message,Row,Col } from 'antd';
    import DescriptionList from '@/components/DescriptionList';
    import router from 'umi/router';
    const { Description } = DescriptionList;
    class Details extends PureComponent{
        constructor(props){
            super(props)
            this.state={

            }
            this.Id = this.props.match.params.id;
          }
        render(){
            return(
                <PageHeaderWrapper
                  title={'项目名称：' + '三水湾公园路'}

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
                    <Description term='项目编号'>123</Description>
                    <Description term='项目名称'>三水湾公园路</Description>
                    <Description term='省级区域'>浙江</Description>
                    <Description term='市级区域'>嘉兴</Description>
                    <Description term='区县级区域'>南湖区</Description>
                    <Description term='镇街道级区域'>新建街道</Description>
                </DescriptionList>
                
            </Card>
            <Card title='详细信息' style={{ margin: '15px 0' }}>
                <DescriptionList>
                    <Description term='建设分类'>背街小巷</Description>
                    <Description term='项目名称'>三水湾公园路</Description>
                    <Description term='省级区域'>浙江</Description>
                    <Description term='市级区域'>嘉兴</Description>
                    <Description term='区县级区域'>南湖区</Description>
                    <Description term='镇街道级区域'>新建街道</Description>
                    <Description term='建设分类'>背街小巷</Description>
                    <Description term='项目名称'>三水湾公园路</Description>
                    <Description term='省级区域'>浙江</Description>
                    <Description term='市级区域'>嘉兴</Description>
                    <Description term='区县级区域'>南湖区</Description>
                    <Description term='镇街道级区域'>新建街道</Description>
                </DescriptionList>
                
            </Card>
                </PageHeaderWrapper>
            )
        }
    }

    export default Details;