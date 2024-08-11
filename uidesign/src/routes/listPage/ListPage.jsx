import React, { Suspense } from 'react'
import './listpage.scss'
import { listData } from '../../lib/dummydata'
import Filter from '../../components/filter/Filter';
import Card from '../../components/card/Card'
import Map from '../../components/map/Map';
import { Await, useLoaderData } from 'react-router-dom';

function ListPage() {

    const data = useLoaderData()

  return (
    <div className='listpage'>
    <div className="listcontainer">
        <div className="wrapper">
            <Filter/>
          <Suspense fallback={<p>Loading...</p>}>
          <Await
          resolve={data.postResponse}
          errorElement={
            <p>Error loading Posts!</p>
          }
        >
          {(postResponse) => postResponse.data.map(post=>(
            <Card key={post.id} item={post}/>
          ))}
        </Await>
          </Suspense>
        </div>
        </div>
    <div className="mapcontainer">
    <Suspense fallback={<p>Loading...</p>}>
          <Await
          resolve={data.postResponse}
          errorElement={
            <p>Error loading Posts!</p>
          }
        >
          {(postResponse) => <Map item={postResponse.data}/>}
        </Await>
          </Suspense>
      
    </div>
    </div>
  )
}

export default ListPage