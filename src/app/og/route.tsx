import { ImageResponse } from "next/server";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const postTitle = searchParams.get("title");
  const font = fetch(
    new URL("../../../public/fonts/Roboto-Black.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());
  const fontData = await font;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          backgroundImage: "url(https://seungwonan.com/og-bg.png)",
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontStyle: "normal",
            marginLeft: 50,
            marginRight: 190,
            maxWidth: "50%",
            wordWrap: "break-word",
            fontFamily: "Roboto, sans-serif",
            fontWeight: 900,
          }}
        >
          {postTitle}
        </div>
      </div>
    ),
    {
      fonts: [
        {
          name: "Roboto",
          data: fontData,
          style: "normal",
        },
      ],
      width: 1920,
      height: 1080,
    }
  );
}
