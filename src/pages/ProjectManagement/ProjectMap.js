import React,{Component} from 'react';
import L from '@/refs/leafletExtends';
import { Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './ProjectMap.less';

let mapConfig = {
    baseMap: ['vec', 'vec_anno'],
    center: [30.75, 120.75],
    zoom: 14,
  };

class ProjectMap extends Component{
    constructor(props){
        super(props);
    }

    initMap() {
        let dom = this.mapDom;
        let map = L.map(dom, {
            ...mapConfig,
            crs: L.CRS.EPSG4490,
            attributionControl: false,
            zoomControl: false,
            fullscreenControl: true,
            fullscreenControlOptions: {
                position: 'topright'
            }
        });
        L.tileLayer.getGroupLayer(['vec','vec_anno']).addTo(map);
        this.map = map;
        this.map.on('click',function(e){
            console.log(e.latLng);
        })
    }

    componentDidMount() {
        this.initMap();
    }

    render(){
        return (
            <PageHeaderWrapper
                title="项目管理一张图"
            >
                <Card bordered={false}>
                    <div ref={e => (this.mapDom = e)} className={styles.map}></div>
                </Card>
            </PageHeaderWrapper>
        )
    }
}

export default ProjectMap;