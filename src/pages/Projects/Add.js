import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AddForm from './components/AddForm';
class Add extends PureComponent{

    render(){
        return(
            <PageHeaderWrapper
                title='项目新增'
            >
             <AddForm></AddForm>
            </PageHeaderWrapper>
        )
    }
}

export default Add;