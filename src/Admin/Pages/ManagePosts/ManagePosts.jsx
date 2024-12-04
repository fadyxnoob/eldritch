import React, { useCallback, useEffect, useState } from "react";
import Table from "../../Components/Table/Table";
import DatabaseService from "../../Appwrite/Database";
import Config from "../../../Config/Config";
import Alert from "../../../Components/Alert/Alert";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import Button from '../../Components/Button/Button'

const ManagePosts = () => {
  const [totalPosts, setTotalPosts] = useState([]);
  const [alert, setAlert] = useState(null);

  const headers = [
    "#",
    "title",
    "category",
    "status",
    "image",
    "date",
    "update",
    "delete",
  ];

  const headerMapping = {
    $id: "#",
    title: "title",
    cat: "category",
    status: "status",
    date: "date",
    image: "image",
  };

  // Handle post status update
  const handlePostStatus = useCallback(async (val, docID) => {
    const collection = Config.appWritePostsCollID;
    try {
      const newStatus = val === "Pending" ? "Active" : "Pending";
      await DatabaseService.updateDocument(collection, docID, { status: newStatus });
      setAlert({
        message: `Post status updated to ${newStatus}`,
        type: newStatus === "Active" ? "success" : "warning",
      });
      getAllPosts();
    } catch (error) {
      console.error("Error updating post status:", error);
    }
  }, []);


  const deleteHandler = async (postID, fileID) => {
    const collection = Config.appWritePostsCollID;
    const res = await DatabaseService.deleteDocument(collection, postID, fileID)
    setAlert(res)
  }


  
  // Fetch all posts
  const getAllPosts = useCallback(async () => {
    const collection = Config.appWritePostsCollID;
    try {
      const res = await DatabaseService.getAllDocuments(collection);
      const modifiedRes = await Promise.all(
        res.documents.map(async (post) => {
          const processedPost = {};

          Object.keys(headerMapping).forEach((key) => {
            processedPost[headerMapping[key]] = post[key] || "N/A";
          });

          processedPost["#"] = processedPost["#"].split('').reverse('').slice(0, 4).join('');


          processedPost["date"] = post["date"]
            ? new Date(post["date"].replace(",", "")).toLocaleDateString()
            : "No Date Found";

          const collection = Config.appWriteCatsCollID;
          const category = await DatabaseService.getDocument(post["cat"], collection);
          processedPost["category"] = category.cat_name;

          const thisImage = DatabaseService.ViewImage(post["image"]);
          processedPost["image"] = (
            <img
              src={thisImage}
              alt={"post image"}
              className="size-20 object-cover"
            />
          );

          processedPost["title"] = processedPost["title"]
            .split(" ")
            .slice(0, 5)
            .join(" ");

          processedPost["update"] = (
            <button className="border size-full rounded bg-sky-50">
              <Link to={`/admin/updatePost/${post["$id"]}`}>
                <FaRegEdit className="size-7 text-sky-500 mx-auto my-1" />
              </Link>
            </button>
          );

          processedPost["delete"] = (
            <button
              className="border px-2 size-full rounded bg-red-50"
              onClick={() => deleteHandler(post["$id"], post['image'])}
            >
              <FaDeleteLeft className="size-8 text-red-600 mx-auto my-1" />
            </button>
          );

          processedPost["status"] =
            post["status"] === "Pending" ? (
              <div className="w-full text-center">
                <button
                  className="bg-yellow-600 text-black py-2 px-5 rounded"
                  onClick={() => handlePostStatus("Pending", post["$id"])}
                >
                  Pending
                </button>
              </div>
            ) : (
              <div className="w-full text-center">
                <button
                  className="bg-green-600 text-light py-2 px-5 rounded mx-auto"
                  onClick={() => handlePostStatus("Active", post["$id"])}
                >
                  Active
                </button>
              </div>
            );

          return processedPost;
        })
      );
      setTotalPosts(modifiedRes);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, [handlePostStatus]);

  useEffect(() => {
    getAllPosts();
  }, [deleteHandler]);

  const closeHandler = useCallback(() => {
    setAlert(null);
  }, []);

  return (
    <div>
      {alert && <Alert message={alert.message} type={alert.type} onClose={closeHandler} />}
      <h1 className="px-2">Manage Posts</h1>
      <div className="py-10">
        <div className="text-end mb-3">
          <Button title={'add Post'} path={'/admin/addPost'} />
        </div>
        <Table
          filter={true}
          searchInput={true}
          headers={headers}
          data={totalPosts}
        />
      </div>
    </div>
  );
};

export default React.memo(ManagePosts);
