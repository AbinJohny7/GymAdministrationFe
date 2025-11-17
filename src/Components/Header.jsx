import React from 'react'

const Header = () => {
  return (
    <>
      <header className="position-relative shadow-sm navbar-bg bg-secondary">
        <div className="container d-flex justify-content-center align-items-center py-3 position-relative">
          <div className="menu-left position-absolute start-0 ms-3"></div>

          <div className="text-center">
            <h1 className="h4 mb-0 fw-bold">
              Gym<span className="brand-accent">Admin</span>
            </h1>
            <div className="text-light small ">Member Registration </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header