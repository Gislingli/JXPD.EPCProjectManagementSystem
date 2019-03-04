import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AddForm from './components/AddForm';
class UserAdd extends PureComponent{

    render(){
        return(
            <PageHeaderWrapper
                title='人员新增'
            >
            <AddForm></AddForm>
            </PageHeaderWrapper>
        )
    }
}

export default UserAdd;