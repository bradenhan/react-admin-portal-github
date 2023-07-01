import React from 'react'
import { Button,Space  } from 'antd';

// import {fetchGetComments} from '../../utils/api'

export default function HomeIndex() {

  // 获取数据
  const loadData = async ()=> {
    // const menusListData = await fetchGetMenus();
    // console.log('commentData')
    // console.log(commentData) 
  }

  // 新增数据
  const addData = ()=> {
    fetch("http://localhost:8001/comments",{ 
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:window.JSON.stringify({ "id": 61, "body": "some comment", "postId": 1 })
      }).then((res)=>{ 
        return res.json() //返回一个Promise,解析成JSON,具体请看下面返回的数据
    }).then(function(res){
        console.log(res) //获取json数据
    }).catch(function(error){
        console.log(error)  //请求错误时返回
    })
  }

   // 修改数据
   const modifyData = ()=> {
    fetch("http://localhost:8001/comments/61",{ 
        // method:'PUT',  //  注意这里，这里会全部更新，如果有些参数没写，则默认就会去掉，需要特别注意
        method:'PATCH', //  注意这里，这里会局部更新
        headers: {
          'Content-Type': 'application/json'
        },
        body:window.JSON.stringify({ "body": "修改后 some comment" })
      }).then((res)=>{ 
        return res.json() //返回一个Promise,解析成JSON,具体请看下面返回的数据
    }).then(function(res){
        console.log(res) //获取json数据
    }).catch(function(error){
        console.log(error)  //请求错误时返回
    })
  }

  // 删除数据
  const deleteData = ()=> {
    fetch("http://localhost:8001/comments/61",{  
        method:'DELETE',   
       
      }).then((res)=>{ 
        return res.json() //返回一个Promise,解析成JSON,具体请看下面返回的数据
    }).then(function(res){
        console.log(res) //获取json数据
    }).catch(function(error){
        console.log(error)  //请求错误时返回
    })
  }

  return (
    <div>    
    <Space>
      <Button type="primary" onClick={()=>{
        loadData()
      }}>加载</Button>

      <Button type="primary" onClick={()=>{
        addData()
      }}>增加</Button>  

      <Button type="primary" onClick={()=>{
        modifyData()
      }}>修改</Button>

      <Button type="primary" onClick={()=>{
        deleteData()
      }}>删除</Button>
      </Space> 
    </div>
  )
}
