import React,{Component} from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import EditForm from './components/EditForm';

class Edit extends Component{
    constructor(props){
        super(props)
        this.Id = this.props.match.params.id;
    }

    render(){
        return (
            <PageHeaderWrapper>
                <EditForm bId={this.Id}/>
            </PageHeaderWrapper>
        )
    }
}

export default Edit;