import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AddForm from './components/AddForm';
class UserEdit extends PureComponent{

    render(){
        return(
            <PageHeaderWrapper
                title='用户编辑'
            >
             <AddForm></AddForm>
            </PageHeaderWrapper>
        )
    }
}

export default UserEdit;