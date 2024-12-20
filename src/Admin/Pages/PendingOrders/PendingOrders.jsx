import React, {useState, useEffect} from 'react'
import DatabaseService from '../../Appwrite/Database'
import Config from '../../../Config/Config'
import Table from '../../Components/Table/Table'

const PendingOrders = () => {
  const [data, setData] = useState([])
  const headers = ['#', 'customer', 'product', 'price', 'quantity', 'status', 'total price', 'image']

  useEffect(() => {
    // Fetch data from the database
    const fetchDataFromDB = async () => {
      const userOrderRes = await DatabaseService.getAllDocuments(Config.appWriteManageUserOrdersCollID)
      const data = await Promise.all(userOrderRes.documents.map(async (order, index) => {
        const imageRes = await DatabaseService.getDocument(order.proID, Config.appWriteProductCollID)
        console.log(imageRes.image);
        return {
          '#': index + 1,
          customer: order.customer || 'Sheeda',
          product: order.proID,
          price: order.price,
          quantity: order.quantity,
          status: order.status,
          'total price': order.price * order.quantity,
          image: <img src={DatabaseService.ViewImage(imageRes.image)} alt={order.product} className="w-20 h-20" />
        }
      }))
      setData(data)
    }
    fetchDataFromDB()
  }, [])
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
