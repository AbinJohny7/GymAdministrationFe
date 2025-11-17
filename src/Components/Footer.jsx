import React from 'react'

const Footer = () => {
  return (
  <>
   <footer className="mt-auto py-3  border-top footbg">
        <div className="container text-center small text-muted">
          © {new Date().getFullYear()} GymAdmin 
        </div>
      </footer>
  </>
  )
}

export default Footer