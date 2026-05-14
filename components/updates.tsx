import { UpdatesType } from "@/models/updates";
import { UpdatesCard } from "./updatesCard";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Updates(){

    const [updates, setUpdates] = useState<UpdatesType[]>([])
    const [noticeUpdates, setNoticeUpdates] = useState<UpdatesType[]>([])
    const [examinationUpdates, setExaminationUpdates] = useState<UpdatesType[]>([])
    const [tenderUpdates, setTenderUpdates] = useState<UpdatesType[]>([])

    const filterUpdates = (updates: UpdatesType[])=>{
        const noticeUpdates = updates.filter(update => update.type === "NOTICE")
        const examinationUpdates = updates.filter(update => update.type === "EXAMINATION")
        const tenderUpdates = updates.filter(update => update.type === "TENDER")
        setNoticeUpdates(noticeUpdates)
        setExaminationUpdates(examinationUpdates)
        setTenderUpdates(tenderUpdates)
    };

    useEffect(()=>{
        const fetchUpdates = async ()=>{
            const response = await axios.get('/api/search/updates');
            if(response.data.success){
                setUpdates(response.data.data)
                filterUpdates(response.data.data)
            }else {
                console.log(response.data.error);
            }
        }

        fetchUpdates();
    }, [])

    return (
        <div className="updatesContainer flex flex-col items-center bg-gray-400/20 p-5">
            {/* Notice */}
            {/* Examination */}
            {/* News */}
            {/* Other */}
            <div className="heads grid grid-cols-3 w-full text-center font-bold">
                <h1>Notice</h1>
                <h1>Examination</h1>
                <h1>Tender</h1>
            </div>
            <div className="grid grid-cols-3 gap-5">
                <UpdatesCard updates={noticeUpdates} borderColor="border-l-blue-500"/>
                <UpdatesCard updates={examinationUpdates} borderColor="border-l-green-500"/>
                <UpdatesCard updates={tenderUpdates} borderColor="border-l-yellow-500"/>
            </div>

        </div>
    )
}