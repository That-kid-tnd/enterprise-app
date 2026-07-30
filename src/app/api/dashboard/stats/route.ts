import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const totalUsers = await prisma.user.count();
    const activeSessions = Math.floor(Math.random() * 100) + 20;
    const revenue = Math.floor(Math.random() * 50000) + 10000;
    const chartData = [
      { name: "Jan", value: 4000 },
      { name: "Feb", value: 3000 },
      { name: "Mar", value: 5000 },
      { name: "Apr", value: 7000 },
      { name: "May", value: 6000 },
      { name: "Jun", value: 8000 },
    ];
    return NextResponse.json({ totalUsers, activeSessions, revenue, chartData });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
