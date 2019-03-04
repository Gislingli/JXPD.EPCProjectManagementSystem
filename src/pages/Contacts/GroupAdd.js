import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AddForm from './components/AddFormForGroup';
class GroupAdd extends PureComponent{

    render(){
        return(
            <PageHeaderWrapper
                title='单位新增'
            >
            <AddForm></AddForm>
            </PageHeaderWrapper>
        )
    }
}

export default GroupAdd;