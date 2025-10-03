import React from "react";

function UserOrderCard({data}){
    const formatDate=(dataString)=>{
        const data=new Date(dataString)
        return data.toLocaleString('en-GB',{
            day:"2-digit",
            month:"short",
            year:"numeric"
        })
    }
    return (
        <div className="bg-white rounded-lg shadow p-4 space-y-4">
            <div className="flex justify-between border-b pb-2">
                <div>
                    <p className="font-semibold">Order #{data._id.slice(-7)} </p>
                    <p className="text-sm text-gray-500">
                        Date : {formatDate(data.createdAt)}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500">{data.paymentMethod?.toUpperCase()}</p>
                    <p className="font-medium text-blue-600">{data.shopOrders?.[0].status}</p>
                </div>
            </div>

            {data.shopOrders.map((shopOrder,index)=>{
                <div key={index} className="border rounded-lg p-3 bg-[#fffaf7] space-y-3">
                    <p>{shopOrder.shop?.name}</p>
                </div>
            })}
        </div>
    )
}

export default UserOrderCard