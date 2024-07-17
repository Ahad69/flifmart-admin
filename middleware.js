import { NextResponse } from "next/server";
import jwt_decode from "jwt-decode";

export default function middleware(req) {
  let verify = req.cookies.get("token");
  let url = req.url;

  const decoded = verify ? jwt_decode(verify?.value) : "";

  // if (url.includes("/")) {
  //   try {
  //     if (!verify) {
  //       return NextResponse.rewrite(new URL("/dashboard", url));
  //     } else {
  //       return NextResponse.next();
  //     }
  //   } catch (error) {
  //     return NextResponse.rewrite(new URL("/dashboard", url));
  //   }
  // }

  if (url.includes("/dashboard")) {
    try {
      if (!verify) {
        return NextResponse.rewrite(new URL("/login", url));
      } else {
        return NextResponse.next();
      }
    } catch (error) {
      return NextResponse.rewrite(new URL("/", url));
    }
  }
  if (url.includes("/products/products-list")) {
    try {
      if (!verify) {
        return NextResponse.rewrite(new URL("/login", url));
      } else {
        return NextResponse.next();
      }
    } catch (error) {
      return NextResponse.rewrite(new URL("/", url));
    }
  }
  if (url.includes("/orders/all")) {
    try {
      if (!verify) {
        return NextResponse.rewrite(new URL("/login", url));
      } else {
        return NextResponse.next();
      }
    } catch (error) {
      return NextResponse.rewrite(new URL("/", url));
    }
  }

  if (url.includes("/login")) {
    try {
      if (verify) {
        return NextResponse.rewrite(new URL("/", url));
      } else {
        return NextResponse.next();
      }
    } catch (error) {
      return NextResponse.rewrite(new URL("/login", url));
    }
  }

  return NextResponse.next();
}
