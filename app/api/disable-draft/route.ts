import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.DRAFT_SECRET) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  draftMode().disable()
  const url = new URL(request.nextUrl)
  return NextResponse.redirect(new URL('/', url.origin))
}
