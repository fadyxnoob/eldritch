import React, { useCallback, useEffect, useState } from 'react';
import DatabaseService from '../../Admin/Appwrite/Database';
import Config from '../../Config/Config';

const MemberCard = () => {
    const [members, setMembers] = useState([])
    const [collection] = useState(Config.appWriteTeamMembersCollID)

    const getMembers = useCallback(async () => {
        const res = await DatabaseService.getAllDocuments(collection)
        console.log(res.documents);
        setMembers(res.documents)
    }, [])

    useEffect(() => {
        getMembers()
    }, []);

    return (
        <>
            {members?.map((member) => (
                <div key={member.$id} className="w-full sm:w-[50%] lg:w-[35%]">
                    <div className="memberBox size-full">
                        <img
                            src={DatabaseService.ViewImage(member?.image)}
                            alt={member?.title || 'Team Member'}
                            className="w-full h-96 object-cover rounded"
                        />
                        <span></span>
                    </div>
                    <div className="my-5">
                        <h3 className="text-center text-5xl">{member?.title}</h3>
                        <p className="text-center text-lg">{member?.about}</p>
                        <p className="text-center text-lg">{member?.type}</p>
                    </div>
                </div>
            ))}
        </>
    );
}

export default React.memo(MemberCard);
