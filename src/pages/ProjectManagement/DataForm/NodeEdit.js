import React,{Component,Fragment} from 'react';
import { Row,Col,Icon,Input,Select, Button,Progress,InputNumber  } from 'antd';

const Option = Select.Option;
const NodeData = [{code:100,name:'准备阶段'},{code:101,name:'设计'},{code:102,name:'招投标'},{code:103,name:'施工'},{code:104,name:'竣工验收'}];
const ChildNodeData = {
    100:[{code:1,name:'谋划'},{code:2,name:'规划'},{code:3,name:'立项'}],
    101:[{code:4,name:'方案设计'},{code:5,name:'施工图设计'}],
    102:[{code:6,name:'招投标'},{code:7,name:'项目招投标'},{code:8,name:'施工招投标'}],
    103:[{code:9,name:'施工'}],
    104:[{code:10,name:'竣工验收'}]
}


class NodeEdit extends Component{
    constructor(props){
        super(props);
        this.state={
            Node:NodeData[0]["code"],
            ChildNodes:[],
            projectProgress:30
        }
    }

    componentDidMount = () =>{
        const content =this.props.data;

    }

    handleNodeChange = (value) =>{
        debugger;
        console.log(ChildNodeData[value])
        const nodes=ChildNodeData[value];
        this.setState({
            Node:value,
            ChildNodes:nodes
        })
    }

    handleNumChange = (value) =>{
        this.setState({
            projectProgress:value
        })
    }

    render(){
        const content =this.props.data;
        return(
            <div style={{padding:'10px 40px'}}>
                <Row style={{margin:'15px 0'}}>
                    <Col span={4}>名称：</Col>
                    <Col span={20}><Input value={content.name}/></Col>
                </Row>
                <Row style={{margin:'15px 0'}}>
                    <Col span={4}>阶段：</Col>
                    <Col span={20}>
                        <Select
                            defaultValue='请选择'
                            style={{ width: 120 }}
                            onChange={this.handleNodeChange}
                        >
                            {NodeData.map(item => <Option key={item.code}>{item.name}</Option>)}
                        </Select>
                        <Select
                            style={{ width: 120 }}
                        >
                            {ChildNodeData[this.state.Node].map(item => <Option key={item.code}>{item.name}</Option>)}
                        </Select>
                    </Col>
                </Row>
                <Row style={{margin:'15px 0'}}>
                    <Col span={4}>进度：</Col>
                    <Col span={20}>
                    <Progress style={{ width: 170,marginRight:'10px'}} percent={this.state.projectProgress}/>
                    <InputNumber min={0} max={100} defaultValue={this.state.projectProgress} onChange={this.handleNumChange}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default NodeEdit;