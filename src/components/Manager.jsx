// import { text } from "express";
import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const getpasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    setpasswordArray(passwords);
  };

  useEffect(() => {
    getpasswords();
  }, []);

  const copyText = (text) => {
    toast("Copy to clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    //   alert ("show the password")

    passwordRef.current.type = "text";
    if (ref.current.src.includes("/eyecross.png")) {
      passwordRef.current.type = "text";
      ref.current.src = "/eye.png";
    } else {
      ref.current.src = "/eyecross.png";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = async () => {
    if (
      form.site.length > 1 &&
      form.username.length > 1 &&
      form.password.length > 1
    ) {
     
      await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-type":"application/json"}, body: JSON.stringify({id:form.id})})

      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      await fetch("http://localhost:3000/",{method:"POST",headers:{"Content-type":"application/json"}, body: JSON.stringify({...form,id:uuidv4()})})

      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      // );
      // console.log(...passwordArray, form);
      setform({ site: "", username: "", password: "" });
    } else {
      toast("Error:Password not saved!");
    }
  };

  const deletePassword =async (id) => {
    console.log("Deleting password with id", id);
    let c = confirm("Confirm to delete this password");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify(passwordArray.filter((item) => item.id !== id))
      // );
      let res= await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-type":"application/json"}, body: JSON.stringify({id})})
    }
  };

  const editPassword = (id) => {
    console.log("Editing password with id", id);
    setform({...passwordArray.filter((i) => i.id === id)[0],id:id});
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="bg-gray-100 ">
        {/* <div class="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#ccffff_150%)] "></div> */}
        <div className=" bg-gray-100 text-teal-600   md:mycontainer px-2 md:px-0 p-16 min-h[100vh]">
          <h1 className="text-2xl font-bold text-center">
            PassKeep
            <span className="text-orange-300">**</span>
          </h1>
          <p className="font-bold text-center">Your own password manager</p>

          <div className=" flex flex-col p-4 text-black gap-8 items-center">
            <input
              value={form.site}
              onChange={handlechange}
              className="rounded-full w-full py-1 p-4 border-2 border-teal-600 "
              placeholder="Enter URL"
              type="text"
              name="site"
              id="site"
            />
            <div className="flex flex-col md:flex-row w-full gap-8 justify-between">
              <input
                value={form.username}
                onChange={handlechange}
                className="rounded-full w-full py-1 p-4 border-2 border-teal-600"
                placeholder="Enter Username"
                type="text"
                name="username"
                id="username"
              />
              <div className="relative">
                <input
                  ref={passwordRef}
                  value={form.password}
                  onChange={handlechange}
                  className="rounded-full w-full py-1 p-4 border-2 border-teal-600"
                  placeholder="Enter Password"
                  type="password"
                  name="password"
                  id="password"
                />
                <span
                  className="absolute right-0 top-1 cursor-pointer "
                  onClick={showPassword}
                >
                  <img
                    ref={ref}
                    className="p-1"
                    width="26"
                    src="/eye.png"
                    alt="eye"
                  ></img>
                </span>
              </div>
            </div>
            <button
              onClick={savePassword}
              className="flex justify-center items-center rounded-full gap-2 bg-teal-600 px-4 py-1 w-fit hover:bg-orange-300 hover:font-bold border-2 border-teal-950 "
            >
              <lord-icon
                src="https://cdn.lordicon.com/hqymfzvj.json"
                trigger="hover"
                // style="width:250px;height:250px"
              ></lord-icon>
              Add Password
            </button>
          </div>
          <div className="passwords">
            <h2 className="font-bold text-teal-900 text-xl py-4 px-5">
              Your Password
            </h2>
            {passwordArray.length === 0 && (
              <div className="px-5">No passwords</div>
            )}
            {passwordArray.length != 0 && (
              <table className="table-auto w-full rounded-md overflow-hidden mb-10 ">
                <thead>
                  <tr className="text-orange-300 bg-teal-700">
                    <th className="py-2">Site</th>
                    <th className="py-2">Username</th>
                    <th className="py-2">Password</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {passwordArray.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="  py-2 border border-teal-100 text-center ">
                          <div className="flex items-center justify-center">
                            <a href={item.site} target="_blank">
                              {item.site}
                            </a>
                            <div
                              className="lordiconcopy size-7 cursor-pointer"
                              onClick={() => {
                                copyText(item.site);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  peddingLeft: "3px",
                                }}
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className=" py-2 border border-teal-100 text-center ">
                          <div className="flex items-center justify-center">
                            <span>{item.username}</span>
                            <div
                              className="lordiconcopy size-7 cursor-pointer"
                              onClick={() => {
                                copyText(item.username);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  peddingLeft: "3px",
                                }}
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className=" py-2 border border-teal-100 text-center ">
                          <div className="flex items-center justify-center">
                            <span>{"*".repeat(item.password.length)}</span>
                            <div
                              className="lordiconcopy size-7 cursor-pointer"
                              onClick={() => {
                                copyText(item.password);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  peddingLeft: "3px",
                                }}
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className=" py-2 border border-teal-100 text-center ">
                          <div className="flex items-center justify-center">
                            <span
                              className="cursor-pointer mx-2 "
                              onClick={() => {
                                editPassword(item.id);
                              }}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                trigger="hover"
                                style={{ width: "25px", height: "25px" }}
                              ></lord-icon>
                            </span>
                            <span
                              className="cursor-pointer mx-2"
                              onClick={() => {
                                deletePassword(item.id);
                              }}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/skkahier.json"
                                trigger="hover"
                                style={{ width: "25px", height: "25px" }}
                              ></lord-icon>
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
