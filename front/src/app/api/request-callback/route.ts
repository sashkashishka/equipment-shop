import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  let referrer = searchParams.get('pathname');

  if (!referrer) {
    referrer = '/';
  }

  const redirectUrl = new URL(referrer, req.url);
  redirectUrl.searchParams.set('requestCbStatus', '1');

  // TODO send email here
  console.log(searchParams);

  return NextResponse.redirect(redirectUrl);
}
