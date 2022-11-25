import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, register } from "../store/actions/AuthActions";

function RegisterScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    nationality: ""
  });

  const { name, email, phone, password, nationality } = user;

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error){
      dispatch(clearErrors())
    }
  }, [dispatch, error, isAuthenticated, navigate]);
  
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("phone", phone);
    formData.set("password", password);
    formData.set("nationality", nationality);
    dispatch(register(formData));
  };

  return (
    <Fragment>
      {loading ? (
        "Loading"
      ) : (
        <Fragment>
          <div className="max-w-screen-sm mx-auto mb-14 md:mb-24">
            <div className="mx-3 md:mx-20 mt-24 md:mt-36">
              <div className="bg-gray-900 rounded-xl py-10">
                <div className="mx-10">
                  <div className="text-3xl font-extrabold text-blue-600 mb-6">
                    Register
                  </div>
                  <form onSubmit={submitHandler}>
                    <div className="Name mb-5">
                      <label
                        htmlFor="input-name"
                        className="text-lg font-bold text-gray-400"
                      >
                        Name
                      </label>
                      <input
                        type="name"
                        className="block p-2 w-full text-gray-900 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter Name"
                        id="input-name"
                        name="name"
                        value={name}
                        onChange={onChange}
                      />
                    </div>
                    <div className="email mb-5">
                      <label
                        htmlFor="input-email"
                        className="text-lg font-bold text-gray-400"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="block p-2 w-full text-gray-900 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter email"
                        id="input-email"
                        name="email"
                        value={email}
                        onChange={onChange}
                      />
                    </div>
                    <div className="phone mb-5">
                      <label
                        htmlFor="input-phone"
                        className="text-lg font-bold text-gray-400"
                      >
                        Phone
                      </label>
                      <input
                        type="number"
                        className="block p-2 w-full text-gray-900 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter phone"
                        id="input-phone"
                        name="phone"
                        value={phone}
                        onChange={onChange}
                      />
                    </div>
                    <div className="password mb-5">
                      <label
                        htmlFor="input-password"
                        className="text-lg font-bold text-gray-400"
                      >
                        password
                      </label>
                      <input
                        type="password"
                        className="block p-2  w-full text-gray-900 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter password"
                        id="input-password"
                        name="password"
                        value={password}
                        onChange={onChange}
                      />
                    </div>
                    <div className="nationality mb-5">
                      <label
                        htmlFor="input-nationality"
                        className="text-lg font-bold text-gray-400"
                      >
                        Nationality
                      </label>
                      <input
                        type="nationality"
                        className="block p-2  w-full text-gray-900 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter nationality"
                        id="input-nationality"
                        name="nationality"
                        value={nationality}
                        onChange={onChange}
                      />
                    </div>
                    <button
                      type="submit"
                      value="Submit"
                      className="text-2xl font-bold bg-gray-600 hover:bg-blue-600 duration-300 text-gray-300 py-2 rounded-lg w-full mb-4"
                      disabled={loading ? true : false}
                    >
                      Register
                    </button>
                  </form>
                  <div className="flex justify-end">
                    <Link
                      to="/login"
                      className="text-base font-bold text-blue-600"
                    >
                      Already have an account?
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default RegisterScreen;
