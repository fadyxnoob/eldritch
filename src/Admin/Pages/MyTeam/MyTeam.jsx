import React, { useCallback, useState, useEffect } from 'react'
import Table from '../../Components/Table/Table'
import Button from '../../Components/Button/Button'
import DatabaseService from '../../Appwrite/Database';
import Alert from '../../../Components/Alert/Alert';
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import Config from '../../../Config/Config';

const MyTeam = () => {
  const [collection] = useState(Config.appWriteTeamMembersCollID)
  const [membersData, setMembersData] = useState([])
  const [alert, setAlert] = useState(null);

  const headers = ['#', 'name', 'about', 'role', 'image', 'update', 'delete']
  const mapping = {
    '$id': '#',
    'title': 'name',
    'about': 'about',
    'type': 'role',
    'image': 'image'
  }

  const deleteHandler = async (postID, fileID) => {
    const res = await DatabaseService.deleteDocument(collection, postID, fileID)
    setAlert(res)
    getAllMembers()
  }


  const getAllMembers = useCallback(async () => {
    const res = await DatabaseService.getAllDocuments(collection)
    const modifiedRes = await Promise.all(
      res.documents.map((member) => {
        const processedMember = {}
        Object.keys(mapping).forEach((key) => {
          headers[mapping[key]] = member[key] || 'N/A'
        })

        processedMember['#'] = member.$id.split('').reverse('').slice(0, 4).join('')
        processedMember['name'] = member.title
        processedMember['about'] = member.about
        processedMember['role'] = member.type
        const thisImage = DatabaseService.ViewImage(member["image"]);
        processedMember['image'] = (
          <img
            src={thisImage}
            alt={"post image"}
            className="size-20 object-cover"
          />
        );


        processedMember["update"] = (
          <button className="border size-full rounded bg-sky-50">
            <Link to={`/admin/updateMember/${member["$id"]}`}>
              <FaRegEdit className="size-7 text-sky-500 mx-auto my-1" />
            </Link>
          </button>
        );

        processedMember["delete"] = (
          <button
            className="border px-2 size-full rounded bg-red-50"
            onClick={() => deleteHandler(member["$id"], member['image'])}
          >
            <FaDeleteLeft className="size-8 text-red-600 mx-auto my-1" />
          </button>
        );

        return processedMember;

      })
    );
    setMembersData(modifiedRes)

  }, [collection])

  useEffect(() => {
    getAllMembers()
  }, []);




  return (
    <div>
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      <h1 className="px-2">Manage Team</h1>
      <div className="py-10">
        <div className="text-end my-2">
          <Button title={'Add new'} path={'/admin/addMember'} />
        </div>
        <Table filter={true} searchInput={true} headers={headers} data={membersData} />
      </div>
    </div>
  )
}

export default React.memo(MyTeam)
