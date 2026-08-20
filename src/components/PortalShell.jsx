import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Bell, ChevronRight, Home, LogOut, Menu, MessageCircle, Settings, Users, X, ClipboardList, Activity, Dumbbell, BarChart3, UserRound, ShieldCheck, Leaf, LayoutDashboard } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useAppData } from "../context/AppDataContext.jsx";

const roleConfig = {
  owner: { label: "Owner", home: "/owner", items: [{ to: "/owner", label: "Dashboard", icon: LayoutDashboard }, { to: "/owner/coaches", label: "Coaches", icon: Users }, { to: "/owner/customers", label: "Customers", icon: UserRound }, { to: "/owner/plans", label: "Nutrition Plans", icon: ClipboardList }] },
  coach: { label: "Coach", home: "/coach", items: [{ to: "/coach", label: "Dashboard", icon: LayoutDashboard }, { to: "/coach/customers", label: "My Customers", icon: Users }, { to: "/coach/plans", label: "Nutrition Plans", icon: ClipboardList }, { to: "/coach/messages", label: "Messages", icon: MessageCircle }] },
  customer: { label: "Customer", home: "/customer", items: [{ to: "/customer", label: "Dashboard", icon: LayoutDashboard }, { to: "/customer/plan", label: "My Plan", icon: ClipboardList }, { to: "/customer/activity", label: "Daily Activity", icon: Activity }, { to: "/customer/progress", label: "Progress", icon: BarChart3 }, { to: "/customer/coach", label: "My Coach", icon: MessageCircle }] },
};

export default function PortalShell({ children, title, subtitle }) {
  const { currentUser, logout } = useAuth();
  const { toast } = useAppData();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const config = roleConfig[currentUser?.role] || roleConfig.customer;

  const handleLogout = () => { logout(); navigate("/login"); };

  return <div className="portal">
    <aside className={`portal-sidebar ${open ? "open" : ""}`}>
      <div className="portal-brand"><span><Leaf size={17}/></span><strong>Yukthaahara</strong><small>{config.label} Portal</small></div>
      <nav className="portal-nav">
        {config.items.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} end={to === config.home} onClick={() => setOpen(false)}><Icon size={18}/><span>{label}</span></NavLink>)}
      </nav>
      <div className="portal-sidebar-bottom">
        <button onClick={() => navigate("/")}><Home size={17}/> <span>View website</span></button>
        <button onClick={handleLogout}><LogOut size={17}/> <span>Logout</span></button>
      </div>
    </aside>
    {open && <button className="portal-backdrop" aria-label="Close navigation" onClick={() => setOpen(false)} />}
    <div className="portal-main">
      <header className="portal-header">
        <button className="portal-menu" onClick={() => setOpen((v) => !v)}>{open ? <X/> : <Menu/>}</button>
        <div><span className="portal-eyebrow">{config.label.toUpperCase()} PORTAL</span><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>
        <div className="portal-header-actions"><button className="icon-btn"><Bell size={18}/><i/></button><div className="portal-user"><span>{currentUser?.name?.slice(0,1) || "Y"}</span><div><strong>{currentUser?.name}</strong><small>{config.label}</small></div></div></div>
      </header>
      <div className="portal-content">{children}</div>
    </div>
    {toast && <div className="portal-toast"><ShieldCheck size={17}/>{toast}</div>}
  </div>;
}
