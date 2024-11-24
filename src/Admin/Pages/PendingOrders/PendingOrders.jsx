import React from 'react'
import Table from '../../Components/Table/Table'

const PendingOrders = () => {
    const headers = ['#', 'customer', 'product', 'price', 'quantity', 'status', 'image']
    const data = [{
        '#' : 1,
        customer : 'Ismail	',
        product : 'K8A Magnatic Cooling Fan For Mobile & Ipad – CM Shop',
        price : 500,
        quantity : 2,
        status : 'Pending',
        image : 'image'
    }]
  return (
    <div>
      <h1 className="px-2">Pending Orders</h1>
      <div className="my-10">
        <Table headers={headers} data={data} filter={true} searchInput={true} />
      </div>
    </div>
  )
}

export default PendingOrders
