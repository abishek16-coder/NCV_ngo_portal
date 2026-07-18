import { NextResponse } from "next/server";

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function handleApiError(error: unknown) {
  if (error instanceof ApiError) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: error.statusCode }
    );
  }

  console.error("Unhandled error:", error);
  return NextResponse.json(
    { success: false, error: "Internal server error" },
    { status: 500 }
  );
}

export function unauthorized() {
  return new ApiError(401, "Unauthorized");
}

export function forbidden() {
  return new ApiError(403, "Forbidden access");
}

export function notFound(resource = "Resource") {
  return new ApiError(404, `${resource} not found`);
}

export function badRequest(message: string) {
  return new ApiError(400, message);
}

export function conflict(message: string) {
  return new ApiError(409, message);
}
