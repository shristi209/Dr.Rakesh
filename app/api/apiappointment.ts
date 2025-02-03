import { getDbPool } from "@/admin/utils/db";
import { NextRequest, NextResponse } from "next/server";

export interface settingdata {
    id: number;
    fullname: string;
    email: string;
    phonenumber: string;
    servicedetail_id: string;
    service_name: string;
    date: string;
    time: string;
    note?: string;
}
export async function post(req: NextRequest) {
    try {
        const { fullname, email, phonenumber, servicedetail_id, service_name, date, time, note } = await req.json();
        console.log("Received appointment", fullname, email, phonenumber, servicedetail_id, service_name, date, time, note);

        const pool = await getDbPool();

        const query = `
    INSERT INTO appointment (fullname, email, phonenumber, servicedetail_id, service_name, date, time, note)
    VALUES (@fullname, @email, @phonenumber, @servicedetail_id, @service_name, @date, @time, @note);
  `;
        const params = [
            { name: 'fullname', value: fullname },
            { name: 'email', value: email },
            { name: 'phonenumber', value: phonenumber },
            { name: 'servicedetail_id', value: servicedetail_id },
            { name: 'service_name', value: service_name },
            { name: 'date', value: date },
            { name: 'time', value: time },
            { name: 'note', value: note || null },
        ];

        const request = pool.request();
        params.forEach((param) => {
            request.input(param.name, param.value);
        });

        await request.query(query);
    } catch (error) {
        const typedError = error as Error;
        return NextResponse.json({ error: 'Error updating user', details: typedError.message }, { status: 500 });
    }
}