import { ImageResponse } from "next/server";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const postTitle = searchParams.get("title");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          backgroundImage: "url(http://localhost:3000/og-bg.png)",
        }}
      >
        <div
          style={{
            fontSize: 150,
            fontStyle: "normal",
            marginLeft: 130,
            marginRight: 190,
            color: "#81A1C1",
            wordWrap: "break-word",
          }}
        >
          {postTitle}
        </div>
      </div>
    ),
    {
      width: 1920,
      height: 1080,
    }
  );
}
