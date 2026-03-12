import Sidebar from "./Sidebar"
import BottomNav from "./BottomNav"

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-950 ">
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      <div className="md:hidden">
        <BottomNav />
      </div>
      <main className="flex-1 overflow-auto pb-24 md:pb-0">{children}</main>
    </div>
  )
}

export default Layout