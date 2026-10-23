export default async () => {
  return new Response(
    JSON.stringify({
      message: "Hello from Netlify Serverless Function!"
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};