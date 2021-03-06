import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaPencilAlt } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { FiDelete } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import Data from "./testData.js";

const ifToken = () => {
  if (localStorage.getItem("token") !== null) return false;
  return true;
};

const ShowPostModal = ({ setPosts, show, setter }) => {
  const hide_ = "transform-gpu scale-0";
  const show_ = "transform-gpu scale-1";

  const [title, setTitle] = useState(show.title);
  const [desc, setDesc] = useState(show.description);

  useEffect(() => {
    setTitle(show.title);
    setDesc(show.description);
  }, [show]);

  let choice = title === show.title && desc === show.description;

  return (
    <div
      className={`${show.title === null ? hide_ : show_} ease-in-out ${
        show.title === null ? "" : "duration-200"
      } modal fixed top-0 left-0 h-full w-full z-50 flex flex-row justify-center items-center`}
    >
      <div className="p-4 relative w-4/5 h-3/5 md:w-3/5 bg-white rounded-md flex flex-col justify-center items-center">
        <GiCancel
          onClick={() => {
            setter({
              title: null,
              description: null,
              id: null,
              date: null,
            });
          }}
          className="cursor-pointer absolute top-4 right-4 text-2xl text-gray-800"
        />
        <div className="overflow-auto rounded-md w-4/5 bg-gray-100 border border-gray-300 p-2 mb-4 flex flex-nowrap flex-row justify-start items-end">
          <input
            type="textarea"
            value={title === null ? "" : title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="bg-gray-100 w-3/4 focus:outline-none flex-shrink-0 text-2xl"
          ></input>
          <h1 className="flex-shrink-0 mx-2 text-gray-500 text-md md:block">
            on {show.date}
          </h1>
        </div>
        <input
          type="textarea"
          value={desc === null ? "" : desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          className="overflow-auto rounded-md w-4/5 h-3/5 bg-gray-100 border border-gray-300 p-2 mb-4"
        ></input>

        <button
          onClick={() => {
            console.log("ok");
            const url = `http://localhost:5000/api/items/${show.id}`;
            fetch(url, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({
                title,
                description: desc,
              }),
            })
              .then((res) => {
                if (res.status !== 200) throw res.err;
                return res.json();
              })
              .then((res) => {
                setPosts((p) => {
                  let t = [...p];
                  t = t.map((ele) => {
                    let x = { ...ele };
                    if (x._id === show.id) {
                      console.log("FOUND....");
                      x.title = title;
                      x.description = desc;
                    }
                    return x;
                  });
                  return t;
                });
                setter({
                  title: null,
                  description: null,
                  id: null,
                  date: null,
                });
                alert("updated successfully!");
              })
              .catch((err) => {
                alert(err);
              });
            console.info(url);
          }}
          className={`${
            choice ? hide_ : show_
          } duration-200 focus:outline-none rounded-md w-20 h-10 bg-navCol`}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

const CreatePostModal = ({ setPosts, show, setter }) => {
  const hide_ = "transform-gpu scale-0";
  const show_ = "transform-gpu scale-1";

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <div
      className={`${show === 0 ? hide_ : show_} ease-in-out ${
        show === 0 ? "" : "duration-200"
      } modal fixed top-0 left-0 h-full w-full z-50 flex flex-row justify-center items-center`}
    >
      <div className="p-4 relative w-4/5 h-3/5 md:w-2/5 bg-white rounded-md flex flex-col justify-center items-center">
        <GiCancel
          onClick={() => {
            setter(0);
          }}
          className="cursor-pointer absolute top-4 right-4 text-2xl text-gray-800"
        />
        <label className="py-1" htmlFor="title">
          Enter your note's title
        </label>
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="rounded-md w-4/5 bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
          name="title"
          placeholder="Title"
          type="text"
        />
        <label className="py-1" htmlFor="desc">
          Enter your note{" "}
        </label>
        <input
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          className="rounded-md w-4/5 h-3/5 bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
          name="desc"
          placeholder="Description"
          type="textarea"
        />
        <button
          onClick={() => {
            console.log("SENDING...");
            fetch("http://localhost:5000/api/items", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({
                username: localStorage.getItem("name"),
                title,
                description: desc,
              }),
            })
              .then((res) => {
                if (res.status !== 200) throw res.err;
                return res.json();
              })
              .then((res) => {
                setPosts((p) => {
                  let t = [...p];
                  t.push(res);
                  return t;
                });
                setter(0);
              })
              .catch((err) => {
                alert(err);
              });
          }}
          className="focus:outline-none rounded-md w-20 h-10 bg-navCol"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const CreatePost = ({ modal }) => {
  return (
    <div
      onClick={() => {
        modal(1);
      }}
      className="CreatePost my-8 rounded-md cursor-pointer flex-shrink-0 flex flex-row justify-evenly items-center text-2xl h-12"
    >
      <h2 className="relative z-10 hidden lg:block">Write about your day</h2>
      <FaPencilAlt className="relative z-20" />
    </div>
  );
};

const Post = ({ setPosts, modal, user, title, description, date, _id: id }) => {
  const date_re = date.split("T")[0];
  return (
    <div
      onClick={() => {
        console.log("clicked...");
        modal({ title, description, date: date_re, id });
      }}
      key={id}
      className="post relative p-2 w-3/5 cursor-pointer border-solid border border-black flex flex-col items-start justify-start"
    >
      <div className="w-full pr-5 flex flex-row flex-wrap justify-start items-center">
        <h1 className="post_head mx-2 text-xl font-bold">{title}</h1>{" "}
        <h1 className="mx-2 text-gray-500 text-sm hidden md:block">
          on {date_re}
        </h1>
        <FiDelete
          onClick={(e) => {
            console.log("DELETING>>>>");
            const url = `http://localhost:5000/api/items/${id}`;
            fetch(url, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
              .then((res) => {
                console.log("1...", res.status);
                if (res.status === 200) {
                  return res.json();
                } else {
                  throw res.err;
                }
              })
              .then((res) => {
                console.log("2...", res);
                setPosts((p) => {
                  let t = [...p];
                  t = t.filter((ele) => {
                    return ele._id !== id;
                  });
                  return t;
                });
              })
              .catch((err) => {
                alert(err);
              });
            e.stopPropagation();
          }}
          className="absolute top-4 right-3 md:top-4 md:right-3 text-md hover:text-red-400"
        />
      </div>
      <div className="post_desc w-full overflow-hidden my-4">
        <p>{description}</p>
      </div>
    </div>
  );
};

const ViewPosts = ({ posts, setPosts, modal }) => {
  console.log(posts);
  return (
    <div className="posts my-4 w-4/5 bg-white rounded-lg flex flex-nowrap flex-col justify-between items-center">
      {posts.map((ele) => (
        <Post key={ele._id} setPosts={setPosts} modal={modal} {...ele} />
      ))}
    </div>
  );
};

const AuthPanel = () => {
  const para = {
    client_id:
      "545831803122-8m7jga8f2c277vql7u43etgaq7o0an0u.apps.googleusercontent.com",
    redirect_uri: "http://localhost:3000",
    response_type: "token",
    scope: "https://www.googleapis.com/auth/userinfo.email",
  };

  const url = `https://accounts.google.com/o/oauth2/v2/auth`;
  return (
    <div className="h-3/5 w-1/5 bg-white rounded-md flex flex-col justify-center items-center">
      <form method="GET" action={url}>
        {Object.keys(para).map((ele, i) => (
          <input key={i} type="hidden" name={ele} value={para[ele]}></input>
        ))}
        <button className="g_button rounded-md focus:outline-none focus:border-none">
          Log in with <FcGoogle className="inline text-xl" />
        </button>
      </form>
    </div>
  );
};

const Todo = ({ hash, setUsername }) => {
  const [createModal, setCreateModal] = useState(0);
  const [showModal, setShowModal] = useState({
    title: null,
    description: null,
    date: null,
    id: null,
  });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const url = `http://localhost:5000/api/items/${localStorage.getItem(
      "name"
    )}`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("GOT NOTES....", res);
        setPosts(res);
      });
  }, []);

  console.log(hash);
  let qs = hash.slice(1);
  qs = qs.split("&");
  let params = {};
  for (let i of qs) {
    let [a, b] = i.split("=");
    params[a] = b;
  }
  console.log(params, ifToken());
  let history = useHistory();
  if (params["access_token"] !== undefined) {
    fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${params["access_token"]}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.email);
        localStorage.setItem("name", res.email);
        history.push("/");
      });
  }
  return (
    <div className="todo-wrapper flex-grow w-full flex flex-row flex-nowrap justify-center items-center">
      {ifToken() ? (
        <AuthPanel />
      ) : (
        <div className="todos w-full flex flex-col justify-start items-center">
          <CreatePost modal={setCreateModal} />
          <hr className="rule my-12 md:my-4 w-4/5 bg-gray-300"></hr>
          <ViewPosts posts={posts} setPosts={setPosts} modal={setShowModal} />
          <CreatePostModal
            setPosts={setPosts}
            show={createModal}
            setter={setCreateModal}
          />
          <ShowPostModal
            setPosts={setPosts}
            show={showModal}
            setter={setShowModal}
          />
        </div>
      )}
    </div>
  );
};

export default Todo;
