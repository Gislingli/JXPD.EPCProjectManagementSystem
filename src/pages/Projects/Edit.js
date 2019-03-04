import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AddForm from './components/AddForm';
class Edit extends PureComponent{

    render(){
        return(
            <PageHeaderWrapper
                title='项目编辑'
            >
                <AddForm></AddForm>
            </PageHeaderWrapper>
        )
    }
}

export default Edit;