import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AddForm from './components/AddFormForGroup';
class GroupEdit extends PureComponent{

    render(){
        return(
            <PageHeaderWrapper
                title='单位编辑'
            >
             <AddForm></AddForm>
            </PageHeaderWrapper>
        )
    }
}

export default GroupEdit;