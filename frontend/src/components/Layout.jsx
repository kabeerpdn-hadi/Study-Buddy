import Sidebar from "./Sidebar"

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}

export default Layout