import React,{ PureComponent,Fragment } from 'react';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ProgressGantt from './components/ProgressGantt';
import ProgressAdd from './components/ProgressAdd';
// import ModalT from './components/ModalT';
import ProgressList from './components/ProgressList';
import axios from 'axios';
import { Button,Icon } from 'antd';
import { bidSectionQuery } from '@/services/bidSection';

class Progress extends PureComponent{
    constructor(porps){
        super(porps);
        this.state={
            bidSection:{},
            visible: false,
        }
        this.Id = this.props.match.params.id;
    }

    showAddModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleAddModalOk = () => {
        this.setState({
            visible: false,
        });
    }

    handleAddModalCancel = () => {
        this.setState({
            visible: false,
        });
    }

    getData = () =>{
        let _self = this;
        axios.post(bidSectionQuery,{Id: _self.Id}).then(res => {
            let data = res.data;
            if(data.Status == 'true'){
                let detail = data.Data;

                _self.setState({
                    bidSection:detail.bidSection,
                })
            }
        })
    }

    componentDidMount = () =>{
        this.getData();
    }

    render = () =>{
        const description = (
            <div>进度总览/管理</div>
        )

        return(
            <Fragment>
                <PageHeaderWrapper
                    title={'标段号：' + this.state.bidSection.BidSectionCode}
                    content={description}
                    action={
                        <Fragment>
                            <Button type="primary" onClick={this.showAddModal.bind(this)}>
                                <Icon type="plus" />添加
                            </Button>
                            <Button type="primary">
                                <Icon type="printer" />打印
                            </Button>
                        </Fragment>
                    }
                >
                    <ProgressList />
                    <ProgressAdd 
                        modalVisible={this.state.visible}
                        AddModalOk={this.handleAddModalOk.bind(this)}
                        AddModalCancel={this.handleAddModalCancel.bind(this)}
                    />
                    
                    <ProgressGantt />
                </PageHeaderWrapper>
            </Fragment>
        )
    }
}

export default Progress;