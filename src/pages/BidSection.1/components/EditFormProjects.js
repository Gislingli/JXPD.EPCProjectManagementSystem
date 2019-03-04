import React, { Component } from 'react';
import { Card,Icon, Input,Table,Button,Modal,Transfer  } from 'antd';

class EditFormProjects extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            leftData:[],
            rightData:[],
        }
    }

    showModal = () => {
        const data = this.getProjectData();
        console.log(data)
        this.setState({
            visible: true,
            leftData:data.left,
            rightData:data.right
        });

    }

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
        this.props.getKeys(this.state.rightData)
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    filterOption = (inputValue, option) => option.title.indexOf(inputValue) > -1

    componentWillUnmount = () => {
        this.setState=({
            visible:false,
            projectType:''
        })
    }

    getProjectData = () =>{
        const targetKeys = [];
        const projectData = [];
        const data = this.props.data;
        const sdata = this.props.selectData;
        debugger;
        for(let i=0; i<data.length; i++){
            const item = {
                key:data[i].ID,
                title:data[i].ProjectName,
            }
            projectData.push(item);
        }

        for(let i=0; i<sdata.length; i++){
            targetKeys.push(sdata[i].ID);
        }

        const reModel ={
            right:[...targetKeys],
            left:[...projectData]
        }

        return reModel;
    }

    handleChange = (targetKeys) => {
        this.setState({ 
            rightData:targetKeys 
        });
    }

    render(){
        
        return(
        <div>
            <Button type="primary" style={{float:'right',marginBottom:'10px',zIndex:'999'}} onClick={this.showModal}>
                <Icon type="plus" />管理
            </Button>
            <Modal
                width={720}
                title={this.props.title}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >

                <Transfer 
                    dataSource={this.state.leftData}
                    listStyle={{
                        width: 310,
                        height: 300,
                      }}
                    titles={['备选项目', '本标段项目']}
                    filterOption={this.filterOption}
                    onChange={this.handleChange}
                    showSearch
                    targetKeys={this.state.rightData}
                    render={item => item.title}
                />
            </Modal>
        </div>
        )
    }
}

export default EditFormProjects;