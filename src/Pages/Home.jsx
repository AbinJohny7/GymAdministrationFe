import React, { useEffect, useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { Link } from "react-router-dom";
import { createClient, getClient } from "../services/allApi";
import Swal from "sweetalert2";




const Home = () => {
  const [inputVal, setInputVal] = useState({
    name: "",
    age: "",
    plan: "",
    address: "",
    doj: "",
    exp: ""
  });
const [clientData, setClientData] = useState([]);

  useEffect(() => {
    loadClient();
  }, []);

  const loadClient = async () => {
    let apiresponse = await getClient();
    setClientData(apiresponse.data);
  };



const onAddClick = async () => {
  if (!validateForm()) return;
  let reqBody = { gym: inputVal };
  let apiresponse = await createClient(reqBody);
  console.log(apiresponse);
  if(apiresponse.status==201){
      Swal.fire({
  title: "Sucess",
  text: "Sucessfully added!",
  icon: "success"
});

setInputVal({
  name: "",
  age: "",
  plan: "",
  address: "",
  doj: "",
  exp: ""
});



loadClient()
  }else{
Swal.fire({
  title: 'Error!',
  text: 'Something went wrong',
  icon: 'error',
  confirmButtonText: 'Cool'
})
  }
};
const validateForm = () => {
  if (!inputVal.name.trim()) {
    Swal.fire("Error", "Name is required", "error");
    return false;
  }
  if (!inputVal.age.trim()) {
    Swal.fire("Error", "Age is required", "error");
    return false;
  }
  if (!inputVal.plan.trim()) {
    Swal.fire("Error", "Plan is required", "error");
    return false;
  }
  if (!inputVal.address.trim()) {
    Swal.fire("Error", "Address is required", "error");
    return false;
  }
  if (!inputVal.doj.trim()) {
    Swal.fire("Error", "Date of joining is required", "error");
    return false;
  }
  if (!inputVal.exp.trim()) {
    Swal.fire("Error", "Expiry date is required", "error");
    return false;
  }
  return true;
};



  return (
    <div className="page-bg d-flex flex-column min-vh-100">
      <main className="container flex-grow-1 py-5">
        <div className="row g-4 d-flex ">
          <aside className="col-12 col-lg-3">
            <div className="card rounded-3 shadow-sm h-100 sticky-top" style={{ top: "1.5rem" }}>
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <div className="icon-sq me-3">
                    <TiThMenu />
                  </div>

                  <div>
                    <div className="fw-semibold small">Menu</div>
                    <div className="text-muted small">Common actions</div>
                  </div>
                </div>

                <div className="d-grid gap-2">
                  <Link to={"/history"}>
                    <button type="button" className="btn btn-outline-primary text-start w-75">
                      Members History
                    </button>
                  </Link>
                  <Link to={"/memberList"}>
                    <button type="button" className="btn btn-outline-primary text-start w-75">
                      Members List
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          <section className="col-12 col-lg-6">
            <div className="card rounded-4 shadow-lg border-0">
              <div className="card-body p-4 p-md-5">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h2 className="h5 mb-1 fw-bold">Create New Member</h2>
                    <div className="text-muted small">Fill the form to register a new gym member.</div>
                  </div>
                </div>

                <form onSubmit={onAddClick}>
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label small">Full name</label>
                      <input
                        value={inputVal.name}
                        onChange={(e) => setInputVal({ ...inputVal, name: e.target.value })}
                        type="text"
                        className="form-control form-control-lg rounded-3"
                        placeholder="name"
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label small">Age</label>
                      <input
                        value={inputVal.age}
                        onChange={(e) => setInputVal({ ...inputVal, age: e.target.value })}
                        type="text"
                        className="form-control rounded-3"
                        placeholder="age"
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label small">Plan</label>
                      <select
                        value={inputVal.plan}
                        className="form-select rounded-3"
                        onChange={(e) => setInputVal({ ...inputVal, plan: e.target.value })}
                      >
                        <option value="">Select plan</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Quarterly">Quarterly</option>
                        <option value="Yearly">Yearly</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label small">Address</label>
                      <textarea
                        value={inputVal.address}
                        className="form-control rounded-3"
                        rows="3"
                        placeholder="Address"
                        onChange={(e) => setInputVal({ ...inputVal, address: e.target.value })}
                      ></textarea>
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label small">Date of Joining</label>
                      <input
                        value={inputVal.doj}
                        onChange={(e) => setInputVal({ ...inputVal, doj: e.target.value })}
                        type="date"
                        className="form-control rounded-3"
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label small">Expiry Date</label>
                      <input
                        value={inputVal.exp}
                        onChange={(e) => setInputVal({ ...inputVal, exp: e.target.value })}
                        type="date"
                        className="form-control rounded-3"
                      />
                    </div>

                    <div className="col-12 d-flex justify-content-center align-items-center mt-5">
                      <button onClick={onAddClick} type="button" className="btn btn-primary btn-lg rounded-pill px-4 m-3">
                        <span className="me-2 bi bi-arrow-right"></span>
                        Register Member
                      </button>
                    </div>
                  </div>
                </form>

              </div>
            </div>
          </section>
          <aside className="col-12 col-lg-3">
            <div className="card rounded-3 shadow-sm sticky-top" style={{ top: "1.5rem" }}>
              <div className="card-body text-center">
                <div className="fw-semibold small mb-2">Current Members</div>
               
                <div className="display-4 fw-bold">{clientData.length}</div>
                <div className="small text-light btn btn-primary ">Active members</div>
               
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Home;

