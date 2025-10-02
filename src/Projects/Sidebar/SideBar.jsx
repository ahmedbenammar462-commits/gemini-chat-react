import React, { useContext, useState } from "react";
import { assets } from "../Assets/assets";
import './SideBar.css'
import { Context } from "../Context/Context";

const Sidebar = () =>{
    const [extended,setExtended]=useState(false)
    const {onSent,prevPrompts,setRecentPrompt,newChat}=useContext(Context)

    const loadPrompt=async(prompt)=>{
        await onSent(prompt)

    }
    return (
        <div className="sidebare">
            <div className="top">
                <img onClick={()=>setExtended(prev=>!prev)}className="menu"src={assets.menu}alt="" width="30px"height="30px" />
                <div onClick={()=>newChat()}className="new-chat">
                    <img src={assets.plus} width="30px"height="30px"className="plus"alt="" />
                    {extended? <p>New chat</p>:null}

                </div>{extended?
                <div className="recent">
                    <p className="recent-titile">Recent</p>
                    {prevPrompts.map((item,index)=>{
                        return (
                            <div onClick={()=>loadPrompt(item)} className="recent-entry">
                                <img src={assets.message}alt=""width="30px"height="30px" />
                                <p>{item.slice(0,18)}...</p>
                            </div>
                            
                        )
                    })}
                </div>:null}
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.qestion}alt=""width="30px"height="30px" />
                    {extended?<p>Help</p>:null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.temp}alt=""width="30px"height="30px" />
                    {extended?<p>Activity</p>:null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.parametre}alt=""width="30px"height="30px" />
                    {extended?<p>Setting</p>:null}
                </div>

            </div>

        </div>
     );
    
}
export default Sidebar ;