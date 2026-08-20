import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { ArrowRight, Edit3, Plus, Search, Users, UserPlus, Target, IndianRupee, CheckCircle2, X, MoreHorizontal, RefreshCcw } from "lucide-react";
import PortalShell from "../components/PortalShell.jsx";
import { useAppData } from "../context/AppDataContext.jsx";

function Stat({ icon: Icon, value, label, trend }) { return <div className="portal-stat"><span className="stat-icon"><Icon size={18}/></span><div><strong>{value}</strong><small>{label}</small></div>{trend && <em>{trend}</em>}</div>; }

function OwnerDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { data, addCoach, addCustomer, assignCoach, resetDemo } = useAppData();
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const customers = useMemo(() => data.customers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())), [data.customers, search]);
  const coaches = useMemo(() => data.coaches.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.specialization.toLowerCase().includes(search.toLowerCase())), [data.coaches, search]);
  const activePlans = data.plans.filter(p => p.status === "Active").length;
  const attention = data.customers.filter(c => c.status === "Needs Attention").length;

  const path = location.pathname;
  const title = path === "/owner/coaches" ? "Coach management" : path === "/owner/customers" ? "Customer management" : path === "/owner/plans" ? "Nutrition plans" : `Good morning, ${currentUser?.name || "Owner"}`;
  const subtitle = path === "/owner" ? "Here’s a live snapshot of your Yukthaahara operation." : "Use the demo controls below to simulate day-to-day owner workflows.";

  const openCustomer = (customer) => setSelectedCustomer(customer);

  return <PortalShell title={title} subtitle={subtitle}>
    {path === "/owner" && <>
      <div className="portal-stat-grid">
        <Stat icon={Users} value={data.coaches.length + 50} label="Coaches" trend="+8%" />
        <Stat icon={UserPlus} value={data.customers.length + 122} label="Customers" trend="+14%" />
        <Stat icon={Target} value={activePlans + 41} label="Active plans" trend="+11%" />
        <Stat icon={IndianRupee} value="₹6.8L" label="Monthly revenue" trend="+9.2%" />
      </div>
      <div className="portal-grid-2">
        <section className="portal-panel"><div className="panel-head"><div><span className="panel-kicker">CUSTOMER HEALTH</span><h2>Everyone at a glance</h2></div><button className="link-btn" onClick={() => navigate("/owner/customers")}>View all <ArrowRight size={16}/></button></div><div className="status-bars"><div><span>On track</span><div><i style={{width:"72%"}}/></div><strong>72%</strong></div><div><span>Needs attention</span><div><i className="warning" style={{width:"18%"}}/></div><strong>18%</strong></div><div><span>New this week</span><div><i className="fresh" style={{width:"10%"}}/></div><strong>10%</strong></div></div></section>
        <section className="portal-panel"><div className="panel-head"><div><span className="panel-kicker">COACHES</span><h2>Top performing</h2></div><button className="link-btn" onClick={() => navigate("/owner/coaches")}>Manage <ArrowRight size={16}/></button></div><div className="coach-mini-list">{data.coaches.map(c => <button key={c.id} className="coach-mini" onClick={() => navigate("/owner/coaches")}><span>{c.name.slice(0,1)}</span><div><strong>{c.name}</strong><small>{c.specialization}</small></div><b>{c.rating}★</b></button>)}</div></section>
      </div>
      <section className="portal-panel"><div className="panel-head"><div><span className="panel-kicker">RECENT CUSTOMERS</span><h2>People who may need you</h2></div><div className="panel-actions"><button className="soft-btn" onClick={() => setModal("customer")}><Plus size={15}/> Add customer</button><button className="icon-btn" title="Reset demo" onClick={resetDemo}><RefreshCcw size={16}/></button></div></div><CustomerTable rows={data.customers.slice(0,5)} coaches={data.coaches} onSelect={openCustomer} onAssign={assignCoach}/></section>
    </>}

    {path === "/owner/coaches" && <section className="portal-panel"><div className="panel-head"><div><span className="panel-kicker">TEAM</span><h2>{data.coaches.length} coaches</h2></div><button className="soft-btn" onClick={() => setModal("coach")}><Plus size={15}/> Add coach</button></div><div className="table-tools"><div className="search-box"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search coaches..."/></div></div><div className="coach-grid">{coaches.map(c => <article className="coach-card" key={c.id}><div className="coach-card-top"><span>{c.name.slice(0,1)}</span><button className="icon-btn"><MoreHorizontal size={17}/></button></div><h3>{c.name}</h3><p>{c.specialization}</p><div className="coach-card-meta"><span>{c.customers} customers</span><b>{c.rating}★</b></div><div className="mini-progress"><i style={{width:`${Math.min(100, c.customers*4)}%`}}/></div></article>)}</div></section>}

    {path === "/owner/customers" && <section className="portal-panel"><div className="panel-head"><div><span className="panel-kicker">CUSTOMERS</span><h2>{customers.length} visible customers</h2></div><button className="soft-btn" onClick={() => setModal("customer")}><Plus size={15}/> Add customer</button></div><div className="table-tools"><div className="search-box"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search customers..."/></div></div><CustomerTable rows={customers} coaches={data.coaches} onSelect={openCustomer} onAssign={assignCoach}/></section>}

    {path === "/owner/plans" && <section className="portal-panel"><div className="panel-head"><div><span className="panel-kicker">PROGRAMS</span><h2>Active nutrition plans</h2></div><button className="soft-btn" onClick={() => navigate("/owner/customers")}><Users size={15}/> Assign from customer</button></div><div className="plan-table">{data.plans.map(plan => { const customer=data.customers.find(c=>c.id===plan.customerId); const coach=data.coaches.find(c=>c.id===plan.coachId); return <div className="plan-row" key={plan.id}><div><strong>{plan.name}</strong><small>{customer?.name}</small></div><span>{coach?.name}</span><span>{plan.calories} kcal</span><span>{plan.status}</span><button className="link-btn" onClick={()=>openCustomer(customer)}>View <ArrowRight size={14}/></button></div>; })}</div></section>}

    {modal === "coach" && <Modal title="Add coach" onClose={()=>setModal(null)}><CoachForm onSave={(v)=>{addCoach(v);setModal(null)}}/></Modal>}
    {modal === "customer" && <Modal title="Add customer" onClose={()=>setModal(null)}><CustomerForm coaches={data.coaches} onSave={(v)=>{addCustomer(v);setModal(null)}}/></Modal>}
    {selectedCustomer && <Modal title={selectedCustomer.name} onClose={()=>setSelectedCustomer(null)}><CustomerQuickView customer={selectedCustomer} coaches={data.coaches}/></Modal>}
  </PortalShell>;
}

function CustomerTable({ rows, coaches, onSelect, onAssign }) { return <div className="data-table"><div className="data-row data-head"><span>Customer</span><span>Coach</span><span>Goal</span><span>Progress</span><span>Status</span><span/></div>{rows.map(c => <div className="data-row" key={c.id}><button className="person-cell" onClick={()=>onSelect(c)}><span>{c.name.slice(0,1)}</span><div><strong>{c.name}</strong><small>{c.email}</small></div></button><select value={c.coachId || ""} onChange={e=>onAssign(c.id,e.target.value)}><option value="">Unassigned</option>{coaches.map(coach=><option key={coach.id} value={coach.id}>{coach.name}</option>)}</select><span>{c.goal}</span><div className="table-progress"><i style={{width:`${c.progress}%`}}/><small>{c.progress}%</small></div><span className={`status ${c.status.toLowerCase().replaceAll(" ","-")}`}>{c.status}</span><button className="icon-btn" onClick={()=>onSelect(c)}><ArrowRight size={15}/></button></div>)}</div> }

function Modal({title,onClose,children}) { return <div className="portal-modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><div className="portal-modal"><button className="modal-close" onClick={onClose}><X size={19}/></button><span className="panel-kicker">OWNER CONTROL</span><h2>{title}</h2>{children}</div></div> }
function CoachForm({onSave}) { const [form,setForm]=useState({name:"",email:"",specialization:"Weight Management",phone:""}); return <form className="portal-form" onSubmit={e=>{e.preventDefault();if(form.name&&form.email)onSave(form)}}>{["name","email","phone"].map(k=><label key={k}>{k[0].toUpperCase()+k.slice(1)}<input value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} required={k!=="phone"}/></label>)}<label>Specialization<select value={form.specialization} onChange={e=>setForm({...form,specialization:e.target.value})}><option>Weight Management</option><option>Sports Nutrition</option><option>Women's Wellness</option><option>Performance Nutrition</option></select></label><button className="primary-btn wide" type="submit">Create coach <CheckCircle2 size={17}/></button></form> }
function CustomerForm({coaches,onSave}) { const [form,setForm]=useState({name:"",email:"",phone:"",coachId:coaches[0]?.id||"",goal:"Weight Loss"}); return <form className="portal-form" onSubmit={e=>{e.preventDefault();if(form.name&&form.email)onSave(form)}}>{["name","email","phone"].map(k=><label key={k}>{k[0].toUpperCase()+k.slice(1)}<input value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} required={k!=="phone"}/></label>)}<label>Coach<select value={form.coachId} onChange={e=>setForm({...form,coachId:e.target.value})}>{coaches.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label><label>Goal<select value={form.goal} onChange={e=>setForm({...form,goal:e.target.value})}><option>Weight Loss</option><option>Fitness</option><option>Recomposition</option><option>General Wellness</option></select></label><button className="primary-btn wide" type="submit">Create customer <CheckCircle2 size={17}/></button></form> }
function CustomerQuickView({customer,coaches}) { const coach=coaches.find(c=>c.id===customer.coachId); return <div className="quick-profile"><div className="profile-hero"><span>{customer.name.slice(0,1)}</span><div><h3>{customer.name}</h3><p>{customer.email}</p></div></div><div className="quick-grid"><div><span>Coach</span><strong>{coach?.name || "Unassigned"}</strong></div><div><span>Goal</span><strong>{customer.goal}</strong></div><div><span>Weight</span><strong>{customer.weight} kg</strong></div><div><span>Target</span><strong>{customer.targetWeight} kg</strong></div><div><span>Progress</span><strong>{customer.progress}%</strong></div><div><span>Status</span><strong>{customer.status}</strong></div></div></div> }

export default OwnerDashboard;
