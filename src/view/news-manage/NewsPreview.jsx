import React, { useEffect, useState } from 'react'
import { Descriptions,Divider } from 'antd';
import { useParams } from 'react-router-dom'
import moment from 'moment'

import MarkdownEditor from "./components/MarkdownEditor/Index";

// fetchGetNewsDetail
import { 
    fetchGetNewsDetail
  } from "../../utils/api";

export default function NewsPreview() { 
    const params = useParams()
    let id = params.id  

    const [NewsDetailData, setNewsDetailData] = useState(null) 
    const fetchData = async () => {
        let params = {
            id: id, 
        };
        const getNewsDetailData = await fetchGetNewsDetail(params);
        console.log(getNewsDetailData)
        setNewsDetailData(getNewsDetailData[0]);
      };

    useEffect(() => { 
        fetchData();
    }, [ ])

    const auditStateList = ['未审核','审核中','已通过','未通过']
    const publishStateList = ['未发布','待发布','已发布','已下线']
    const colorStateList = ['blcak','orange','green','red']
    
  return (
    <div> {
      !!NewsDetailData && <div> 
      <Descriptions title={NewsDetailData?.title}>
        <Descriptions.Item label="分类">{NewsDetailData.category.title}</Descriptions.Item>
        <Descriptions.Item label="创建者">{NewsDetailData.author}</Descriptions.Item>
        <Descriptions.Item label="创建时间">{moment(NewsDetailData.createTime).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
        <Descriptions.Item label="发布时间">{NewsDetailData.publishTime ? moment(NewsDetailData.publishTime).format('YYYY-MM-DD HH:mm:ss'):'-'}</Descriptions.Item>
        <Descriptions.Item label="区域">{NewsDetailData.region}</Descriptions.Item>
        <Descriptions.Item label="审核状态"><span style={{color : colorStateList[NewsDetailData.auditState]}}>{auditStateList[NewsDetailData.auditState]} </span></Descriptions.Item>   
        <Descriptions.Item label="发布状态"><span style={{color : colorStateList[NewsDetailData.publishState]}}>{publishStateList[NewsDetailData.publishState]}</span></Descriptions.Item>  
        <Descriptions.Item label="访问数量">{NewsDetailData.view}</Descriptions.Item> 
        <Descriptions.Item label="点赞数量">{NewsDetailData.star} </Descriptions.Item> 
        <Descriptions.Item label="评论数量">0</Descriptions.Item>
      </Descriptions>
      </div>
    }
    <Divider><strong>文章内容</strong></Divider>
    <div> 
      <MarkdownEditor  readOnly = {true} value= {NewsDetailData?.content}></MarkdownEditor>
    </div>
    </div>
  )
}
