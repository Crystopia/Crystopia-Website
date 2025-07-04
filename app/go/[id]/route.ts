import { NextRequest, NextResponse } from 'next/server'

interface Links {
    name: string;
    url: string;
}



export async function GET(
    req: NextRequest
) {
    const url = "https://raw.githubusercontent.com/Crystopia/Crystopia-Content/refs/heads/main/website/links.json"
    const response = await fetch(url);
    if (!response.ok) {
        return NextResponse.json({ error: "Failed to fetch links" }, { status: 500 });
    }

    const links: Links[] = await response.json();
    const slug = req.url.split('/').pop()
    const redirectUrl = links.find(link => link.name === slug)?.url;

    return NextResponse.redirect(redirectUrl ? new URL(redirectUrl) : new URL('/404', req.url), {
        status: 302
    });
}
