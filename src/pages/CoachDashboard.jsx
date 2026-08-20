import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowRight, CheckCircle2, MessageCircle, Plus, Search, Send, Target, TrendingUp, Droplets, Footprints, Dumbbell } from "lucide-react";
import PortalShell from "../components/PortalShell.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useAppData } from "../context/AppDataContext.jsx";

export default function CoachDashboard() {
  const { currentUser } = useAuth();
  const { customerId } = useParams();
  const { data, getCustomerPlan, addNote, savePlan, sendMessage } = useAppData();
  const location = useLocation();
  const navigate = useNavigate();
  const coach = data.coaches.find(c => c.userId === currentUser.userId) || data.coaches.find(c => c.id === currentUser.coachId) || data.coaches[0];
  const myCustomers = data.customers.filter(c => c.coachId === coach.id);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(customerId ? Number(customerId) : (myCustomers[0]?.id || null));
  const [noteText, setNoteText] = useState("");
  const [planName, setPlanName] = useState("Thrive 30-Day");
  const [message, setMessage] = useState("");

  const filtered = useMemo(() => myCustomers.filter(c => c.name.toLowerCase().includes(search.toLowerCase())), [myCustomers, search]);
  const customer = data.customers.find(c => c.id === Number(customerId || selected)) || filtered[0];
  const plan = customer ? getCustomerPlan(customer.id) : null;
  const path = location.pathname;
  const title = path.includes("messages") ? "Your conversations" : path.includes("plans") ? "Nutrition plans" : path.includes("customers") ? "Your customers" : `Good morning, ${currentUser.name}`;

  if (path === "/coach/messages") return <PortalShell title={title} subtitle="Keep communication personal and actionable."><Messages coach={coach} customers={myCustomers} data={data} sendMessage={sendMessage}/></PortalShell>;
  if (path === "/coach/plans") return <PortalShell title={title} subtitle="Review every plan assigned to your customers."><Plans myCustomers={myCustomers} data={data} getCustomerPlan={getCustomerPlan}/></PortalShell>;

  return <PortalShell title={title} subtitle="Only customers assigned to you are visible in this portal.">
    {path === "/coach" && <div className="portal-stat-grid"><Stat icon={Target} value={myCustomers.length} label="My customers"/><Stat icon={CheckCircle2} value={myCustomers.filter(c=>c.status==="On Track").length} label="On track"/><Stat icon={TrendingUp} value={`${Math.round(myCustomers.reduce((a,c)=>a+c.progress,0)/Math.max(1,myCustomers.length))}%`} label="Avg progress"/><Stat icon={MessageCircle} value="7" label="Unread messages"/></div>}
    <div className="coach-workspace">
      <section className="portal-panel customer-list-panel"><div className="panel-head"><div><span className="panel-kicker">CLIENT ROSTER</span><h2>{myCustomers.length} customers</h2></div><div className="search-box"><Search size={15}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..."/></div></div>{filtered.map(c=><button className={`customer-list-item ${customer?.id===c.id?"active":""}`} key={c.id} onClick={()=>setSelected(c.id)}><span>{c.name.slice(0,1)}</span><div><strong>{c.name}</strong><small>{c.goal}</small></div><b>{c.progress}%</b><ArrowRight size={15}/></button>)}</section>
      {customer && <section className="portal-panel customer-detail"><div className="detail-header"><div className="profile-hero"><span>{customer.name.slice(0,1)}</span><div><h2>{customer.name}</h2><p>{customer.goal} · {customer.status}</p></div></div><button className="soft-btn" onClick={()=>navigate(`/coach/customers/${customer.id}`)}>Open profile <ArrowRight size={15}/></button></div><div className="mini-stat-grid"><Mini label="Weight" value={`${customer.weight} kg`} icon={Target}/><Mini label="Water" value={`${customer.water}/${customer.waterGoal}`} icon={Droplets}/><Mini label="Steps" value={customer.steps.toLocaleString()} icon={Footprints}/><Mini label="Workout" value={customer.workout?"Done":"Pending"} icon={Dumbbell}/></div><div className="detail-two"><div className="detail-box"><span className="panel-kicker">COACH NOTE</span><textarea value={noteText} onChange={e=>setNoteText(e.target.value)} placeholder="Add a note for the next check-in..."/><button className="primary-btn" onClick={()=>{addNote(customer.id, coach.id, noteText);setNoteText("")}}><Plus size={15}/> Save note</button></div><div className="detail-box"><span className="panel-kicker">NUTRITION PLAN</span><input className="plan-name-input" value={planName} onChange={e=>setPlanName(e.target.value)} /><div className="macro-grid"><span><b>{plan?.calories || 2100}</b><small>kcal</small></span><span><b>{plan?.protein || 130}g</b><small>protein</small></span><span><b>{plan?.carbs || 220}g</b><small>carbs</small></span></div><button className="primary-btn" onClick={()=>savePlan(customer.id, coach.id, {name:planName, calories:plan?.calories||2100, protein:plan?.protein||130, carbs:plan?.carbs||220, fat:plan?.fat||60, status:"Active"})}>Save plan <CheckCircle2 size={15}/></button></div></div></section>}
    </div>
  </PortalShell>;
}
function Stat({icon:Icon,value,label}){return <div className="portal-stat"><span className="stat-icon"><Icon size={18}/></span><div><strong>{value}</strong><small>{label}</small></div></div>}
function Mini({label,value,icon:Icon}){return <div className="mini-stat"><span><Icon size={16}/></span><small>{label}</small><strong>{value}</strong></div>}
function Plans({myCustomers,data,getCustomerPlan}){return <div className="portal-panel"><div className="panel-head"><div><span className="panel-kicker">ASSIGNED PLANS</span><h2>{myCustomers.length} customers</h2></div></div><div className="plan-table">{myCustomers.map(c=>{const p=getCustomerPlan(c.id);return <div className="plan-row" key={c.id}><div><strong>{c.name}</strong><small>{p?.name||"No plan"}</small></div><span>{p?.calories||"—"} kcal</span><span>{p?.protein||"—"}g protein</span><span className={`status ${p?.status?.toLowerCase()||"new"}`}>{p?.status||"New"}</span></div>})}</div></div>}
function Messages({coach,customers,data,sendMessage}){const [selected,setSelected]=useState(customers[0]?.id);const [text,setText]=useState("");const customer=customers.find(c=>c.id===selected);const messages=data.messages.filter(m=>[m.senderId,m.receiverId].includes(customer?.userId)&&[m.senderId,m.receiverId].includes(coach.userId));return <div className="message-layout"><div className="portal-panel message-people">{customers.map(c=><button key={c.id} className={selected===c.id?"active":""} onClick={()=>setSelected(c.id)}><span>{c.name.slice(0,1)}</span><div><strong>{c.name}</strong><small>{messages.find(m=>m.receiverId===c.userId)?"Active chat":"No new messages"}</small></div></button>)}</div><div className="portal-panel chat-panel"><div className="chat-head"><div className="profile-hero"><span>{customer?.name?.slice(0,1)}</span><div><strong>{customer?.name}</strong><small>{customer?.goal}</small></div></div></div><div className="chat-body">{messages.map(m=><div className={`bubble ${m.senderId===coach.userId?"mine":""}`} key={m.id}>{m.text}<small>{m.timestamp}</small></div>)}</div><div className="chat-input"><input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"){sendMessage(coach.userId,customer.userId,text);setText("")}}} placeholder="Write a message..."/><button onClick={()=>{sendMessage(coach.userId,customer.userId,text);setText("")}}><Send size={16}/></button></div></div></div>}
