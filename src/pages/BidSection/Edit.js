import React,{Component} from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

class Edit extends Component{
    constructor(props){
        super(props)
        this.Id = this.props.match.params.id;
    }

    render(){
        return (
            <PageHeaderWrapper>
            </PageHeaderWrapper>
        )
    }
}

export default Edit;