import React, { PureComponent } from 'react';
import { Tree, Input, Icon, Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const { TreeNode } = Tree;
const Search = Input.Search;

class Catalog extends PureComponent{

    handleTreeExpand = () => {

    }

    render(){
        return(
            <PageHeaderWrapper
                title='综合目录'
            >
                <Card>
                    <Search style={{ marginBottom:'8px',width:'300px'}} placeholder='搜索框' />
                    <Tree
                        showIcon
                        defaultSelectedKeys={['0-0-0']}
                        switcherIcon={<Icon type='down' />}
                        onExpand={this.handleTreeExpand}
                    >
                        <TreeNode icon={<Icon type='home' />} title='老旧小区'>
                            <TreeNode icon={<Icon type='copy' />} title='建设一标段' >
                                <TreeNode icon={<Icon type='project' />} title='三水湾公园' />
                                <TreeNode icon={<Icon type='project' />} title='三水湾公园' />
                                <TreeNode icon={<Icon type='project' />} title='三水湾公园' />
                                <TreeNode icon={<Icon type='project' />} title='三水湾公园' />
                            </TreeNode>
                            <TreeNode icon={<Icon type='copy' />} title='建设二标段' >
                                <TreeNode icon={<Icon type='project' />} title='三水湾公园' />
                            </TreeNode>
                            <TreeNode icon={<Icon type='copy' />} title='建设三标段' >
                                <TreeNode icon={<Icon type='project' />} title='三水湾公园' />
                            </TreeNode>
                        </TreeNode>
                        <TreeNode icon={<Icon type='home' />} title='背街小巷'>
                            <TreeNode icon={<Icon type='copy' />} title='新嘉一标段' >
                                <TreeNode icon={<Icon type='project' />} title='三水湾公园' />
                            </TreeNode>
                            <TreeNode icon={<Icon type='copy' />} title='新嘉一标段' >
                                <TreeNode icon={<Icon type='project' />} title='三水湾公园' />
                            </TreeNode>
                            <TreeNode icon={<Icon type='copy' />} title='新嘉一标段' >
                                <TreeNode icon={<Icon type='project' />} title='三水湾公园' />
                            </TreeNode>
                        </TreeNode>
                    </Tree>
                </Card>
            </PageHeaderWrapper>
        )
    }
}

export default Catalog;