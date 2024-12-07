import React, { useCallback, useEffect, useState } from 'react'
import Config from '../../../Config/Config'
import Button from '../../Components/Button/Button'
import DatabaseService from '../../Appwrite/Database'
import Alert from '../../../Components/Alert/Alert'

const TermsConditions = () => {
  const [documentID] = useState('67514633001c4e5a1119')
  const [collection] = useState(Config.appWritePagesCollID)
  const [pageData, setPageData] = useState({ title: '', disc: '' })
  const [alert, setAlert] = useState(null)

  const getDataFromDB = useCallback(async () => {
    const res = await DatabaseService.getDocument(documentID, collection)
    setPageData({
      title: res.title,
      disc: res.disc
    })
  }, [])

  useEffect(() => {
    getDataFromDB()
  }, [collection, documentID]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    console.log({pageData});
    const data = {
      title: pageData.title,
      disc: pageData.disc
    }
    console.log({data});
    const res = await DatabaseService.updateDocument(collection, documentID, data)
    setAlert(res)
    getDataFromDB()
  }, [pageData])

  return (
    <div>
      {
        alert && <Alert type={alert.type} message={alert.message} />
      }
      <h1 className="px-2">Manage Terms and Conditions</h1>
      <form className='boxShadow p-5'
        onSubmit={handleSubmit}
      >
        <div className="w-full mb-3">
          <label htmlFor="Title">Title</label> <br />
          <input
            id="Title"
            type="text"
            className="mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2"
            value={pageData.title || ''}
            onChange={(e) => setPageData((prev) => ({ ...prev, title: e.target.value }))}
          />
        </div>
        <div>
          <textarea cols="30" rows="10"
            className='resize-none mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-fit p-5'
            value={pageData.disc || ''}
            onChange={(e) => setPageData((prev) => ({ ...prev, disc: e.target.value }))}
          ></textarea>
        </div>
        <Button title={'update'} />
      </form>
    </div>
  )
}

export default React.memo(TermsConditions)
