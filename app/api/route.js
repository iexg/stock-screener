import Pusher from "pusher";
import { NextRequest, NextResponse } from "next/server";


const data = []

export async function POST(request) {

    const res = await request.json()
    console.log("received")
    console.log(res)

    const pusher = new Pusher({
        appId: `${process.env.NEXT_PUBLIC_PUSHER_APP_ID}`,
        key: `${process.env.NEXT_PUBLIC_PUSHER_KEY}`,
        secret: `${process.env.NEXT_PUBLIC_PUSHER_SECRET}`,
        cluster: "us2",
    })

    console.log('sending')
    pusher.trigger("my-channel", "my-event", { message: res.data });


    return NextResponse.json({"status": 200})

}
