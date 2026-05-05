// "use client";

// import { useSearchParams } from "next/navigation";
// import { useState } from "react";
// import axios from "axios";

// export default function OauthPage() {
//   const searchParams = useSearchParams();
//   const code = searchParams.get("code") ?? "3432";
//   const [accessToken, setAccessToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleClick = async () => {
//     console.log(code, "=-=-=-=-=-=-")
//     // setLoading(true);
//     // try {
//     //   const response = await axios.post(
//     //     `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"}/api/instagram/token`,
//     //     { code }
//     //   );
//     //   const data = response.data;
//     //   setAccessToken(data.access_token ?? "No token returned");
//     // } catch (error) {
//     //   console.log("error", error)
//     //   console.error(error);
//     //   setAccessToken("Error fetching token");
//     // } finally {
//     //   // setLoading(false);
//     //   console.log("finally")
//     // }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-2xl mb-4">Instagram OAuth Callback</h1>
//       <p>Code: {code || "(none)"}</p>
//       {code && (
//         <button
//           className="mt-4 px-4 py-2 bg-foreground text-background rounded"
//           onClick={handleClick}
//           disabled={loading}
//         >
//           {loading ? "Loading..." : "Get Access Token"}
//         </button>
//       )}
//       {accessToken && (
//         <div className="mt-4 p-2 bg-gray-100 rounded">
//           Access Token: {accessToken}
//         </div>
//       )}
//     </div>
//   );
// }


"use client"

export default function Home() {
  return (
    <div>
      <button onClick={() => console.log("CLICK WORKING")}>
        Click me
      </button>
    </div>
  );
}