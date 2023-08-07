import {NextMiddleware, NextRequest, NextResponse} from 'next/server'

let locales = ['en-US', 'nl-NL', 'nl']

// Get the preferred locale, similar to above or using a library
function getLocale(request:NextRequest){
    return 'en-US'
}

export function middleware(request:NextRequest) {
    // Check if there is any supported locale in the pathname
    const pathname = request.nextUrl.pathname
    // console.log(request.nextUrl)
    console.log(pathname)
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request)
        const a=new URL(pathname, request.url)
        // console.log(a)
        // console.log(a.toString())
        // e.g. incoming request is /products
        // The new URL is now /en-US/products
        return NextResponse.redirect(
            new URL(`/${locale}/${cleanPath(pathname)}`, request.url)
        )
    }
}
const cleanPath= (path: string) => {
    if (path.startsWith('/')) {
        path = path.slice(1)

    }
    return path;
}



export const config = {
    matcher: [
        // Skip all internal paths (_next)
        // '/((?!_next).*)',
        // ...names.map(file=>`/(?!${file})`)
        // Optional: only run on root (/) URL
        '/'
    ],
}

